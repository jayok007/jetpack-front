import { mount } from '@vue/test-utils'
import httpClient from '@/httpClient'
import Jetpacks from '@/views/Jetpacks'
import { encodeImageFile } from '@/utils'

jest.mock('@/utils')

describe('Jetpack feature', () => {
  let wrapper

  beforeEach(() => {
    httpClient.get = jest.fn(() =>
      Promise.resolve([{ id: '1', name: 'Toto' }, { id: '2', name: 'Tata' }])
    )

    httpClient.post = jest.fn((_, j) => {
      return Promise.resolve({
        id: 'test-id',
        name: j.name,
        image: j.image
      })
    })

    encodeImageFile.mockReturnValue(Promise.resolve(['test.png', 'Image']))

    wrapper = mount(Jetpacks)
  })

  it('should display all the jetpacks', async () => {
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('[data-test="jetpack"]').length).toBe(2)
    expect(wrapper.text()).toMatch('Toto')
    expect(wrapper.text()).toMatch('Tata')
  })

  it('should create a jetpack', async () => {
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

    expect(wrapper.text()).toMatch('Test')
  })
})
