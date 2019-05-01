import { mount } from '@vue/test-utils'
import httpClient from '@/httpClient'
import Jetpacks from '@/views/Jetpacks'

jest.mock('@/httpClient')

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

    wrapper = mount(Jetpacks)
  })

  it('should fetch jetpacks on create', () => {
    expect(httpClient.get).toHaveBeenCalledWith('/api/jetpacks')
  })

  describe('Jetpack creation', () => {
    beforeEach(async () => {
      const addBtn = wrapper.find('[data-test="createJetpackBtn"]')

      addBtn.trigger('click')
      await wrapper.vm.$nextTick()
    })

    it('should show the jetpack form', async () => {
      const form = wrapper.find('[data-test="createJetpackForm"]')

      expect(form.isVisible()).toBe(true)
    })

    it('should send the jetpack on save', async () => {
      wrapper.find('[data-test="nameInput"]').setValue('Test')
      wrapper.find('[data-test="imageInput"]').setValue('Image')

      wrapper.find('[data-test="saveBtn"]').trigger('click')
      await wrapper.vm.$nextTick()

      expect(httpClient.post).toHaveBeenCalledWith('/api/jetpacks', {
        name: 'Test',
        image: 'Image'
      })
      expect(wrapper.text()).toMatch('Test')
    })
  })
})
