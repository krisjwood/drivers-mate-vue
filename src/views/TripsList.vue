<template>
  <div>
    <child-page-header
      title="Trips List"
    />
    <div v-if="is.loadingTripData">
      <div class="d-flex justify-content-center mb-1">
        <b-spinner label="Loading drivers..."></b-spinner>
      </div>
    </div>
    <div v-else-if="error.loadingTripData">
      <b-alert 
        show
        dismissible
        variant="danger"
        >
        {{ this.display.errorMessage.loadingTripData }}
      </b-alert>
    </div>
    <div v-else>
      <div v-for="trip in display.tripList" :key="trip.TridpId">
        <div>
          <a @click="goToTrip(trip.TripId)">
            <trip-item 
              :trip-details="trip"
            />
          </a> 
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import TripsData from '../data/TripsData';
import TripItem from '../components/TripItem'
import ChildPageHeader from '../components/ChildPageHeader'
import router from '@/router';

export default {
  name: 'TripsList',
  components: {
    ChildPageHeader,
    TripItem
  },
  data() {
    return {
      is: {
        loadingTripData: true,
      },
      error: {
        loadingTripData: false,
      },
      display: {
        tripList: [],
        errorMessage: {
          loadingTripData: null,
        }
      }
    }
  },
  mounted() {
    this.getTrips(this.$route.params.driverId) 
  },
  methods: {
    getTrips(driverId = null) {
      this.display.errorMessage.loadingTripData = null;

      TripsData.getTrips()
        .then((response) => {
          if (driverId) {
            this.display.tripList = response.data.filter((trip) => trip.DriverId === driverId)
          } else {
            this.display.tripList = [ ...response.data ]
          }
        })
        .catch((error) => {
          this.error.loadingTripData = true;
          this.display.errorMessage.loadingTripData = error.response.data ? error.response.data.ErrorMessage : `${error.message} retriving trip data. Try refreshing the page.`;
        })
        .finally(() => {
          this.is.loadingTripData = false;
        })
    },
    goToTrip(tripId) {
      router.push({ name: 'trip-details', params: { tripId, } })
    }


  },
}
</script>