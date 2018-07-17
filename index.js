const { lookup } = require('whois-2')

const whoisResolve = (name) => {
  return new Promise((resolve, reject) => {
    lookup(name, function(err, data) {
      let line = data.split(/\r\n/g).find(line => line !== '').trim()
      if (/^[no]{2}t?\s/.test(line.toLowerCase())) {
        return resolve({ available: true })
      }
      resolve({ available: false })
    })
  })
}

const nativeDnsResolve = (name) => {
  return new Promise((resolve, reject) => {
    require('dns').resolve(name, (err, data) => {
      if (err) {
        resolve({ available: true })
      } else {
        resolve({ available: false })
      }
    })
  })
}

module.exports = whoisResolve