import * as utils from './utils'
import * as events from './event'
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

var boxOpts = {}

export function initBoxOpts(obj) {
  boxOpts = obj
  return this
}

/**
 * show error
 * @export
 * @param {Bollon} value 显示或隐藏
 */
export function webError(value) {
  boxOpts.isError = value !== false
  return this
}

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
  },
  /**
   * 执行 beforeback 若返回false，则不再执行back()方法；
   * 否则（返回true或无返回值），继续执行back()方法；
   * @type {Function}
   */
  beforeback: null
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
  ready.onload(function () {
    act.doAction('inits', function (_init, index) {
      // 是否未执行过
      var isInit = !inits[_init.name]
      if (isInit) {
        _init.handle()
        inits[_init.name] = true
      }
    })
  })
  return this
}

// 默认页面加载的动画:移入
var defaultShow = {
  duration: os.ios ? 300 : 200,
  aniShow: 'slide-in-right'
}

/**
 * 设置窗口显示配置
 * @export
 * @param {Object} opts
 * @returns {Object}
 */
export function showOptions(opts) {
  // return utils.mix(true, {}, defaultShow, opts)
  return utils.mix(true, defaultShow, opts)
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
 * 1个参数 openWindow(id)  url在pages中获取,opts为默认
 * 2个参数 openWindow(id,opts)  id=url或url在pages中获取
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
    window.$loading && window.$loading(true)

    webview = plus.webview.getWebviewById(id)
    if (webview) { // 已存在
      setTimeout(() => {
        showWindow(webview, false)
      }, 500)
      return webview
    }
    // 创建新窗口
    opts = utils.mix(opts, {
      id: id,
      url: url
    })
    webview = createWindow(opts)
    showWindow(webview, false)
  } else {
    window.location.href = url
  }
  return webview
}

/**
 * 显示指定窗口
 * @export
 * @param {any} webview
 * @param {any} showLoading
 */
export function showWindow(webview, showLoading) {
  if (showLoading !== false) {
    window.$loading && window.$loading(true)
  }
  events.fireTree(webview, 'manualshow')
  setTimeout(() => {
    window.$loading && window.$loading(false)
  }, 500)
}

/**
 * 回到首页
 * @export
 */
export function goHome() {
  if (window.plus) {
    window.$loading && window.$loading(true)
    var webview = plus.webview.getLaunchWebview()
    var top = plus.webview.getTopWebview()
    var _all = plus.webview.all()
    _all.forEach(function (el) {
      if (el.id !== webview.id && top.id !== el.id) {
        el.close('none')
      }
    }, this)
    setTimeout(() => {
      window.$loading && window.$loading(false)
      setTimeout(() => {
        top.close(defaultShow.aniShow.replace('in', 'out'), defaultShow.duration + 100)
      }, 100)
    }, 300)
  } else if (pages['index']) {
    window.location.href = pages['index']
  }
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
