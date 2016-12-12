import Vue from 'vue'
import VueTouch from 'vue-touch'
Vue.use(VueTouch)
import Router from 'vue-router'
Vue.use(Router)

import 'configVue'
import App from './app'
import Demo from './demo'
import Main from './main'
import Setting from './setting'

import * as init from '../../libs/api/init'

const router = new Router({
  transitionOnLoad: true
    // saveScrollPosition: true
})

/**
 * sync router params
 */
import {
  sync
} from 'vuex-router-sync'

import store from './store'

let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

// save position for demo page
let indexScrollTop = {}
let currentPage = ''

function saveDemoScrollTop() {
  indexScrollTop[currentPage] = window.scrollY
}

/**
 * sync router loading status
 */
const commit = store.commit || store.dispatch
router.beforeEach(({
  to,
  from,
  next
}) => {
  currentPage = to.path
  if (to.path === '/') {
    commit('Title', '主页')
    commit('ShowBack', false)
  } else if (to.path === '/demo') {
    commit('Title', '演示')
    commit('ShowBack', true)
  } else if (to.path === '/setting') {
    commit('Title', '设置')
    commit('ShowBack', true)
  }
  commit('UPDATE_LOADING', true)
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (toIndex > fromIndex) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  setTimeout(next, 250)
})

router.afterEach((transition) => {
  commit('UPDATE_LOADING', false)
  if (indexScrollTop[currentPage] === undefined) {
    indexScrollTop[currentPage] = 0
  }
  setTimeout(function () {
    window.scrollTo(0, indexScrollTop[currentPage])
  }, 100)

  window.removeEventListener('scroll', saveDemoScrollTop, false)
  setTimeout(function () {
    window.addEventListener('scroll', saveDemoScrollTop, false)
  }, 200)

  init.boxOpts.isError = false
})

sync(store, router)
router.map({
  '/': {
    component: Main
  },
  '/setting': {
    component: Setting
  },
  '/demo': {
    component: Demo
  }
})
router.start(App, 'app')
