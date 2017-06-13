var Fixer = require('../index')
var faker = require('faker')
var async = require('async')
var path = require('path')
describe('Basic Tests', function () {
  it('should convert 1 Dollar to Euro', function (done) {
    var fixer = new Fixer()
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
  it('should convert 1 Dollar 100 times to Euro', function (done) {
    var fixer = new Fixer()
    async.times(100, function (n, callback) {
      var date = faker.date.between('2011-03-12', '2015-03-12')
      fixer.convert('USD', 'EUR', date, 1, callback)
    }, done)
  })
})

describe('Test cache', function () {
  this.timeout(30000)
  it('should convert 1 Dollar 100 times to Euro', function (done) {
    var fixer = new Fixer({cacheDir: path.join(__dirname, '/../cache')})
    async.times(100, function (n, callback) {
      var date = faker.date.between('2011-03-12', '2015-03-12')
      fixer.convert('USD', 'EUR', date, 1, callback)
    }, done)
  })
})
