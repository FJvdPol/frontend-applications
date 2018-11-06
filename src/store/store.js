import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    user: null,
    client: null,
    formindex: 0
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setClient(state, client){
      state.client = client
    },
    logOut(state){
      state.user = null
      state.client = null
      state.formindex = 0
    },
    formSetIndex(state, index){
      state.formindex = index
    }
  },
  actions: {
    setUser({commit}, user) {
      commit('setUser', user)
    },
    setClient({commit}, client){
      commit('setClient', client)
    },
    logOut({commit}) {
      commit('logOut')
    },
    formSetIndex({commit}, index) {
      commit('formSetIndex', index)
    }
  }
})
