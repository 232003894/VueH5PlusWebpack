import Style from 'assets/css.vue' // eslint-disable-line

// 工具
export {
  getType,
  isFunction,
  isWindow,
  isObject,
  isPlainObject,
  mix
}
from './api/utils'

// 系统
export {
  os
}
from './api/os'

// action
export {
  doAction,
  addAction
}
from './api/action'

// 后退
export {
  addBack,
  back,
  beforeback
}
from './api/back'

// 页面加载
export {
  // 网页的加载完成
  domready,
  // 设备的加载完成
  apiready
}
from './api/ready'
