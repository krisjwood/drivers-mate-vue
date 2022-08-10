import { mount, createLocalVue } from '@vue/test-utils'
import LandingView from '@/views/LandingView'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('LandingView.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(LandingView, {
      localVue,
    })
    expect(wrapper.find('LandingView').vm)
  })

  it('Driver select renders', () => {
    const wrapper = mount(LandingView, {
      localVue,
      data() {
        return {
          is: {
            loadingDriverData: false,
          },
          error: {
            loadingDriverData: false,
          },
          selected: {
            availableDrivers: []
          },
        }
      }
    })
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
  })
});