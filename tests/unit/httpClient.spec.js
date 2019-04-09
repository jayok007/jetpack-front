import httpClient from '../../src/httpClient'

describe('httpClient', () => {
  let payload = { toto: 'test' }
  beforeEach(() => {
    window.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve('test') })
    )
  })

  it('should send a fetch request', async () => {
    const res = await httpClient.fetch('/toto', 'POST', payload)

    expect(window.fetch).toHaveBeenCalledWith('/toto', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
    expect(res).toBe('test')
  })

  it('should send a get request', async () => {
    httpClient.fetch = jest.fn()
    await httpClient.get('/toto')

    expect(httpClient.fetch).toHaveBeenCalledWith('/toto', 'GET')
  })

  it('should send a post request', async () => {
    httpClient.fetch = jest.fn()
    await httpClient.post('/toto', payload)

    expect(httpClient.fetch).toHaveBeenCalledWith('/toto', 'POST', payload)
  })

  it('should send a put request', async () => {
    httpClient.fetch = jest.fn()
    await httpClient.put('/toto', payload)

    expect(httpClient.fetch).toHaveBeenCalledWith('/toto', 'PUT', payload)
  })

  it('should send a delete request', async () => {
    httpClient.fetch = jest.fn()
    await httpClient.delete('/toto/1')

    expect(httpClient.fetch).toHaveBeenCalledWith('/toto/1', 'DELETE')
  })
})
