import { mount } from '@vue/test-utils'
import Jetpack from '@/components/Jetpack'

describe('Jetpack.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Jetpack, {
      propsData: {
        id: 'test',
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

  it('should show the form', () => {
    wrapper.find('[data-test="updateBtn"]').trigger('click')

    expect(wrapper.find('[data-test="updateForm"]').isVisible()).toBe(true)
  })

  it('should hide the form', () => {
    wrapper.find('[data-test="updateBtn"]').trigger('click')

    wrapper.find('[data-test="updateForm"]').vm.$emit('cancel')

    expect(wrapper.find('[data-test="updateForm"]').isVisible()).toBe(false)
  })

  it('should emit the updated values', () => {
    const form = wrapper.find('[data-test="updateForm"]')

    form.vm.$emit('addJetpack', {
      name: 'Updated',
      image: 'Updated'
    })

    expect(wrapper.emitted().update).toEqual([
      [{ id: 'test', name: 'Updated', image: 'Updated' }]
    ])
  })
})
