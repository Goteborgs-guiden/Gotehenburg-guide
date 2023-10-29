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
      path: '/tjot',
      name: 'AbcView',
      component: () => import('../views/AbcView.vue')
    },
    {

      path: '/ordvitsknok',
      name: 'FillInBlankQuizView',
      component: () => import('../views/FillInBlankQuizView.vue')
    },
    {
      path: '/geografikack',
      name: 'MapQuizView',
      component: () => import('../views/MapQuizView.vue')
    },
    {

      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfilePage.vue')
    },
    {
      path: '/highscore',
      name: 'Highscore',
      component: () => import('../views/HighscorePage.vue')
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: () => import('../components/ForgotPasswordForm.vue')
    }
  ]
})

export default router
