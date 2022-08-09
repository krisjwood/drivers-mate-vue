import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingView from '../views/LandingView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingView
  },
  {
    path: '/trips',
    name: 'trips-list',
    component: () => import('../views/TripsList.vue')
  },
  {
    path: '/trip',
    name: 'trip-details',
    component: () => import('../views/TripDetails.vue')
  },
  {
    path: '/consignments',
    name: 'trip-consignment',
    component: () => import('../views/TripConsignment.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
