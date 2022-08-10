import { mount, createLocalVue } from '@vue/test-utils'
import TripConsignment from '@/views/TripConsignment'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'


const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(BootstrapVue)
localVue.use(VueRouter)

describe('TripConsignment.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(TripConsignment, {
      localVue,
      router,
      mocks: {
        $route: {
          params: { OrderId: '123' }
        }
      },
    })
    expect(wrapper.find('TripConsignment').vm)
  })
})
