import Vue from 'vue'
import FastClick from 'fastclick'
FastClick.attach(document.body)
import 'configVue'

import App from './app'
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
})
