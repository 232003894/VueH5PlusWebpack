import Vue from 'vue'
import VueTouch from 'vue-touch'
Vue.use(VueTouch)
import VueResource from 'vue-resource'
Vue.use(VueResource)
import VueAsyncData from 'vue-async-data'
Vue.use(VueAsyncData)
import VueValidator from 'vue-validator'
Vue.use(VueValidator)

import 'configVue'
import App from './app'
/** project components*/
import Msg from 'components/msg'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  ready() {},
  components: {
    App,
    Msg
  }
})
