import Vue from 'vue'
import config from 'config'
config(Vue)

import App from './app'
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
})
