<template>
  <div>
    <child-page-header
      :title="`Trip #${display.tripDetails && display.tripDetails.TripId}`"
      :show="display.tripDetails ? !!display.tripDetails.TripId : false"
    />
    <loading-and-error-handler
      :loading="is.loadingTripData"
      loading-message="Loading trip..."
      :error="error.loadingTripData || !display.tripDetails.TripId"
      :error-message="display.errorMessage.loadingTripData"
    />
    <div v-if="!is.loadingTripData && !error.loadingTripData && display.tripDetails">
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between">
          <div>
            <b>{{ display.tripDetails.Consignments && display.tripDetails.Consignments.length }} Consignments</b>
          </div>
          <div>
            <b>Status: {{ display.tripDetails.Status }}</b>
          </div>
        </div>
      </div>
      <div v-for="(consignment, index) in display.tripDetails.Consignments" :key="consignment.OrderId">
        <consignment-item 
          :consignment="consignment"
          :index="index"
          :quantity="display.tripDetails.Consignments.length"
        />
      </div>
    </div>
  </div>
</template>
<script>
  import TripsData from '@/data/TripsData'
  import ChildPageHeader from '@/components/ChildPageHeader'
  import LoadingAndErrorHandler from '@/components/LoadingAndErrorHandler'
  import ConsignmentItem from '@/components/ConsignmentItem'

  export default {
    name: 'TripDetails',
    components: {
      ChildPageHeader,
      LoadingAndErrorHandler,
      ConsignmentItem
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
          tripDetails: {},
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
      async getTrip(tripId) {
        this.display.errorMessage.loadingTripData = '';
        
        this.display.tripDetails = await TripsData.getTrip(tripId)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          this.error.loadingTripData = true;
          this.display.errorMessage.loadingTripData = error.response.data ? error.response.data.ErrorMessage : `${error.message} retriving trip data. Try refreshing the page.`;
        })
        .finally(() => {
          this.is.loadingTripData = false;
        })
      },
    },
  }
</script>