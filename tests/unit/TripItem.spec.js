import { shallowMount, createLocalVue } from '@vue/test-utils'
import TripItem from '@/components/TripItem'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('TripItem.vue', () => {
  const tripDetails = {
      DriverId: "KeeganB",
      Status: "Created",
      TruckRegistration: "ABC123",
      TripId: "123456",
      Consignments: [
        {
          Items: [
            {
              Quantity: 20,
              ItemCode: "AMZ-01"
            },
          ],
          TripId: "123456",
          DeliveryAddress: {
            Street: "Over the hill street",
            City: "Shelbyville",
            Unit: "66",
            Suburb: "Mountaintop Place",
            Postcode: "2013"
          },
          RequestedPickupTime: "2022/02/03 07:00:00",
          PickupInstructions: "Make sure driver signs in before heading to loading bay",
          Status: "TripAllocated",
          PickupAddress: {
            Street: "Happy Vallssssey Road",
            City: "Springfield",
            Unit: "14",
            Suburb: "Sunshine Place",
            Postcode: "1023"
          },
          DeliveryInstructions: "Items are fragile, take extra care when unloading",
          OrderId: "CH-1010"
        },
      ]
    }
  it('is a Vue instance', () => {
    const wrapper = shallowMount(TripItem, {
      localVue,
      propsData: {
        tripDetails,
      },
    })
    expect(wrapper.find('TripItem').vm)
  })
})
