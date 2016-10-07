import Style from 'assets/css.vue' // eslint-disable-line

import config from 'assets/js/conf';
import common from 'assets/js/common';
import pages from 'assets/js/pages';

import Vue from 'vue';
var VueTouch = require('vue-touch');
var vueResource = require('vue-resource');
var VueAsyncData = require('vue-async-data');
var VueValidator = require('vue-validator')
Vue.use(VueTouch);
Vue.use(vueResource);
Vue.use(VueAsyncData);
Vue.use(VueValidator);

export { config, common, pages, Vue };
