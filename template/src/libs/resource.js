import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import * as ready from './api/ready'
import * as _plus from './api/plus'
import * as utils from './api/utils'
import * as msg from './api/msg'
ready.ready(() => {
  if (window.plus) {
    Vue.http.headers.common['d'] = plus.device.uuid + ''
    Vue.http.headers.common['w'] = plus.screen.resolutionWidth + ''
  }
})

Vue.http.interceptors.push((request, next) => {
  // 通用
  // 是否显示请求中的loading效果,默认值:false 不显示
  // h5+ 网络检查
  if (!request.app) {
    request.app = {}
  }
  // 默认为true:加载请求 false:操作请求
  request.app.get = (request.app.get !== false)

  if (_plus.noNetwork()) {
    // 提示网络错误
    if (request.app.get) {
      // 加载
      msg.webError(true)
    } else {
      // 请求
      msg.toast({
        msg: '操作失败',
        time: 2000,
        type: 'cancel'
      })
    }
  } else {
    msg.webError(false)
    msg.loading(true)
    next((response) => {
      setTimeout(() => {
        msg.loading(false)
      }, 100)
      return response
    })
  }
})

// 登陆后是否刷新最初的请求页面,默认值:true 刷新
