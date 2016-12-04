import Style from 'assets/css.vue' // eslint-disable-line

// 工具
export {
  getType,
  isFunction,
  isWindow,
  isObject,
  isPlainObject,
  // isArrayLike,
  mix,
  trigger
}
from './api/utils'

// 系统
export {
  os
}
from './api/os'

// 页面加载
export {
  // 网页的加载完成
  domready,
  // 设备的加载完成
  apiready
}
from './api/ready'

// action
export {
  doAction,
  addAction
}
from './api/action'

// init
export {
  global,
  options,
  initGlobal,
  init,
  showOptions,
  waitingOptions,
  windowOptions,
  currentWebview,
  isHomePage,
  fire,
  fireTree,
  fireAll,
  preload,
  openWindow
}
from './api/init'

// 后退
export {
  addBack,
  back,
  menu
}
from './api/back'

export {
  pages
}
from './api/pages'

export {
  toast
}
from './api/msg'
