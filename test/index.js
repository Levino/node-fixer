var Fixer = require('../index');

var fixer = new Fixer();

describe('Basic Tests', function() {
    it('should convert 1 Dollar to Euro', function(done) {
       fixer.convert('USD','EUR',new Date('2012-03-12'),1, function(err, result) {
          if (err) {
              return done(err);
          }
          console.log(result);
           done();
       });
    });
});