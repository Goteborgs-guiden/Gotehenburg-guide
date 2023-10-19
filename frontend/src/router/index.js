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
    }
    

  ]
})

export default router
