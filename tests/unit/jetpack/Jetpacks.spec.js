import { mount } from '@vue/test-utils'
import httpClient from '@/httpClient'
import Jetpacks from '@/views/Jetpacks'
import { encodeImageFile } from '@/utils'

jest.mock('@/httpClient')
jest.mock('@/utils')

describe('Jetpacks.vue', () => {
  let wrapper

  beforeEach(() => {
    httpClient.get = jest.fn(() => Promise.resolve([]))
    httpClient.post = jest.fn((_, j) =>
      Promise.resolve({
        id: 'my-id',
        name: j.name,
        image: j.image
      })
    )
    encodeImageFile.mockReturnValue(Promise.resolve('Image'))

    wrapper = mount(Jetpacks, {
      stubs: ['jetpack-form']
    })
  })

  it('should fetch jetpacks on create', () => {
    expect(httpClient.get).toHaveBeenCalledWith('/api/jetpacks')
  })

  it('should display the dialog', () => {
    wrapper.find('[data-test="createJetpackBtn"]').trigger('click')

    const form = wrapper.find('[data-test="createJetpackForm"]')
    expect(form.isVisible()).toBe(true)
  })

  it('should create a jetpack', () => {
    const newJetpack = { name: 'Name', image: 'Image' }
    const form = wrapper.find('[data-test="createJetpackForm"]')
    wrapper.find('[data-test="createJetpackBtn"]').trigger('click')

    form.vm.$emit('addJetpack', newJetpack)

    expect(httpClient.post).toBeCalledWith('/api/jetpacks', newJetpack)
  })

  it('should hide the dialog', () => {
    wrapper.find('[data-test="createJetpackBtn"]').trigger('click')
    const form = wrapper.find('[data-test="createJetpackForm"]')

    form.vm.$emit('cancel')

    expect(form.isVisible()).toBe(false)
  })
})
