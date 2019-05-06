import { mount } from '@vue/test-utils'
import httpClient from '@/httpClient'
import Search from '@/views/Search'

jest.mock('@/httpClient')
jest.mock('@/utils')

describe('Search.vue', () => {
  let wrapper

  beforeEach(() => {
    httpClient.get = jest.fn(() =>
      Promise.resolve([{ id: '1', name: 'Toto' }, { id: '2', name: 'Tata' }])
    )

    httpClient.post = jest.fn(() => {
      return Promise.resolve([
        { id: '1', name: 'Toto' },
        { id: '2', name: 'Tata' }
      ])
    })

    wrapper = mount(Search)
  })
  it('should display the dialog', () => {
    const dateStart = new Date().toISOString().substr(0, 10)
    const dateEnd = new Date().toISOString().substr(0, 10)
    wrapper.find('[data-test="searchBtn"]').trigger('click')
    expect(httpClient.get).toHaveBeenCalledWith(
      '/api/availability/jetpacks?dateStart="' +
        dateStart +
        '"&dateEnd="' +
        dateEnd +
        '"'
    )
    const result = wrapper.find('[data-test="searchResult"]')
    expect(result.isVisible()).toBe(true)
  })
  it('should display the book a jetpack ', async () => {
    const dateStart = new Date().toISOString().substr(0, 10)
    const dateEnd = new Date().toISOString().substr(0, 10)

    wrapper.find('[data-test="searchBtn"]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(httpClient.get).toHaveBeenCalledWith(
      '/api/availability/jetpacks?dateStart="' +
        dateStart +
        '"&dateEnd="' +
        dateEnd +
        '"'
    )

    wrapper.find('[data-test="bookingBtn"]').trigger('click')

    const newSearchBeforeQuery = wrapper.find('[data-test="newSearch"]')
    expect(newSearchBeforeQuery.isVisible()).toBe(true)

    const resultBeforeQuery = wrapper.find('[data-test="searchResult"]')
    expect(resultBeforeQuery.isVisible()).toBe(true)
  })
})
