var request = require('request')
var assert = require('chai').assert
var moment = require('moment')
var CachedRequest = require('cached-request')
var allowedCurrencies = [
  'AUD', 'CAD', 'CHF', 'CYP', 'CZK', 'DKK', 'EEK',
  'GBP', 'HKD', 'HUF', 'ISK', 'JPY', 'KRW', 'LTL',
  'LVL', 'MTL', 'NOK', 'NZD', 'PLN', 'ROL', 'SEK',
  'SGD', 'SIT', 'SKK', 'TRL', 'USD', 'ZAR', 'EUR'
]
function Fixer ({cacheDir} = {}) {
  if (cacheDir) {
    const cachedRequest = CachedRequest(request)
    cachedRequest.setCacheDirectory(cacheDir)
    cachedRequest.setValue('ttl', 1000000000000000000)
    this.cachedRequest = cachedRequest
  } else {
    this.cachedRequest = request
  }
}

Fixer.prototype.convert = function (fromCurrency, toCurrency, date, amount, callback) {
  assert(date instanceof Date, 'date object is NOT a date!')
  assert.include(allowedCurrencies, fromCurrency, 'fromCurrency unknown')
  assert.include(allowedCurrencies, toCurrency, 'toCurrency unknown')
  var url = 'https://api.fixer.io/' + moment(date.getTime()).format('YYYY-MM-DD') + '?base=' + fromCurrency
  this.cachedRequest({
    url: url,
    json: true
  }, function (err, resp, body) {
    if (err) {
      return callback(err)
    }
    if (resp.statusCode !== 200) {
      return callback(resp)
    }
    var rates = body.rates
    var result = parseFloat(amount * rates[toCurrency])
    callback(null, result)
  })
}

module.exports = Fixer
