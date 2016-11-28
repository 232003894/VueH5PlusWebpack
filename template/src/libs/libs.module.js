import Style from 'assets/css.vue' // eslint-disable-line
import pages from './module/pages'
import os from './api/os'
import {
  ready,
  apiready
} from './api/ready'
let api = {
  os: os,
  ready: apiready
}
export {
  pages,
  api,
  ready
}
