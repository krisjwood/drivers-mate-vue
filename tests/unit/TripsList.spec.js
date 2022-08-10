import { shallowMount, createLocalVue } from '@vue/test-utils'
import TripsList from '@/views/TripsList'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'


const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(BootstrapVue)
localVue.use(VueRouter)

describe('TripsList.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(TripsList, {
      localVue,
      router,
      mocks: {
        $route: {
          params: { driverId: '123' }
        }
      },
    })
    expect(wrapper.find('TripsList').vm)
  })
})
