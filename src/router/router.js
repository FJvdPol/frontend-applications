import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/Home.vue'
import Login from '../components/pages/Login.vue'
import Register from '../components/pages/Register.vue'
import PageInfo from '../components/pages/PageInfo.vue'
import PageClients from '../components/pages/PageClients.vue'
import SingleClient from '../components/templates/SingleClient.vue'
import PageRiskAnalysis from '../components/pages/PageRiskAnalysis.vue'
import PageNotFound from '../components/pages/PageNotFound.vue'
import store from '../store/store'

Vue.use(Router)

const checkLogin = (to, from, next) => {
  if (!store.state.user && !sessionStorage.getItem('user')) {
    next({name: 'login'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/info',
    name: 'info',
    component: PageInfo
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
    component: PageClients,
    beforeEnter: checkLogin
  },
  {
    path: '/clienten/risico-analyse',
    name: 'riskanalysis',
    component: PageRiskAnalysis,
    beforeEnter: checkLogin
  },
  {
    path: '/clienten/:id',
    name: 'singleclient',
    component: SingleClient,
    beforeEnter: checkLogin
  },
  {
    path: '/page-not-found',
    name: 'page-not-found',
    component: PageNotFound
  },
  { path: '*', redirect: '/page-not-found' }
]

const router = new Router({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
})
router.beforeEach((to, from, next) => {
  if (!store.state.user && sessionStorage.getItem('user')) {
    store.dispatch('setUser', JSON.parse(sessionStorage.getItem('user')))
  }
  next()
})




export default router
