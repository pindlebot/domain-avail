const werist = require('whois-2')

const whoisResolve = (name) => {
  return new Promise((resolve, reject) => {
    werist.lookup(name, function(err, data) {
      let line = data.split(/\r\n/g)[0].trim()

      if (/^[Nn][Oo][Tt]?\s/.test(line)) {
        resolve(false)
      }
      resolve(true)
    })
  })
}

const nativeDnsResolve = (name) => {
  return new Promise((resolve, reject) => {
    require('dns').resolve(name, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(false)
    })
  })
}

module.exports = async (name) => {
  let available
  try {
    available = await nativeDnsResolve(name)
  } catch (err) {
    available = await whoisResolve(name)
  }
  return available
}