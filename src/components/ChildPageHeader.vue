<template>
  <div>
    <div class="row d-flex justify-content-between align-items-center">
      <div class="col">
        <img class="h-auto w-75" src="../assets/drivers-mate-nl-logo-child.png" alt="Netlogix Driver's Mate Logo">
      </div>
      <div class="col-4">
        <div class="row d-flex justify-content-end align-items-center mr-3">
          <div class="d-flex align-items-center">
            <i class="fa-solid fa-user mr-2" />
          </div>
          <span><b>{{ display.selectedDriver }}</b></span>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center align-content-center mx-2">
      <h1>{{ title }}</h1>
      <!-- <div class="d-flex justify-content-">
        <div>
          <b-button>Back</b-button>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'ChildPageHeader',
  props: {
    title: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      display: {
        selectedDriver: null,
      }
    }
  },
  mounted() {
    if (sessionStorage.getItem('selectedDriver'))
    this.display.selectedDriver = sessionStorage.getItem("selectedDriver");
  }
}
</script>
<style>
  h1 {
    color: rgba(244, 112, 40)
  }
</style>