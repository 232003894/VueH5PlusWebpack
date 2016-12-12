import Vue from 'vue'
import Vuex from 'vuex'

/** $api*/
import * as $api from 'api'

Vue.use(Vuex)

const state = {
  title: '主页',
  showBack: false,
  isLoading: false,
  direction: 'forward'
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
    UPDATE_LOADING(state, status) {
      $api.loading(status)
      state.isLoading = status
    },
    UPDATE_DIRECTION(state, direction) {
      state.direction = direction
    }
  }
})
