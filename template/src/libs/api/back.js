import * as utils from './utils'
import * as act from './action'
import * as init from './init'
import * as events from './event'

/**
 * 增加back执行流程
 * @export
 * @param {type} back
 * @returns
 */
export function addBack(back) {
  return act.addAction('backs', back)
}

/**
 * 删除back执行流程
 * @export
 * @param {type} back
 * @returns
 */
export function removeBack(back) {
  return act.removeAction('backs', back)
}

/**
 * 默认处理-后退
 */
addBack({
  name: 'browser',
  index: 100,
  handle: function () {
    if (window.history.length > 1) {
      // utils.log('web的后退 window.history.back')
      window.history.back()
      return false
    }
    return true
  }
})

/**
 * 执行后退
 */
export function back() {
  // console.log('backs')
  let hasIndex = act.hasIndex('backs', 10)
  if (utils.isFunction(init.options.beforeback) && !hasIndex) {
    if (init.options.beforeback() === false) {
      return
    }
  }
  act.doAction('backs')
}

/**
 * 首次按下back按键的时间
 */
var __backFirst = null

/**
 * 5+ back
 */
addBack({
  name: '5+',
  index: 10,
  handle: function () {
    if (!window.plus) {
      return true
    }
    h5Back()
    return false
  }
})

/**
 * h5Back
 */
export function h5Back() {
  var wobj = plus.webview.currentWebview()
  var parent = wobj.parent()
  if (parent) {
    // 激活父窗体的back事件
    events.fire(parent, 'fromChildrenBack')
  } else {
    wobj.canBack(function (e) {
      // by chb 暂时注释，在碰到类似popover之类的锚点的时候，需多次点击才能返回；
      if (e.canBack) {
        // utils.log('5+环境的后退 window.history.back')
        // webview history back
        window.history.back()

        // 关闭登录层
        setTimeout(() => {
          window.$login && window.$login.close && window.$login.close()
        }, 300)
      } else { // webview close or hide
        // fixed by fxy 此处不应该用opener判断，因为用户有可能自己close掉当前窗口的opener。这样的话。opener就为空了，导致不能执行close
        if (wobj.id === plus.runtime.appid) {
          // if (init.isHomePage) {
          // 首页
          // 首页不存在opener的情况下，后退实际上应该是退出应用；
          // 首次按键，提示‘再按一次退出应用’
          if (!__backFirst) {
            __backFirst = new Date().getTime()
            plus.nativeUI.toast('再按一次退出应用', {
              verticalAlign: 'bottom'
            })
            setTimeout(function () {
              __backFirst = null
            }, 2000)
          } else {
            if (new Date().getTime() - __backFirst < 2000) {
              plus.runtime.quit()
            }
          }
        } else { // 其他页面
          if (wobj.preload) {
            wobj.hide('auto')
          } else {
            // 只关闭当前页面自身
            // 其打开的所有子页面 暂不处理
            wobj.close()
          }
        }
      }
    })
  }
}

/**
 * 菜单
 */
export function menu() {
  // 菜单
  var menu = document.querySelector('.action-menu')
  if (menu) {
    // 打开菜单
  } else {
    // 执行父窗口的menu
    if (window.plus) {
      var wobj = plus.webview.currentWebview()
      var parent = wobj.parent()
      if (parent) {
        events.fire(parent, 'fromChildrenMenu')
      }
    }
  }
}
