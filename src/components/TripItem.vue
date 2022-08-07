<template>
  <div class="trip-item-wrapper">
      <div class="row">
        <div class="col">
          <b>Trip ID:</b>
          {{ tripDetails.TripId }}
        </div>
        <div class="col"> 
          <b>Status:</b> 
          {{ tripDetails.Status }}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <b>Driver ID:</b>
          {{ tripDetails.DriverId }}
        </div>
        <div class="col"> 
          <b>Rego:</b> 
          {{ tripDetails.TruckRegistration }}
        </div>
      </div>
  </div>
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
}
</script>
<style scoped>
  .trip-item-wrapper {
    width: 90vw;
    background-color: rgba(19, 28, 69, 0.37);
    border: 2px solid rgba(19, 28, 69);
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 10px;
  }
</style>