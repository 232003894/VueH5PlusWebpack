/*
response
{
    "version": "1.0.0",
    "sys": {
        "code": 0,
        "msg": null,
        "data": null,
        "acts": []
    },
    "biz": {
        "code": 0,
        "msg": null,
        "data": null,
        "acts": [
            {
                "code": "00",
                "name": "登录"
            }
        ]
    }
}
修改后输出的
{
    'version': '1.0.0',
    'type': 'biz',
    'ok': true，
    'code': 0,
    'msg': null,
    'data': null,
    'acts': []
}
*/

export default function (vue, _api) {
  const error404 = '服务无法访问'
  const error503 = '操作失败'
  const apiVersion = '1.00'

  let state = _api.getState()
  vue.http.headers.common['v'] = apiVersion
  vue.http.headers.common['d'] = 'web'
  vue.http.headers.common['t'] = state.t + ''
  vue.http.headers.common['s'] = state.s + ''
  vue.http.headers.common['w'] = window.innerWidth + ''

  _api.ready(() => {
    if (window.plus) {
      vue.http.headers.common['d'] = plus.device.uuid + ''
      vue.http.headers.common['w'] = plus.screen.resolutionWidth + ''
    }
  }, false)

  vue.http.interceptors.push((request, next) => {
    request.app = request.app || {}

    /**
     * 是否加载用途的请求
     * true:加载请求,用于页面加载或列表加载的类型( 默认值 )
     * false:操作请求
     * 影响范围
     * 1.请求失败的提示(在goError方法中实现)
     *   true:加载失败层,显示刷新按钮( 默认值 )
     *   false:操作失败的提示,toast
     * 2.登录完成的处理:是否需要重新加载页面(在login.vue的success方法中实现)
     *   true:加载请求需要重新加载页面( 默认值 )
     *   false:操作请求不需要重新加载页面
     * 3.取消登录的处理(后退关闭来源页面)(在msg-login-index.js的cancle方法中实现)
     *   true:后退或关闭来源(plus并且无history),关闭登录层( 默认值 )
     *   false:关闭登录层
     */
    request.app.load = (request.app.load !== false)

    // 超时处理
    var timeout
    request.onTimeout = (request) => {
      setTimeout(() => {
        window.$loading && window.$loading(false)
        window.$toast && window.$toast({
          msg: '超时了',
          time: 1000
        })
      }, 500)
    }
    request.timeout = request.timeout === undefined ? 30000 : request.timeout
    if (request.timeout) {
      timeout = setTimeout(() => {
        if (request.onTimeout) {
          request.onTimeout(request)
          request.abort()
        }
      }, request.timeout)
    }

    /**
     * 继续
     */
    var goNext = () => {
      // 显示loading
      window.$loading && window.$loading(true)

      // 处理response
      next((response) => {
        // 清理超时定时器
        // 关闭loading
        clearTimeout(timeout)
        setTimeout(() => {
          window.$loading && window.$loading(false)
        }, 100)

        // 返回的数据对象
        var json = {
          version: apiVersion,
          type: 'biz',
          ok: false,
          code: 0,
          msg: null,
          data: null,
          acts: []
        }
        if (response.version && (response.sys || response.biz) && response.ok) {
          // 服务端格式化过的标准json格式(自行约定的)
          if (response.sys && response.sys.code > 0) {
            // 服务错误(比如服务不存在404 或 服务端错误-黄页类型的并错误统一捕获过的)
            json.type = 'sys'
            _api.mix(true, json, response.sys)
            if (json.code === 404) {
              // 服务找不到
              goError(error404)
            } else if (json.code === 503) {
              // 服务端错误(黄页等)
              goError(error503)
            }
          } else {
            // 无服务错误,处理业务response
            json.type = 'biz'
            _api.mix(true, json, response.biz)
            if (json.code === 401) {
              // 权限不足
              // 根据data来判断是登录权限不足还是其他的权限不足(如:卖家权限,是否开店)
              if (json.data && json.data !== 0) {
                // todo:其他权限
              } else {
                // 需要登录
                window.$login && window.$login.show && window.$login.show({
                  reload: request.app.load
                })
              }
            } else if (json.code === 200) {
              // 业务完全成功
              json.ok = true

              // 关闭网络错误层
              _api.webError(false)
            } else if (json.code >= 201 && json.code <= 299) {
              // 业务成功,但是有部分业务问题
              json.ok = true

              // 关闭网络错误层
              _api.webError(false)
            } else if (json.code === 500) {
              // 业务失败
              // load时:加载失败层,显示刷新按钮( 默认值 )
              // 非load时:关闭加载失败层,没有提示,请求失败回调自行处理错误业务
              goError()
            }
          }
        } else {
          // 第三方的 或 response.ok == false 的情况
          json.ok = response.ok
          if (json.ok) {
            // 第三方的请求成功
            json.data = response.data
            if (_api.isString(json.data)) {
              // 字符串尝试转换为 json对象
              try {
                json.data = JSON.parse(json.data)
              } catch (error) {}
            }
            // 关闭网络错误层
            _api.webError(false)
          } else {
            // 请求失败或第三方的请求失败
            json.type = 'sys'
            if (response.status === 404) {
              // 服务找不到
              json.code = 404
              goError(error404)
            } else {
              // 其他的都归为服务器错误
              json.code = 503
              goError(error503)
            }
          }
        }
        return json
      })
    }

    /**
     * 显示错误:分为请求或操作
     * @param {any} msg [非必填]当请求为操作类型时会提示消息,为空则不提示消息
     */
    var goError = (_msg) => {
      // 提示网络错误
      if (request.app.load) {
        // 加载
        _api.webError(true)
      } else {
        // 请求
        _api.webError(false)
        if (_msg) {
          setTimeout(() => {
            window.$toast && window.$toast({
              msg: _msg,
              time: 2000,
              type: 'text'
            })
          }, 150)
        }
      }
    }

    /**
     * http处理
     */
    function handle() {
      // h5+ 网络检查
      if (_api.noNetwork()) {
        clearTimeout(timeout)
        setTimeout(() => {
          window.$loading && window.$loading(false)
        }, 100)
        goError(error503)
      } else {
        goNext()
      }
    }

    handle()
  })
}
