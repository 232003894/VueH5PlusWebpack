import Vue from 'vue'
import VueTouch from 'vue-touch'
Vue.use(VueTouch)

import 'configVue'
import App from './app'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
})
