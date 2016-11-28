import Style from 'assets/css.vue' // eslint-disable-line

import os from './api/os'
/**
 * ready
 */
import {
  /**
   * 网页的加载完成
   */
  domready,
  /**
   * 设备的加载完成
   */
  apiready
} from './api/ready'
/**
 * 环境与框架的api
 */
let api = {
  os: os,
  domready: domready,
  apiready: apiready
}
export default api
