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
    encodeImageFile.mockReturnValue(Promise.resolve(['test.png', 'Image']))

    wrapper = mount(Jetpacks)
  })

  it('should fetch jetpacks on create', () => {
    expect(httpClient.get).toHaveBeenCalledWith('/api/jetpacks')
  })

  it('should display the dialog', () => {
    wrapper.find('[data-test="createJetpackBtn"]').trigger('click')

    const form = wrapper.find('[data-test="createJetpackForm"]')
    expect(form.isVisible()).toBe(true)
  })

  it('should not send data when name and image are missing', () => {
    wrapper.find('[data-test="createJetpackBtn"]').trigger('click')
    wrapper.find('[data-test="saveBtn"]').trigger('click')

    expect(httpClient.post).not.toHaveBeenCalled()
  })

  describe('Jetpack creation', () => {
    beforeEach(async () => {
      wrapper.find('[data-test="createJetpackBtn"]').trigger('click')

      wrapper.find('[data-test="nameInput"]').setValue('Test')
      const input = wrapper.find('[data-test="imageInput"]')
      Object.defineProperty(input.element, 'files', {
        value: [
          new File([''], 'test.png', {
            type: 'image/png'
          })
        ]
      })
      input.trigger('change')
      await wrapper.vm.$nextTick()

      wrapper.find('[data-test="saveBtn"]').trigger('click')
      await wrapper.vm.$nextTick()
    })

    it('should send the jetpack on save', () => {
      expect(httpClient.post).toHaveBeenCalledWith('/api/jetpacks', {
        name: 'Test',
        image: 'Image'
      })
    })

    it('should add the new jetpack to the list', () => {
      expect(wrapper.text()).toMatch('Test')
    })

    it('should hide the dialog', () => {
      const form = wrapper.find('[data-test="createJetpackForm"]')
      expect(form.isVisible()).toBe(false)
    })

    it('should clean the input values', () => {
      expect(wrapper.vm.name).toBe('')
      expect(wrapper.vm.image).toBe('')
      expect(wrapper.vm.fileName).toBe('')
    })
  })
})
