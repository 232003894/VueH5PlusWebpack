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
  trigger,
  htmlToTxt,
  equals,
  log
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
  onload,
  // 设备的加载完成
  ready,
  // app页面局部刷新
  refresh
}
from './api/ready'

// action
export {
  doAction,
  addAction,
  removeAction
}
from './api/action'

// init
export {
  msgOpts,
  boxOpts,
  loginOpts,
  global,
  options,
  initGlobal,
  init,
  showOptions,
  windowOptions,
  currentWebview,
  isHomePage,
  fire,
  fireTree,
  fireAll,
  preload,
  openWindow,
  showWindow,
  goHome
}
from './api/init'

// 后退
export {
  addBack,
  removeBack,
  __backFirst,
  h5Back,
  back,
  menu
}
from './api/back'

export {
  pages
}
from './api/pages'

export {
  getState,
  setState,
  getSettings,
  setSettings
}
from './api/localStorage'

export {
  toast,
  alert,
  confirm,
  dialog,
  loading,
  webError,
  showLogin,
  closeLogin,
  cancleLogin
}
from './api/msg'

export {
  noNetwork
}
from './api/plus'

import './resource.js'
