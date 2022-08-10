import { mount, createLocalVue } from '@vue/test-utils'
import TripConsignment from '@/views/TripConsignment'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('TripConsignment.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(TripConsignment, {
      localVue,
      mocks: {
        $route: {
          params: { OrderId: '123' }
        }
      },
    })
    expect(wrapper.find('TripConsignment').vm)
  })
})
