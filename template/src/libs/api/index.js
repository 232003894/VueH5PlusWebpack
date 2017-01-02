import Style from 'assets/css.vue' // eslint-disable-line

// 工具
export {
  getType,
  isString,
  isRegExp,
  isFunction,
  isDate,
  isArray,
  isWindow,
  isObject,
  isPlainObject,
  // isArrayLike,
  mix,
  trigger,
  htmlToTxt,
  equals,
  log,
  tplRelpace
}
from './utils'

// 日期
export {
  dateFormat
}
from './date'

// 系统
export {
  os
}
from './os'

// action
export {
  doAction,
  addAction,
  removeAction,
  hasIndex
}
from './action'

// event
export {
  fire,
  fireTree,
  fireAll
}
from './event'

// init
export {
  initBoxOpts,
  webError,
  global,
  options,
  initGlobal,
  init,
  showOptions,
  windowOptions,
  currentWebview,
  isHomePage,
  preload,
  openWindow,
  showWindow,
  goHome
}
from './init'

// 后退
export {
  addBack,
  removeBack,
  h5Back,
  back,
  menu
}
from './back'

// 页面加载
export {
  // 网页的加载完成
  onload,
  // 设备的加载完成
  ready,
  // app页面局部刷新
  refresh,
  // 安卓的后退和菜单键事件绑定
  androidKeys
}
from './ready'

export {
  pages
}
from './pages'

export {
  getState,
  setState,
  getSettings,
  setSettings
}
from './localStorage'

export {
  noNetwork
}
from './plus'

// import './resource.js'
