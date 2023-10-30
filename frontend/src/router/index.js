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

      path: '/random',
      name: 'random',
      component: () => import('../views/RandomView.vue')

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
      path: '/gbguide/swimming',
      name: 'Swimming',
      component: () => import('../views/gbguide/GbguideSwimming.vue')
    },
    {
      path: '/gbguide/museum',
      name: 'Museum',
      component: () => import('../views/gbguide/GbguideMuseum.vue')
    },
    {
      path: '/gbguide/pubs',
      name: 'Pubs',
      component: () => import('../views/gbguide/GbguidePubs.vue')
    },
    {
      path: '/gbguide/artists',
      name: 'Artists',
      component: () => import('../views/gbguide/GbguideArtists.vue')
    },
    {
      path: '/gbguide/hiking',
      name: 'Hiking',
      component: () => import('../views/gbguide/GbguideHikingTrails.vue')
    },
    {
      path: '/gbguide/viewspots',
      name: 'ViewSpots',
      component: () => import('../views/gbguide/GbguideViewSpots.vue')
    },
    {
      path: '/gbguide/touristattractions',
      name: 'TouristAttractions',
      component: () => import('../views/gbguide/GbguideToursistAttractions.vue')
    },
    {
      path: '/gbguide/restaurants',
      name: 'Restaurants',
      component: () => import('../views/gbguide/GbguideRestaurants.vue')

    }
  ]
})

export default router
