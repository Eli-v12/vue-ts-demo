import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Content from '../components/Content.vue'
// import Create from '../components/Create.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
    // component: () => import('../views/About.vue')
  },
  {
    path: '/content/create',
    name: 'create',
    component: Content
  },
  {
    path: '/content/:id',
    name: 'Content',
    component: Content
  }
  // {
  //   path: '/create',
  //   name: 'Create',
  //   component: Create
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
