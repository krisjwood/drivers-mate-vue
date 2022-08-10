import LandingView from '@/views/LandingView'
import TripsList from '@/views/TripsList'
import TripDetails from '@/views/TripDetails'
import TripConsignment from '@/views/TripConsignment'

const Router = {
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/trips/:id',
      name: 'trips-list',
      component: TripsList
    },
    {
      path: '/trip/:id',
      name: 'trip-details',
      component: TripDetails
    },
    {
      path: '/consignments/:id',
      name: 'trip-consignment',
      component: TripConsignment
    },
  ]
}

export default Router