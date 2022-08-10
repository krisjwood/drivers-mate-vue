import { mount, createLocalVue } from '@vue/test-utils'
import TripDetails from '@/views/TripDetails'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(BootstrapVue)
localVue.use(VueRouter)

describe('TripDetails.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(TripDetails, {
      localVue,
      router,
      mocks: {
        $route: {
          params: { tripId: '123456' }},
      },
    })
    expect(wrapper.find('TripDetails').vm)
  })
})
