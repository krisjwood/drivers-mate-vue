<template>
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
          <b>Pickup</b>{{ formatShortAddress(consignment.PickupAddress) }}
        </div>
        <div>
          <b>Delivery</b>{{ formatShortAddress(consignment.DeliveryAddress) }}
        </div>
      </b-card-text>
    </div>
      <div class="mt-3">
        <b-button squared @click="goToConsignment(consignment.OrderId)">Instructions</b-button>
      </div>
    <template #footer>
      <div class="row d-flex justify-content-between mx-1">
        <em>Order ID: {{consignment.OrderId}}</em>
        <div>{{ index + 1 }}/{{ quantity }}</div>
      </div>
    </template>
  </b-card>
</template>
<script>
import { formatDateTime } from '@/components/helpers.js'

export default {
  name: 'ConsignmentItem',
  props: {
    consignment: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    }
  },
  methods: {
    /** Takes user to the consignment page
     * @param {String} OrderId ID
     */
    goToConsignment(OrderId) {
      this.$router.push({name: 'trip-consignment', params: {
        id: OrderId
      }})
    },
    /** Creates a shorter version of the address
     * @param {Object} address 
     * @returns {String} short address
     */
    formatShortAddress(address) {
        let addressArray = Object.values(address)
        return `...${addressArray[addressArray.length - 2]}, ${addressArray[addressArray.length - 1]}`
      },
    formatDateTime,
  },
}
</script>