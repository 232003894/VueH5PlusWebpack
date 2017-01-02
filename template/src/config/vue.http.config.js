export default function (vue, _api) {
  var state = _api.getState()
  vue.http.headers.common['v'] = '1.00'
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
      // 关闭网络错误层
      // 显示loading
      // _api.webError(false)
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
          ok: false
        }
        if (response && response.data && response.data.message) { // 给项目中的response的规定的json数据格式用的
          var copy = _api.mix(true, {}, response.data)

          // 后续action
          if (copy.act) {
            json.act = copy.act
          }
          // 错误代码
          if (copy.message.err_code) {
            json.code = copy.message.err_code
          }
          // 错误消息
          if (copy.message.err_msg) {
            json.msg = copy.message.err_msg
          }
          // 增加的业务按钮
          if (copy.btns && copy.btns.length > 0) {
            json.btns = copy.btns
          }
          // 主体数据
          json.data = copy.data
          if (request.app.retry && _api.isFunction(request.app.retry)) {
            json.retry = request.app.retry
          } else {
            json.retry = undefined
          }
          // 代码处理
          if (copy.message.err_code === 0) {
            // 正常
            _api.webError(false)
            json.ok = true
          } else if (copy.message.err_code === 401) {
            // 未登陆
            // todo:需要 登陆 暂时用消息提示
            window.$toast && window.$toast({
              msg: '请登陆',
              time: 1000
            })
          } else if (copy.message.err_code === 500) {
            // 业务错误
            // 错误的提示
            goError()
          } else if (copy.message.err_code === 503 || copy.message.err_code === 404) {
            // 503 服务端错误(黄页等)
            // 404 服务找不到等等
            // 错误的提示
            goError('操作失败')
          }
        } else { // 给非项目中规定的response json数据格式用的
          json.ok = response.ok
          json.data = response.data
        }
        // return Promise.resolve().then(() => {
        //   return json.data
        // })
        // return Promise.reject()['catch'](undefined, () => {
        //   return json.data
        // })
        return json
      })
    }

    /**
     * 显示错误:分为请求或操作
     * @param {any} msg [非必填]当请求为操作类型时会提示消息,为空则不提示消息
     */
    var goError = (_msg) => {
      // 提示网络错误
      if (request.app.reload) {
        // 加载
        _api.webError(true)
      } else {
        // 请求
        _api.webError(false)
        if (_msg) {
          setTimeout(() => {
            window.$toast && window.$toast({
              msg: _msg,
              time: 1000,
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
        goError('操作失败')
      } else {
        goNext()
      }
    }
    request.app = request.app || {}

    /**
     * 登录后是否需要重新加载页面
     * false:不需要,操作请求,用于操作/提交等( 默认值 )
     * true:需要,加载请求,用于页面加载或列表加载的类型
     * 影响范围
     * 1.请求失败的提示(加载失败效果/操作失败的提示)
     * 2.取消登录的处理(后退关闭来源页面)
     * 3.登录完成的处理
     */
    request.app.reload = (request.app.reload === true)

    handle()
  })
}
