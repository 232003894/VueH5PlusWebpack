import Vue from 'vue'
import FastClick from 'fastclick'
FastClick.attach(document.body)

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
  currentPage = to.name
  if (to.name === 'Main') {
    commit('Title', '主页')
    commit('ShowBack', false)
    commit('headerHeight', 46)
    commit('bottomHeight', 55)
  } else if (to.name === 'Demo') {
    commit('Title', '演示')
    commit('ShowBack', true)
    commit('headerHeight', 46)
    commit('bottomHeight', 55)
  } else if (to.name === 'Setting') {
    commit('Title', '设置')
    commit('ShowBack', true)
    commit('headerHeight', 46)
    commit('bottomHeight', 55)
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
    name: 'Main',
    component: Main
  },
  '/setting': {
    name: 'Setting',
    component: Setting
  },
  '/demo': {
    name: 'Demo',
    component: Demo
  }
})
router.start(App, 'app')
