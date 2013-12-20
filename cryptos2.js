'use strict';

//Dependencies
var unirest = require('unirest');

module.exports = function(id, secret, path, version) {
  if (!path) var path = 'https://cryptos.io/api/';
  if (!version) var version = 'v1/';

  return {

    move: function(from_wallet, to_wallet, amount, coin) {
      var call = 'move';
      unirest.post(path + version + call)
      .query({
          from_wallet: from_wallet
        , to_wallet: to_wallet
        , amount: amount
        , coin: coin
        , id: id
        , secret: secret
      })
      .end(function (response) {
        console.log('move response', response.body);
      });
    }

    ,

    withdraw: function(from_wallet, to_address, amount, coin) {
      var call = 'withdraw';
      unirest.post(path + version + call)
      .query({
          from_wallet: from_wallet
        , to_address: to_address
        , amount: amount
        , coin: coin
        , id: id
        , secret: secret
      })
      .end(function (response) {
        console.log('withdraw response', response.body);
      });
    }

    ,

    viewBalance: function(wallet, coin) {
      var call = 'balance';
      unirest.get(path + version + call)
      .query({
          wallet: wallet
        , coin: coin
        , id: id
        , secret: secret
      })
      .end(function (response) {
        console.log('viewBalance response', response.body);
      });
    }

    ,

    getDepositAddress: function(wallet, coin) {
      var call = 'deposit_address';
      unirest.get(path + version + call)
      .query({
          wallet: wallet
        , coin: coin
        , id: id
        , secret: secret
      })
      .end(function (response) {
        console.log('getDepositAddress response', response.body);
      });
    }
  };
};


// https://cryptos.io/api/v1/move?from_wallet=foo&to_wallet=bar&amount=34&coin=dog&id=ABCJEHAN&secret=shhhh4566

// https://cryptos.io/api/v1/withdraw?from_wallet=foo&to_address=DRQpm63etc&amount=34&coin=dog&id=ABCJEHAN&secret=shhhh4566

// https://cryptos.io/api/v1/balance?wallet=foo&coin=dog&id=ABCJEHAN&secret=shhhh4566

// https://cryptos.io/api/v1/deposit_address?wallet=foo&coin=dog&id=ABCJEHAN&secret=shhhh4566

