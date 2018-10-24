import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/pages/Home.vue'
import PageClients from './components/pages/PageClients.vue'
import SingleClient from './components/templates/SingleClient.vue'
import PageRiskAnalysis from './components/pages/PageRiskAnalysis.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/clienten',
      name: 'PageClients',
      component: PageClients
    },
    {
      path: '/clienten/:name',
      name: 'SingleClient',
      component: SingleClient
    },
    {
      path: '/risico-analyse',
      name: 'PageRiskAnalysis',
      component: PageRiskAnalysis
    }
  ]
})
