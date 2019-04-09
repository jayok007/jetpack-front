import { mount, createLocalVue } from '@vue/test-utils'
import httpClient from '@/httpClient'
import Jetpacks from '@/views/Jetpacks'
import Vuetify from 'vuetify'

jest.mock('@/httpClient')

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('Jetpacks.vue', () => {
  let jetpacks

  beforeEach(() => {
    jetpacks = [
      { id: '1', name: 'Toto' },
      { id: '2', name: 'Tata' },
      { id: '3', name: 'Titi' }
    ]
    httpClient.get = jest.fn(() => Promise.resolve(jetpacks))
  })

  it('should fetch the jetpacks', async () => {
    const wrapper = mount(Jetpacks, {
      localVue,
      stubs: ['jetpack']
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('jetpack-stub').length).toBe(3)
  })
})
