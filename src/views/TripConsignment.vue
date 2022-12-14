<template>
  <div>
    <child-page-header
      :title="`Order #${display.consignmentDetails && display.consignmentDetails.OrderId}`"
      :show="!!(display.consignmentDetails && display.consignmentDetails.OrderId)"
    />
    <loading-and-error-handler
      :loading="is.loadingOrderData"
      loading-message="Loading Order..."
      :error="error.loadingOrderData || !display.consignmentDetails.OrderId"
      :error-message="display.errorMessage.loadingOrderData"
    />
    <div v-if="!is.loadingOrderData && !error.loadingOrderData && display.consignmentDetails">
      <div class="d-flex justify-content-center">
        <h3 class="row">
          {{formatDateTime(display.consignmentDetails.RequestedPickupTime)}}
        </h3>
      </div>
      <div class="row d-flex justify-content-center mb-3">
        <b>{{ display.consignmentDetails.Status }} (#{{ display.consignmentDetails.TripId }})</b>
      </div>
      <div v-if="display.consignmentDetails.Items" class="d-flex justify-content-between mb-2">
        <h4>Items ({{display.consignmentDetails.Items.length}})</h4>
        <div> 
          <b-button
            v-b-modal.directions
            size="sm"
            squared 
            >
            Directions
          </b-button>
        </div>
      </div>
      <b-table 
        sticky-header 
        bordered 
        small 
        striped 
        hover 
        :items="display.consignmentDetails.Items"
        >
      </b-table>
      <b-card title="Pickup details" class="mb-3">
        <div class="row d-flex justify-content-between">
          <b-card-text class="col">
            <div class="col">
              <div class="row">
                <h5>Address</h5>
                <a 
                  class="d-flex align-items-top" 
                  @click="copyToClipboard(formatAddress(display.consignmentDetails.PickupAddress))"
                  >
                  <i class="fa-solid fa-copy ml-2"></i>
                </a>
              </div>
              <div class="row">
                {{ formatAddress(display.consignmentDetails.PickupAddress) }}
              </div>
            </div>
            <div class="mt-2">
              <h5>Instructions</h5>
              {{ display.consignmentDetails.PickupInstructions }}
            </div>
          </b-card-text>
        </div>
      </b-card>
      <b-card title="Delivery details" class="mb-3">
        <div class="row d-flex justify-content-between">
          <b-card-text class="col">
            <div class="col">
              <div class="row">
                <h5>Address</h5>
                <a 
                  class="d-flex align-items-top" 
                  @click="copyToClipboard(formatAddress(display.consignmentDetails.DeliveryAddress))"
                  >
                  <i class="fa-solid fa-copy ml-2"></i>
                </a>
              </div>
              <div class="row">
                {{ formatAddress(display.consignmentDetails.DeliveryAddress) }}
              </div>
            </div>
            <div class="mt-2">
              <h5>Instructions</h5>
              {{ display.consignmentDetails.DeliveryInstructions }}
            </div>
          </b-card-text>
        </div>
      </b-card>   
    </div>
    <b-modal id="directions" class="d-flex justify-content-center" hide-footer title="Invalid address">
      <h4 class="my-4">If the address was real the Google Maps API would plan your route for you.</h4>
      <p class="my-4">Ask the engineering team to put a ticket in the backlog <i class="fa-solid fa-face-smile-wink"></i></p>
      <b-alert show variant="info">In the meantime you can copy the address using the <i class="fa-solid fa-copy ml-2"></i> symbol next to the address</b-alert>
      <b-button block squared class="mt-3"  @click="$bvModal.hide('directions')">Ok</b-button>
    </b-modal>
  </div>
</template>
<script>
  import ConsignmentsData from '@/data/ConsignmentsData' 
  import ChildPageHeader from '@/components/ChildPageHeader'
  import LoadingAndErrorHandler from '@/components/LoadingAndErrorHandler'
  import { formatDateTime, setSessionData, getSessionData } from '@/components/helpers.js'

  export default {
    name: 'TripConsignments',
    components: {
      ChildPageHeader,
      LoadingAndErrorHandler,
    },
    data() {
      return {
        is: {
          loadingOrderData: true,
          copiedText: false,
        },
        error: {
          loadingOrderData: false,
        },
        display: {
          consignmentDetails: {},
          errorMessage: {
            loadingOrderData: '',
          },
        }
      }
    },
    mounted() {
      if (this.$route.params.id) {
        this.getConsignmentById(this.$route.params.id)
      } else if (sessionStorage.getItem('consignmentDetails')) {
        const sessionConsignmentDetails  = this.getSessionData('consignmentDetails')
        this.getConsignmentById(sessionConsignmentDetails.OrderId)
      }
    },
    methods: {
      /** Fetches consignment by ID from backend and stores value in sessionStorage
       * @param {String} OrderId
       * @returns {Object} response from endpoint
       */
      async getConsignmentById(OrderId) {
        this.display.consignmentDetails = await ConsignmentsData.getConsignment(OrderId)
        .then((response) => {
          this.setSessionData('consignmentDetails', JSON.stringify(response.data))
          return response.data
        })
        .catch((error) => {
            this.error.loadingOrderData = true;
            this.display.errorMessage.loadingOrderData = error.response.data ? error.response.data.ErrorMessage : `${error.message} retriving trip data. Try refreshing the page.`;
          })
        .finally(() => {
          this.is.loadingOrderData = false;
        })
      },
      /** Converts address object to string
       * @param {Object} address 
       * @returns {String} address lines seperated by commas
       */
      formatAddress(address) {
        if (address) {
          return Object.values(address).join(', ')
        }
      },
      /** Copied address text to clipboard
       * @param {String} value address
       */
      copyToClipboard(value) {
        this.copiedToast('b-toaster-bottom-center')
        navigator.clipboard.writeText(value)
      },
      /** Toast popup notifying user that text has been copied to clipboard
       * @param {String} toaster of toast position
       */
      copiedToast(toaster) {
        this.$bvToast.toast(`Copied!`, {
          title: '',
          toaster: toaster,
          solid: true,
          appendToast: true,
          variant: 'success',
          noCloseButton: true,
          autoHideDelay: 1000,
        })
      },
      setSessionData,
      getSessionData,
      formatDateTime,
    },
  }
</script>
<style scoped>
  i {
    color: rgba(244, 112, 40);
  }

  i:hover {
    cursor: pointer;
    color: black;
  }
</style>