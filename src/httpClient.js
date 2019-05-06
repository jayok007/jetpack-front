export default {
  fetch(url, method, payload) {
    return window
      .fetch(url, {
        method,
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
  },

  get(url, payload) {
    const query = payload
      ? '?' +
        Object.entries(payload)
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      : ''
    return this.fetch(url + query, 'GET')
  },

  post(url, payload) {
    return this.fetch(url, 'POST', payload)
  },

  put(url, payload) {
    return this.fetch(url, 'PUT', payload)
  },

  delete(url) {
    return this.fetch(url, 'DELETE')
  }
}
