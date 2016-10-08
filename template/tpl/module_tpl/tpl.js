import Vue from 'vue'
import VueTouch from 'vue-touch'
import VueResource from 'vue-resource'
import VueAsyncData from 'vue-async-data'
import VueValidator from 'vue-validator'
Vue.use(VueTouch);
Vue.use(vueResource);
Vue.use(VueAsyncData);
Vue.use(VueValidator);

import App from './app'
/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: { App }
})
