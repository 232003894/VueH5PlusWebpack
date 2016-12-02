import * as utils from './utils'
import * as act from './action'
import * as ready from './ready'
import {
  os
}
from './os'
import {
  pages
}
from './pages'

export var global = {
  swipeBack: false,
  keyEventBind: {
    backbutton: true,
    menubutton: true
  }
}

export var options = {
  swipeBack: false,
  keyEventBind: {
    backbutton: true,
    menubutton: true
  }
}

/**
 * 初始化全局选项
 * @export
 * @param {Object} opts
 * @returns {Object}
 */
export function initGlobal(opts) {
  options = utils.mix(true, global, opts)
  return this
};

/**
 * 增加初始化执行流程
 * @export
 * @param {Object} init
 * @returns {Object}
 */
export function addInit(init) {
  return act.addAction('inits', init)
}

// 当页已执行过的初始化执行流程
var inits = {}

/**
 * 单页配置 初始化
 * @export
 * @param {object} opts
 * @returns
 */
export function init(opts) {
  options = utils.mix(true, global, opts || {})
  ready.domready(function () {
    act.doAction('inits', function (init, index) {
      // 是否未执行过
      var isInit = !inits[init.name]
      if (isInit) {
        init.handle()
        inits[init.name] = true
      }
    })
  })
  return this
}

// 默认页面动画
var defaultShow = {
  autoShow: true,
  duration: os.ios ? 200 : 100,
  aniShow: 'slide-in-right'
}

/**
 * 设置窗口显示配置
 * @export
 * @param {Object} opts
 * @returns {Object}
 */
export function showOptions(opts) {
  return utils.mix(true, {}, defaultShow, opts)
}

/**
 * 设置等待动画配置
 * @export
 * @param {Object} opts
 * @returns {Object}
 */
export function waitingOptions(opts) {
  return utils.mix(true, {}, {
    autoShow: true,
    title: '正在加载...'
  }, opts)
}

/**
 * 设置窗口默认 styles 配置
 * @export
 * @param {Object} opts
 * @returns {Object}
 */
export function windowOptions(opts) {
  return utils.mix({
    scalable: false,
    bounce: '' // vertical
  }, opts)
}

/**
 * 当前窗体
 */
export var currentWebview = null

/**
 * 是否主页
 */
export var isHomePage = false

ready.apiready(function () {
  currentWebview = plus.webview.currentWebview()
})

function receive(eventType, eventData) {
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
      if (utils.isPlainObject(eventData)) {
        eventData = JSON.stringify(eventData || {}).replace(/'/g, '\\u0027').replace(/\\/g, '\\u005c')
      }
    }
    var _js = receive.toString() + ';receive("' + eventType + '","' + eventData + '")'
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

/**
 * 创建Webview窗口，用于加载新的HTML页面，可通过styles设置Webview窗口的样式，创建完成后需要调用show方法才能将Webview窗口显示出来。
 * @param {Object} opts
 * @returns {webview}
 */
function createWindow(opts) {
  if (!window.plus) {
    return
  }
  var id = opts.id || opts.url
  var webview

  // 判断是否携带createNew参数，默认为false
  // createNew : 是否重复创建同样id的webview，默认为false:不重复创建，直接显示
  if (opts.createNew !== true) {
    webview = plus.webview.getWebviewById(id)
  }
  if (!webview) {
    // 新增
    if (opts.preload) {
      // 新增预加载窗口
      // preload
      opts.extras = utils.mix({
        preload: true
      }, opts.extras)
    }
    webview = plus.webview.create(opts.url, id, windowOptions(opts.styles), opts.extras)
  }
  return webview
}

/**
 * 创建预加载窗体
 * 5+ 有效
 * 1个参数 preload(opts)  url和id在opts中
 * 1个参数 preload(id)  url在pages中获取,opts为默认
 * 2个参数 preload(id,opts)  id=url或url在pages中获取
 * 3个参数 preload(url,id,opts)  url, id, opts
 * @export
 * @param {Object} opts
 * @returns
 */
export function preload(url, id, opts) {
  if (typeof url === 'object') {
    // opts(url和id在opts中)
    opts = url
    url = opts.url
    id = opts.id || url
  } else {
    if (typeof id === 'object') {
      // id=url, opts
      opts = id
      id = url
    } else {
      // url, id, opts
      id = id || url
    }
  }
  opts = opts || {}

  if (pages[id]) {
    url = pages[id]
  }

  if (!opts.preload) {
    opts.preload = true
  }
  var webview = null
  if (window.plus) {
    webview = createWindow(opts)
  }
  return webview
}

/**
 * 打开新页面:
 * web,5+ 有效
 * web:直接打开新url
 * 5+:打开新窗口
 * 1个参数 openWindow(opts)  url和id在opts中
 * 1个参数 preload(id)  url在pages中获取,opts为默认
 * 2个参数 preload(id,opts)  id=url或url在pages中获取
 * 3个参数 openWindow(url,id,opts)  url, id, opts
 * @export
 * @param {any} url
 * @param {any} id
 * @param {any} opts
 * @returns
 */
export function openWindow(url, id, opts) {
  if (typeof url === 'object') {
    // opts(url和id在opts中)
    opts = url
    url = opts.url
    id = opts.id || url
  } else {
    if (typeof id === 'object') {
      // id=url, opts
      opts = id
      id = url
    } else {
      // url, id, opts
      id = id || url
    }
  }

  if (pages[id]) {
    url = pages[id]
  }

  opts = opts || {}

  var webview = null
  if (window.plus) {
    var nShow = showOptions(opts.show)
    var nWaiting

    webview = plus.webview.getWebviewById(id)
    if (webview) { // 已存在
      // 每次show都需要传递动画参数
      // 预加载的动画参数优先级：openWindow配置>preloadPages配置>默认配置
      webview.show(nShow.aniShow, nShow.duration, function () {
        fireTree(webview, 'pagebeforeshow')
      })

      // todo:afterShowMethodName 显示后的处理程序
      return webview
    }

    // 显示waiting
    var waitingConfig = waitingOptions(opts.waiting)
    if (waitingConfig.autoShow) {
      nWaiting = plus.nativeUI.showWaiting(waitingConfig.title, waitingConfig.options)
    }

    // 创建新窗口
    opts = utils.mix(opts, {
      id: id,
      url: url
    })
    webview = createWindow(opts)
    if (nShow.autoShow) {
      var showWebview = function () {
        // 关闭等待框
        if (nWaiting) {
          nWaiting.close()
        }
        // 显示页面
        webview.show(nShow.aniShow, nShow.duration)

        // 已加载
        webview.showed = true

        // todo:afterShowMethodName 显示后的处理程序
        // options.afterShowMethodName && webview.evalJS(options.afterShowMethodName + '(\'' + JSON.stringify(params) + '\')')
      }

      // TODO:能走到这一步，应该不用判断url了吧？
      if (!url) {
        showWebview()
      } else {
        // titleUpdate 触发时机早于 loaded，更换为 titleUpdate 后，可以更早的显示 webview
        webview.addEventListener('titleUpdate', showWebview, false)

        // loaded 事件发生后，触发预加载和 pagebeforeshow 事件
        webview.addEventListener('loaded', function () {
          fireTree(webview, 'pagebeforeshow')
        }, false)
      }
    }
  } else {
    window.location.href = url
  }
  return webview
}

// /**
//  * 创建当前页面的子webview
//  * @export
//  * @param {any} opts
//  * @returns {webview}
//  */
// export function appendWebview(opts) {
//   if (!window.plus) {
//     return
//   }
//   var webview = createWindow(opts)
//   plus.webview.currentWebview().append(webview)
// }
