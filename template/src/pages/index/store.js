import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  title: '主页',
  showBack: false,
  isLoading: false,
  direction: 'forward',
  headerHeight: 46,
  bottomHeight: 55
}
export default new Vuex.Store({
  state,
  mutations: {
    Title(state, title) {
      state.title = title
    },
    ShowBack(state, showBack) {
      state.showBack = showBack
    },
    headerHeight(state, headerHeight) {
      state.headerHeight = headerHeight
    },
    bottomHeight(state, bottomHeight) {
      state.bottomHeight = bottomHeight
    },
    UPDATE_LOADING(state, status) {
      window.$loading && window.$loading(status)
      state.isLoading = status
    },
    UPDATE_DIRECTION(state, direction) {
      state.direction = direction
    }
  }
})
