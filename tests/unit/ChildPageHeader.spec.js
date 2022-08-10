import { shallowMount, createLocalVue } from '@vue/test-utils'
import ChildPageHeader from '@/components/ChildPageHeader'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('ChildPageHeader.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(ChildPageHeader, {
      localVue,
      propsData: {
        title: 'test title',
        show: true
      }
    })
    expect(wrapper.find('ChildPageHeader').vm)
  })
})
