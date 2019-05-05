import { mount } from '@vue/test-utils'
import JetpackForm from '@/components/JetpackForm'
import { encodeImageFile } from '@/utils'

jest.mock('@/utils')

describe('JetpackForm', () => {
  let wrapper

  beforeEach(async () => {
    encodeImageFile.mockReturnValue(Promise.resolve('Image'))
    wrapper = mount(JetpackForm)

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
  })

  it('should emit the new jetpack', async () => {
    expect(wrapper.emitted().addJetpack).toEqual([
      [{ name: 'Test', image: 'Image' }]
    ])
  })

  it('should clear the input fields', () => {
    expect(wrapper.vm.name).toBe('')
    expect(wrapper.vm.image).toBe('')
  })

  it('should not emit the new jetpack when not valid', async () => {
    encodeImageFile.mockReturnValue(Promise.resolve('Image'))
    const wrapper = mount(JetpackForm)

    wrapper.find('[data-test="saveBtn"]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().addJetpack).toBeFalsy()
  })

  it('should do nothing when no image is provided', async () => {
    const wrapper = mount(JetpackForm)
    const input = wrapper.find('[data-test="imageInput"]')

    input.trigger('change')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.name).toBe('')
    expect(wrapper.vm.image).toBe('')
  })

  it('should emit an event when the form is canceled', () => {
    const cancel = jest.fn()
    const wrapper = mount(JetpackForm, {
      listeners: {
        cancel
      }
    })

    wrapper.find('[data-test="cancelBtn"]').trigger('click')

    expect(cancel).toHaveBeenCalled()
  })
})
