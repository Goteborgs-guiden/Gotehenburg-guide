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
    },
    {

      path: '/FillInBlankQuizView',
      name: 'FillInBlankQuizView',
      component: () => import('../views/FillInBlankQuizView.vue')
    },
    {
      path: '/MapQuizView',
      name: 'MapQuizView',
      component: () => import('../views/MapQuizView.vue')
    },
    {

      path: '/Profile',
      name: 'Profile',
      component: () => import('../views/ProfilePage.vue')
    },
    {
      path: '/Highscore',
      name: 'Highscore',
      component: () => import('../views/HighscorePage.vue')
    }
  ]
})

export default router
