<template>
  <div>
    <child-page-header
      :title="`${display.tripList.length} Trips`"
      :show="true"
    />
    <div class="row">
      <div class="col d-flex justify-content-between mb-2">
        <b-button disabled squared size="sm" @click="sortListByStatus(display.sortLabel)">
          <i class="fa-solid fa-filter"></i>
          Filter
        </b-button>
        <b-button squared size="sm" @click="sortListByStatus(display.sortLabel)">
          <i class="fa-solid fa-sort"></i>
          {{ display.sortLabel }}
        </b-button>
      </div>
    </div>
    <loading-and-error-handler
      :loading="is.loadingTripData"
      loading-message="Loading trips..."
      :error="error.loadingTripData"
      :error-message="display.errorMessage.loadingTripData"
    />
    <div v-if="!is.loadingTripData && !error.loadingTripData && display.tripList.length">
      <div v-for="trip in display.tripList" :key="trip.TripId">
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
        sortLabel: 'Status',
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
    getTrips(driverId) {
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
    sortListByStatus(label) {
      if (label === 'Status') {
        this.display.tripList.sort((a, b) => a.Status < b.Status ? -1 : 1)
        this.display.sortLabel = 'Trip ID'
      } else if (label === 'Trip ID') {
        this.display.tripList.sort((a, b) => a.TripId < b.TripId ? -1 : 1)
        this.display.sortLabel = 'Status'
      }
    },
    filterByProperty(prop) {
      this.display.tripList = this.display.tripList.filter(trip => trip[prop] === prop)

    }
  },
}
</script>
<style scoped>
  button {
    background-color: white !important;
    color: rgba(244, 112, 40) !important;
    border: 1px solid rgba(244, 112, 40) !important;
    box-shadow: none !important;
  }
</style>