import * as utils from './utils'

var receive = function (eventType, eventData) {
  if (eventType) {
    try {
      if (eventData) {
        eventData = JSON.parse(eventData)
      }
    } catch (e) {}
    document.dispatchEvent(new CustomEvent(eventType, {
      detail: eventData,
      bubbles: true,
      cancelable: true
    }))
  }
}

/**
 * 单页面事件通知 html和5+ 都可以用
 * @export
 * @param {Object} webviewOrWindow webview 或者 window
 * @param {any} eventType
 * @param {Object} eventData
 */
export function fire(webviewOrWindow, eventType, eventData) {
  if (webviewOrWindow) {
    if (eventData !== '') {
      eventData = eventData || {}

      // utils.log(JSON.stringify(eventData))
      if (utils.isPlainObject(eventData)) {
        eventData = JSON.stringify(eventData || {}).replace(/'/g, '\\u0027').replace(/\\/g, '\\u005c')
      }
      // utils.log(eventData)
    }
    var _js = '(' + receive.toString().replace('/function ?+(/', 'function') + ')("' + eventType + '",\'' + eventData + '\')'
    if (utils.isWindow(webviewOrWindow)) {
      // Window
      webviewOrWindow.eval(_js)
    } else {
      // webview
      webviewOrWindow.evalJS(_js)
    }
  }
}

/**
 * 事件通知 本窗体和所有子窗体  html(不通知子窗体)和5+都可用
 * @export
 * @param {any} webview
 * @param {any} eventType
 * @param {Object} eventData
 */
export function fireTree(webview, eventType, eventData) {
  fire(webview, eventType, eventData)
  if (webview.children) {
    var list = webview.children()
    for (var i = 0; i < list.length; i++) {
      fire(list[i], eventType, eventData)
    }
  }
}

/**
 * 事件通知 所有窗体  html(只通知本窗体)和5+都可用
 * @export
 * @param {any} eventType
 * @param {Object} eventData
 */
export function fireAll(eventType, eventData) {
  if (window.plus) {
    var list = plus.webview.all()
    for (var i = list.length - 1; i >= 0; i--) {
      fire(list[i], eventType, eventData)
    }
  } else {
    fire(window, eventType, eventData)
  }
}
