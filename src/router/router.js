import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/Home.vue'
import Login from '../components/pages/Login.vue'
import Register from '../components/pages/Register.vue'
import PageClients from '../components/pages/PageClients.vue'
import SingleClient from '../components/templates/SingleClient.vue'
import PageRiskAnalysis from '../components/pages/PageRiskAnalysis.vue'
import PageNotFound from '../components/pages/PageNotFound.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registeren',
      name: 'register',
      component: Register
    },
    {
      path: '/clienten',
      name: 'clients',
      component: PageClients
    },
    {
      path: '/clienten/:name',
      name: 'singleclient',
      component: SingleClient
    },
    {
      path: '/risico-analyse',
      name: 'riskanalysis',
      component: PageRiskAnalysis
    },

    { path: '/page-not-found', component: PageNotFound },
    { path: '*', redirect: '/page-not-found' }
  ]
})
