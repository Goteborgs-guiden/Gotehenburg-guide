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
      path: '/OrdvitsarQuiz',
      name: 'OrdvitsarQuiz',
      component: () => import('../views/OrdvitsarQuiz.vue')
    },
    {
      path: '/MapQuizView',
      name: 'MapQuiz',
      component: () => import('../views/MapQuizView/MapQuizView.vue')
    },
    {
      path: '/MapQuizView2',
      name: 'MapQuiz2',
      component: () => import('../views/MapQuizView/MapQuizView2.vue')
    },
    {
      path: '/MapQuizView3',
      name: 'MapQuiz3',
      component: () => import('../views/MapQuizView/MapQuizView3.vue')
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: () => import('../views/ProfilePage.vue')
    }

  ]
})

export default router
