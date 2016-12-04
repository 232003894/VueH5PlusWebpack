import Vue from 'vue'
import VueTouch from 'vue-touch'
Vue.use(VueTouch)
require('configVue')

import App from './app'
/** project components*/
import Msg from 'components/msg'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
})
