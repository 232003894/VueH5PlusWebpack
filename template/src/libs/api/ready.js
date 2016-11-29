/**
 * 设备的加载完成
 * @param {function} callback
 * @returns
 */
let apiready = (callback) => {
  if (window.plus) {
    setInterval(() => {
      // 解决callback与plusready事件的执行时机问题(典型案例:showWaiting,closeWaiting)
      callback()
    }, 0)
  } else {
    document.addEventListener('plusready', () => {
      callback()
    }, false)
  }
  return this
}

/**
 * 网页的加载完成
 * @param {function} callback
 * @returns
 */
let domready = (callback) => {
  let readyRE = /complete|loaded|interactive/
  if (readyRE.test(document.readyState)) {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      callback()
    }, false)
  }
  return this
}

apiready(() => {
  // H5+ 中的窗体设置
  var webview = plus.webview.currentWebview()
  webview.setStyle({
    // 去掉页面滚动条
    scrollIndicator: 'none'
  })
})

export {
  domready,
  apiready
}
