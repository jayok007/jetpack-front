import { mount } from '@vue/test-utils'
import httpClient from '@/httpClient'
import Jetpacks from '@/views/Jetpacks'
import { encodeImageFile } from '@/utils'

jest.mock('@/httpClient')
jest.mock('@/utils')

describe('Jetpacks.vue', () => {
  let wrapper

  beforeEach(() => {
    httpClient.get = jest.fn(() =>
      Promise.resolve([{ id: 'test', name: 'Name', image: 'Image' }])
    )
    httpClient.post = jest.fn(() => Promise.resolve({}))
    httpClient.put = jest.fn(() =>
      Promise.resolve({ id: 'test', name: 'Updated', image: 'Updated' })
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

  it('should update a jetpack', () => {
    const firstJetpack = wrapper.find('[data-test="jetpack"]')

    firstJetpack.vm.$emit('update', {
      id: 'test',
      name: 'Updated',
      image: 'Updated'
    })

    expect(httpClient.put).toHaveBeenCalledWith('/api/jetpacks/test', {
      name: 'Updated',
      image: 'Updated'
    })
  })

  it('should mutate the old jetpack', async () => {
    const firstJetpack = wrapper.find('[data-test="jetpack"]')

    firstJetpack.vm.$emit('update', { id: 'test' })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.jetpacks).toEqual([
      { id: 'test', name: 'Updated', image: 'Updated' }
    ])
  })
})
