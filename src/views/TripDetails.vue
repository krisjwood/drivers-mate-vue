<template>
  <div>
    <child-page-header
      :title="`Trip #${$route.params.tripId}`"
    />
    <loading-and-error-handler
      :loading="is.loadingTripData"
      loading-message="Loading trips..."
      :error="error.loadingTripData"
      :error-message="display.errorMessage.loadingTripData"
    />
    <div v-if="!is.loadingTripData && !error.loadingTripData && display.tripDetails">
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between">
          <div>
            <b>{{ display.tripDetails.Consignments.length }} Consignments</b>
          </div>
          <div>
            <b>Status: {{ display.tripDetails.Status }}</b>
          </div>
        </div>
      </div>
      <div v-for="(consignment, index) in display.tripDetails.Consignments" :key="consignment.OrderId">
        <b-card :title="`${formatDateTime(consignment.RequestedPickupTime)}`" header-tag="header" class="mb-3">
          <template #header>
            <h6 class="d-flex justify-content-between mb-0">
              <b>{{ consignment.Items.length }} Items</b>
                {{ consignment.Status }}
            </h6>
            </template>
          <div class="row d-flex justify-content-between">
            <b-card-text class="col">
              <div>
                {{  }}              
              </div>
              <div>
                <b>Pickup: </b>{{ Object.values(consignment.PickupAddress).join(', ') }}
                <b>Delivery: </b>{{ Object.values(consignment.DeliveryAddress).join(', ') }}
              </div>
            </b-card-text>
          </div>
            <div class="m-2">
              <b-button squared @click="goToTrip(consignment.OrderId)">Instructions</b-button>
            </div>
          <template #footer>
            <div class="row d-flex justify-content-between mx-1">
              <em>Order ID: {{consignment.OrderId}}</em>
              <div>{{ index + 1 }}/{{ display.tripDetails.Consignments.length }}</div>
            </div>
          </template>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
  const dayjs = require('dayjs')
  import TripsData from '@/data/TripsData'
  import ChildPageHeader from '@/components/ChildPageHeader'
  import router from '@/router'
  import LoadingAndErrorHandler from '@/components/LoadingAndErrorHandler'

  export default {
    name: 'TripDetails',
    components: {
      ChildPageHeader,
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
          tripDetails: null,
          errorMessage: {
            loadingTripData: '',
          }
        }
      }
    },
    mounted() {
      this.getTrip(this.$route.params.tripId)
    },
    methods: {
      getTrip(tripId) {
        this.display.errorMessage.loadingTripData = '';
        
        TripsData.getTrip(tripId)
        .then((response) => {
          this.display.tripDetails = response.data
        })
        .catch((error) => {
          this.error.loadingTripData = true;
          this.display.errorMessage.loadingTripData = error.response.data ? error.response.data.ErrorMessage : `${error.message} retriving trip data. Try refreshing the page.`;
        })
        .finally(() => {
          this.is.loadingTripData = false;
        })
      },
      goToTrip(OrderId) {
        router.push({ name: 'trip-consignment', params: { OrderId, } })
      },
      formatDateTime(date) {
        return dayjs(date).format('ddd, MMM D, YYYY h:mm A')
      },
    },
  }
</script>