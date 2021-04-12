import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contentOffset: 0,
    catalog: ''
  },
  mutations: {
    async setContentOffset (state, value) {
      state.contentOffset = value
    },
    setCatalog (state, value) {
      state.catalog = value
    }
  }
})
