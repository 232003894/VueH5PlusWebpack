import * as _api from '../libs/api'
import * as _app from '../logic/app'
if (!window.api) {
  window.api = _api
}
if (!window.app) {
  window.app = _app
}
// 移动端快速点击
import FastClick from 'fastclick'
// 移动端快速点击
FastClick.attach(document.body)

import vueConfig from './vue.config'

export default function (vue) {
  vueConfig(vue)
}
