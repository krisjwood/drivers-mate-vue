<template>
  <div>
    <div class="d-flex justify-content-center align-items-center mt-5">
      <img class="h-auto w-75" src="../assets/drivers-mate-nl-logo.png" alt="Netlogix Driver's Mate Logo">
    </div>
    <loading-and-error-handler
      :loading="is.loadingDriverData"
      loading-message="Loading drivers..."
      :error="error.loadingDriverData"
      :error-message="display.errorMessage.loadingDriverData"
    />
    <div v-if="!is.loadingDriverData && !error.loadingDriverData && selected.availableDrivers">
      <div class="row mr-3 ml-3">
        <b-form-select 
          :disabled="!selected.availableDrivers" 
          v-model="selected.driver" 
          :options="selected.availableDrivers"
          >
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
import { routePush } from '@/components/helpers';
import DriverData from '@/data/DriversData'
import LoadingAndErrorHandler from '@/components/LoadingAndErrorHandler';

export default {
  name: 'LandingView',
  components: {
    LoadingAndErrorHandler,
  },
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
          loadingDriverData: '',
        }
      }
    }
  },
  mounted() {
    this.getDrivers()
  },
  methods: {
    async getDrivers() {
      this.display.errorMessage.loadingDriverData = '';

      this.selected.availableDrivers = await DriverData.getDrivers()
        .then((response) => {
          let drivers = response.data.map((driver) => {
            return {
              text: `${driver.FirstName} ${driver.LastName} (${driver.Shipper})`,
              value: driver.DriverId,
              ...driver
            }
          })
          drivers.unshift(
            {
              text: 'All',
              value: null
            }
          )

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
      routePush({ name: 'trips-list', params: { driverId: this.selected.driver.DriverId || null } })
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