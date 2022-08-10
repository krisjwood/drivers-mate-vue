<template>
  <b-card header-tag="header" class="mb-3">
   <template #header>
      <h6 class="d-flex justify-content-between mb-0">
        <b>Trip ID: {{ tripDetails.TripId }}</b>
        <i>Driver ID: {{ tripDetails.DriverId }}</i>
      </h6>
    </template>
    <div class="row d-flex justify-content-between">
      <b-card-text class="col">
        <div>
          <b>Status:</b> 
          {{ tripDetails.Status }}
        </div>
        <div>
          <b>Rego:</b> 
          {{ tripDetails.TruckRegistration }}
        </div>
      </b-card-text>
      <div class="m-2">
        <b-button squared @click="goToTrip(tripDetails.TripId)">Details</b-button>
      </div>
    </div>
  </b-card>
</template>
<script>
export default {
  name: 'TripItem',
  props: {
    tripDetails: {
      type: Object,
      required: true,
    }
  },
  methods: {
    goToTrip(tripId) {
      this.$router.push({name: 'trip-details', params: {
        id: tripId
      }})
    }
  }
}
</script>