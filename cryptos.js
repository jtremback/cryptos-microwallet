'use strict';

var unirest = require('unirest');
var id, secret;

exports.config = function(id, secret) {
  id = id;
  secret = secret;
};

exports.move = function(from_wallet, to_wallet, amount, coin) {
  unirest.post('http://httpbin.org/post')
  .query({
      from_wallet: from_wallet
    , to_wallet: to_wallet
    , amount: amount
    , coin: coin
    , id: id
    , secret: secret
  })
  .end(function (response) {
    console.log('unirest response', response);
  });
};

exports.withdraw = function(from_wallet, to_address, amount, coin) {
  unirest.post('http://httpbin.org/post')
  .query({
      from_wallet: from_wallet
    , to_address: to_address
    , amount: amount
    , coin: coin
    , id: id
    , secret: secret
  })
  .end(function (response) {
    console.log('unirest response', response);
  });
};

exports.viewBalance = function(wallet, coin) {
  unirest.post('http://httpbin.org/post')
  .query({
      wallet: wallet
    , coin: coin
    , id: id
    , secret: secret
  })
  .end(function (response) {
    console.log('unirest response', response);
  });
};

exports.getDepositAddress = function(wallet, coin) {
  unirest.post('http://httpbin.org/post')
  .query({
      wallet: wallet
    , coin: coin
    , id: id
    , secret: secret
  })
  .end(function (response) {
    console.log('unirest response', response);
  });
};

  // var path = '/api/v1/move?authSecret=' + secret + 
  //            '&from=' + from +
  //            '&to=' + to +
  //            '&amount=' + amount +
  //            '&coin=' + coin;


// https://cryptos.io/api/v1/move?from_wallet=foo&to_wallet=bar&amount=34&coin=dog&id=ABCJEHAN&secret=shhhh4566

// https://cryptos.io/api/v1/withdraw?from_wallet=foo&to_address=DRQpm63etc&amount=34&coin=dog&id=ABCJEHAN&secret=shhhh4566

// https://cryptos.io/api/v1/balance?wallet=foo&coin=dog&id=ABCJEHAN&secret=shhhh4566

// https://cryptos.io/api/v1/deposit_address?wallet=foo&coin=dog&id=ABCJEHAN&secret=shhhh4566

