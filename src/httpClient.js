export default {
  fetch(url = '/', payload, method = 'GET') {
    return window.fetch(url, {
      method,
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  get(url) {
    return this.fetch(url).then(res => res.json())
  },

  post(url, payload) {
    return this.fetch(url, payload, 'POST')
  },

  put(url, payload) {
    return this.fetch(url, payload, 'PUT')
  },

  delete(url, payload) {
    return this.fetch(url, payload, 'DELETE')
  }
}
