const Hex = {}

Hex.toQuery = (object) => Object.keys(object)
  .filter(key => Hex.validAny(object[key]))
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
  .join('&')

Hex.get = (url, params, cb) => {
  if (cb === undefined) {
    cb = params
    params = undefined
  }

  if (params !== undefined) {
    url = url + '?' + Hex.toQuery(params)
  }

  fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(cb)
    }
  })
}

Hex.validAny = any => any !== null && any !== undefined

export default Hex
