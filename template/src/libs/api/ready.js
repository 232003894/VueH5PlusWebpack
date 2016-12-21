import * as init from './init'
import * as msg from './msg'

var _refreshs = []

/**
 * 设备的加载完成
 * @export
 * @param {any} callback
 * @param {any} needRefresh 是否需要追加到刷新
 * @returns
 */
export function ready(callback, needRefresh) {
  if (!(needRefresh === false)) {
    _refreshs.push(callback)
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

  // msg.webError(false)
  return this
}

onload(() => {
  document.addEventListener('manualshow', function (e) {
    if (window.plus && init.currentWebview) {
      var opts = init.showOptions()

      // fixed:排除已经是TopWebview的情况 2016年12月16日
      var isTop = init.currentWebview === plus.webview.getTopWebview()
      if (init.currentWebview.isVisible() && !isTop) { // 如果已经显示但不是TopWebview的情况
        init.currentWebview.hide('none')
        setTimeout(() => {
          init.currentWebview.show(opts.aniShow, opts.duration + 100)
        }, 500)
      } else {
        init.currentWebview.show(opts.aniShow, opts.duration)
      }
    }
  })
  document.addEventListener('logined', function (e) {
    msg.closeLogin()
  })
})
