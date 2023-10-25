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
    },
    {
      path: '/Highscore',
      name: 'Highscore',
      component: () => import('../views/HighscorePage.vue')
    },
    {
      path: '/gbguide',
      name: 'gbguide',
      component: () => import('../views/gbguide/GbguidePage.vue')
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: () => import('../components/ScrollMenu.vue')
    },
    {
      path: '/gbguide/Swimming',
      name: 'Swimming',
      component: () => import('../views/gbguide/GbguideSwimming.vue')
    },
    {
      path: '/gbguide/Museum',
      name: 'Museum',
      component: () => import('../views/gbguide/GbguideMuseum.vue')
    },
    {
      path: '/gbguide/Pubs',
      name: 'Pubs',
      component: () => import('../views/gbguide/GbguidePubs.vue')
    },
    {
      path: '/gbguide/Artist',
      name: 'Artists',
      component: () => import('../views/gbguide/GbguideArtists.vue')
    },
    {
      path: '/gbguide/Hiking',
      name: 'Hiking',
      component: () => import('../views/gbguide/GbguideHikingTrails.vue')
    },
    {
      path: '/gbguide/ViewSpots',
      name: 'ViewSpots',
      component: () => import('../views/gbguide/GbguideViewSpots.vue')
    },
    {
      path: '/gbguide/TouristAttractions',
      name: 'TouristAttractions',
      component: () => import('../views/gbguide/GbguideToursistAttractions.vue')
    },
    {
      path: '/gbguide/Restaurants',
      name: 'Restaurants',
      component: () => import('../views/gbguide/GbguideRestaurants.vue')
    }
  ]
})

export default router
