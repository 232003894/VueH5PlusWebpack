import * as init from './init'
import * as back from './back'
import {
  os
}
from './os'

var _refreshs = []

/**
 * 设备的加载完成
 * @export
 * @param {any} callback
 * @param {any} needRefresh 是否需要追加到刷新 默认false
 * @returns
 */
export function ready(callback, needRefresh) {
  if (!(needRefresh === false)) {
    var isIn = _refreshs.some((item) => {
      return callback.toString() === item.toString()
    })
    if (!isIn) {
      _refreshs.push(callback)
    }
  }
  if (window.plus) {
    // 解决callback与plusready事件的执行时机问题(典型案例:showWaiting,closeWaiting)
    // setInterval(callback, 0)
    setTimeout(callback, 0)
  } else {
    document.addEventListener('plusready', callback, false)
    setTimeout(() => {
      if (!window.plus) {
        callback()
      }
    }, 500)
  }
  return this
}

/**
 * 网页的加载完成
 * @param {function} callback
 * @returns
 */
export function onload(callback) {
  let readyRE = /complete|loaded|interactive/
  if (readyRE.test(document.readyState)) {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback, false)
  }
  return this
}

/**
 * 业务逻辑刷新
 * @export
 * @returns
 */
export function refresh() {
  _refreshs.forEach((cb, index) => {
    cb()
  })

  // init.webError(false)
  return this
}

var __back = function () {
  back.back()
}
var __menu = function () {
  back.menu()
}

/**
 * 默认监听back和menu按键
 * @export
 */
export function androidKeys() {
  if (window.plus && os.android) {
    if (init.options.keyEventBind.backbutton) {
      // console.log('androidKeys.backbutton')
      plus.key.removeEventListener('backbutton', __back, false)
      plus.key.addEventListener('backbutton', __back, false)
    }
    if (init.options.keyEventBind.menubutton) {
      plus.key.removeEventListener('menubutton', __menu, false)
      plus.key.addEventListener('menubutton', __menu, false)
    }
  }
}

onload(() => {
  document.addEventListener('manualshow', function (e) {
    if (window.plus) {
      var w = plus.webview.currentWebview()
      var opts = init.showOptions()
        // fixed:排除已经是TopWebview的情况 2016年12月16日
      var isTop = w === plus.webview.getTopWebview()
      if (w.isVisible() && !isTop) { // 如果已经显示但不是TopWebview的情况
        w.hide('none')
        setTimeout(() => {
          w.show(opts.aniShow, opts.duration + 100)
        }, 500)
      } else {
        w.show(opts.aniShow, opts.duration)
      }
    }
  })
  document.addEventListener('logined', function (e) {
    window.$login && window.$login.close && window.$login.close()
  })
  document.addEventListener('fromChildrenBack', function (e) {
    __back()
  })
  document.addEventListener('fromChildrenMenu', function (e) {
    __menu()
  })
})

ready(() => {
  if (window.plus) {
    init.currentWebview = plus.webview.currentWebview()
    init.isHomePage = init.currentWebview.id === plus.runtime.appid
    init.currentWebview.setStyle({
      // 去掉页面滚动条
      scrollIndicator: 'none'
    })
    androidKeys()
  }
}, false)
