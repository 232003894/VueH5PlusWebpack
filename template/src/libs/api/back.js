import * as utils from './utils'
import * as act from './action'
import * as init from './init'
import * as ready from './ready'
import {
  os
} from './os'
import * as msg from './msg'

/**
 * 增加back执行流程
 * @export
 * @param {type} back
 * @returns {$.gestures}
 */
export function addBack(back) {
  return act.addAction('backs', back)
}

/**
 * 默认处理-后退
 */
addBack({
  name: 'browser',
  index: 100,
  handle: function () {
    if (window.history.length > 1) {
      console.log('web的后退 window.history.back')
      window.history.back()
      return true
    }
    return false
  }
})

/**
 * 执行后退
 */
export function back() {
  if (utils.isFunction(init.options.beforeback)) {
    if (init.options.beforeback() === false) {
      return
    }
  }
  act.doAction('backs')
}

/**
 * 首次按下back按键的时间
 */
export var __backFirst = null

/**
 * 5+ back
 */
addBack({
  name: '5+',
  index: 10,
  handle: function () {
    if (!window.plus) {
      return false
    }
    var wobj = plus.webview.currentWebview()
    var parent = wobj.parent()
    if (parent) {
      // 激活父窗体的back事件
      init.fire(parent, 'fromChildrenBack')
    } else {
      wobj.canBack(function (e) {
        // by chb 暂时注释，在碰到类似popover之类的锚点的时候，需多次点击才能返回；
        if (e.canBack) { // webview history back
          console.log('5+环境的后退 window.history.back')
          window.history.back()
        } else { // webview close or hide
          // fixed by fxy 此处不应该用opener判断，因为用户有可能自己close掉当前窗口的opener。这样的话。opener就为空了，导致不能执行close
          if (wobj.id === plus.runtime.appid) { // 首页
            // 首页不存在opener的情况下，后退实际上应该是退出应用；
            // 首次按键，提示‘再按一次退出应用’
            if (!__backFirst) {
              __backFirst = new Date().getTime()
              msg.toast('再按一次退出应用', 'bottom')
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
    return true
  }
})

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
      var wobj = init.currentWebview
      var parent = wobj.parent()
      if (parent) {
        init.fire(parent, 'fromChildrenMenu')
      }
    }
  }
}

var __back = function () {
  back()
}
var __menu = function () {
  menu()
}

// 默认监听back和menu按键
ready.apiready(() => {
  document.addEventListener('fromChildrenBack', function (e) {
    __back()
  })
  document.addEventListener('fromChildrenMenu', function (e) {
    __menu()
  })
  if (os.android) {
    if (init.options.keyEventBind.backbutton) {
      plus.key.addEventListener('backbutton', __back, false)
    }
    if (init.options.keyEventBind.menubutton) {
      plus.key.addEventListener('menubutton', __menu, false)
    }
  }
})
