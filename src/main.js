import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex-router-sync'
import router from './router/router'
import store from './store/store'

Vue.config.productionTip = false

Vuex.sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
