<template>
  <div>
    <div class="d-flex justify-content-center align-items-center mt-5">
      <img class="h-auto w-75" src="../assets/drivers-mate-nl-logo.png" alt="Netlogix Driver's Mate Logo">
    </div>
    <div v-if="is.loadingDriverData">
      <div class="d-flex justify-content-center mb-1">
        <b-spinner label="Loading drivers..."></b-spinner>
      </div>
      <p class="text-center">Loading drivers...</p>
    </div>
    <div v-else-if="error.loadingDriverData">
      <b-alert 
        :show="error.loadingDriverData"
        dismissible
        variant="danger"
        >
        {{ this.display.errorMessage.loadingDriverData }}
      </b-alert>
    </div>
    <div v-else>
      <div class="row mr-3 ml-3">
        <b-form-select :disabled="!selected.availableDrivers.length" v-model="selected.driver" :options="selected.availableDrivers">
          <template #first>
            <b-form-select-option :value="null" disabled>-- Select a driver --</b-form-select-option>
          </template>
        </b-form-select>
      </div>
      <div class="d-flex justify-content-center">
        <b-button squared :disabled="!selected.driver" @click="goToTripsList()" class="m-2">View Trips</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import router from '@/router'
import DriverData from '../data/DriversData'
export default {
  name: 'LandingView',
  data() {
    return {
      is: {
        loadingDriverData: true,
      },
      error: {
        loadingDriverData: false,
      },
      selected: {
        driver: null,
        availableDrivers: [],
      },
      display: {
        errorMessage: {
          loadingDriverData: null,
        }
      }
    }
  },
  mounted() {
    this.getDrivers()
  },
  methods: {
    async getDrivers() {
      this.display.errorMessage.loadingDriverData = null;

      this.selected.availableDrivers = await DriverData.getDrivers()
        .then((response) => {
          let drivers = response.data.map((driver) => {
            return {
              text: `${driver.FirstName} ${driver.LastName} (${driver.Shipper})`,
              value: driver.DriverId
            }
          })
          return drivers
        })
        .catch((error) => {
          this.error.loadingDriverData = true;
          this.display.errorMessage.loadingDriverData = error.response.data ? error.response.data.ErrorMessage : `${error.message} retriving driver data. Try refreshing the page.`
        })
        .finally(() => {
          this.is.loadingDriverData = false;
        })
    },
    goToTripsList() {
      router.push({ name: 'trips-list', params: { driverId: this.selected.driver.DriverId } })
      sessionStorage.setItem("selectedDriver", this.selected.driver);
    },
  },
}
</script>
<style scoped>
  .landing-fade-in {
    animation: fadeInAnimation ease-in 2s;
  }

  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
</style>