import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('../views/newView.vue')
    },
    {
      path: '/AbcView',
      name: 'AbcView',
      component: () => import('../views/AbcView.vue')
    }
    

  ]
})

export default router
