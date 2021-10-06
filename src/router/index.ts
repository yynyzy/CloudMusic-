import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/listView',
    name: 'listView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/listView.vue')
  }, {
    path: '/searchView',
    name: 'searchView',
    component: () => import('../views/searchView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/my',
    name: 'my',
    beforeEnter: (to, from, next) => {
      if (store.state.user.isLogin) {
        next()
      } else {
        next('login')
      }
    },
    component: () => import('../views/myCenter.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
