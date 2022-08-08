<template>
  <div>
    <child-page-header
      title="Trips List"
    />
    <div class="row">
      <div class="col d-flex justify-content-between mb-2">
        <div class="d-flex align-items-center ml-1 font-weight-bold">
          Total: {{ display.tripList.length }}
        </div>
        <div class="mr-1">
          <!-- <b-button @click="filterByProperty('')">
            <i class="fa-solid fa-filter m-2 pt-1"></i>
          </b-button> -->
          <b-button squared size="sm" @click="sortListByStatus()">
            <i class="fa-solid fa-sort mx-2"></i>
            Sort by Status
          </b-button>
        </div>
      </div>
    </div>
    <loading-and-error-handler
      :loading="is.loadingTripData"
      loading-message="Loading trips..."
      :error="error.loadingTripData"
      :error-message="display.errorMessage.loadingTripData"
    />
    <div v-if="!is.loadingTripData && !error.loadingTripData && display.tripList.length">
      <div v-for="trip in display.tripList" :key="trip.TridpId">
        <trip-item 
          :trip-details="trip"
        />
      </div>
    </div>
  </div>
</template>
<script>
import TripsData from '@/data/TripsData';
import TripItem from '@/components/TripItem'
import ChildPageHeader from '@/components/ChildPageHeader'
import LoadingAndErrorHandler from '@/components/LoadingAndErrorHandler';

export default {
  name: 'TripsList',
  components: {
    ChildPageHeader,
    TripItem,
    LoadingAndErrorHandler,
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
          loadingTripData: '',
        }
      }
    }
  },
  mounted() {
    this.getTrips(this.$route.params.driverId) 
  },
  methods: {
    getTrips(driverId = null) {
      this.display.errorMessage.loadingTripData = '';

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
    sortListByStatus() {
      this.display.tripList.sort((a, b) => a.Status < b.Status ? -1 : 1)
    },
    filterByProperty(prop) {
      this.display.tripList = this.display.tripList.filter(trip => trip[prop] === prop)

    }
  },
}
</script>