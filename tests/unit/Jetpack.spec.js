import { mount, createLocalVue } from '@vue/test-utils'
import Jetpack from '@/components/Jetpack'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.config.silent = true

describe('Jetpack.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Jetpack, {
      localVue,
      propsData: {
        name: 'Test jetpack',
        image: 'base 64 image'
      },
      stubs: ['v-img']
    })
  })

  it('should display the name of the jetpack', async () => {
    expect(wrapper.text()).toMatch('Test jetpack')
  })

  it('should pass the src of the image', () => {
    const img = wrapper.find('v-img-stub')

    expect(img.attributes('src')).toBe('base 64 image')
  })
})
