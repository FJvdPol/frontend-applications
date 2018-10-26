import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/pages/Home.vue'
import Login from './components/pages/Login.vue'
import PageClients from './components/pages/PageClients.vue'
import SingleClient from './components/templates/SingleClient.vue'
import PageRiskAnalysis from './components/pages/PageRiskAnalysis.vue'
import PageNotFound from './components/pages/PageNotFound.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
    },

    { path: '/page-not-found', component: PageNotFound },
    { path: '*', redirect: '/page-not-found' }
  ]
})
