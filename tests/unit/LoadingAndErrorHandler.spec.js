import { mount, createLocalVue } from '@vue/test-utils'
import LoadingAndErrorHandler from '@/components/LoadingAndErrorHandler'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('LoadingAndErrorHandler.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(LoadingAndErrorHandler, {
      localVue,
      propsData: {
        loading: true,
        loadingMessage: 'test load',
        error: true,
        errorMessage: 'test error'
      },
    })
    expect(wrapper.find('LoadingAndErrorHandler').vm)
  })
})
