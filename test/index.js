var Fixer = require('../index')
var faker = require('faker')
var fixer = new Fixer()
var async = require('async')

describe('Basic Tests', function () {
  it('should convert 1 Dollar to Euro', function (done) {
    fixer.convert('USD', 'EUR', new Date('2012-03-12'), 1, function (err, result) {
      if (err) {
        return done(err)
      }
      console.log(result)
      done()
    })
  })
})

describe('Heavy load', function () {
  this.timeout(30000)
  it('should convert 1 Dollar 1000 times to Euro', function (done) {
    async.times(1000, function (n, callback) {
      var date = faker.date.between('2011-03-12', '2015-03-12')
      console.log(date)
      fixer.convert('USD', 'EUR', date, 1, callback)
    }, done)
  })
})
