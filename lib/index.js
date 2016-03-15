var request = require('request');
var assert = require('chai').assert;
var expect = require('chai').expect;
var moment = require('moment');

var allowedCurrencies = [
    "AUD","CAD","CHF","CYP","CZK","DKK","EEK",
    "GBP","HKD","HUF","ISK","JPY","KRW","LTL",
    "LVL","MTL","NOK","NZD","PLN","ROL","SEK",
    "SGD","SIT","SKK","TRL","USD","ZAR","EUR"
];

function Fixer () {

}

Fixer.prototype.convert = function(fromCurrency, toCurrency, date, amount, callback) {
    assert(date instanceof Date, 'date object is NOT a date!');
    assert.include(allowedCurrencies,fromCurrency, 'fromCurrency unknown');
    assert.include(allowedCurrencies,toCurrency, 'toCurrency unknown');
    var url = 'https://api.fixer.io/' + moment(date.getTime()).format('YYYY-MM-DD') + "?base=" + fromCurrency;
    request({
        url: url,
        json: true
    }, function(err, resp, body) {
        if (err) {
            return callback(err);
        }
        if (resp.statusCode !== 200) {
            return callback(resp);
        }
        var rates = body.rates;
        var result = parseFloat(amount * rates[toCurrency]).toFixed(2);
        callback(null, result);
    });
};

module.exports = Fixer;