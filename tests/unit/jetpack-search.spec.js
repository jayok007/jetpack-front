import { mount, createLocalVue } from '@vue/test-utils'
import httpClient from '@/httpClient'
import Jetpacks from '@/views/Jetpacks'
import Vuetify from 'vuetify'

jest.mock('@/httpClient')

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('Jetpacks.vue', () => {
  let wrapper

  beforeEach(() => {
    httpClient.get = jest.fn(() =>
      Promise.resolve([
        { id: '1', name: 'Toto' },
        { id: '2', name: 'Tata' },
        { id: '3', name: 'Titi' }
      ])
    )

    wrapper = mount(Jetpacks, {
      localVue,
      stubs: ['jetpack']
    })
  })

  it('should display all the jetpacks', async () => {
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('jetpack-stub').length).toBe(3)
  })

  it('should call the jetpacks endpoint', () => {
    expect(httpClient.get).toHaveBeenCalledWith('/api/jetpacks')
  })
})
