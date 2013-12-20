'use strict';

//Dependencies
var unirest = require('unirest');

module.exports = function(id, secret, path, version) {
  if (!path) var path = 'https://cryptos.io/api/';
  if (!version) var version = 'v1/';

  return {

    move: function(opts, callback) {
      unirest.post(path + version + 'move')
      .query({
          from_wallet: opts.from_wallet
        , to_wallet: opts.to_wallet
        , amount: opts.amount
        , coin: opts.coin
        , id: id
        , secret: secret
      })
      .end(function (response) {
        callback(response.body);
      });
    }

    ,

    withdraw: function(opts, callback) {
      unirest.post(path + version + 'withdraw')
      .query({
          from_wallet: opts.from_wallet
        , to_address: opts.to_address
        , amount: opts.amount
        , coin: opts.coin
        , id: id
        , secret: secret
      })
      .end(function (response) {
        callback(response.body.response[opts.from_wallet].balance);
      });
    }

    ,

    view: function(opts, callback) {
      unirest.get(path + version + 'balance')
      .query({
          wallet: opts.wallet
        , coin: opts.coin
        , id: id
        , secret: secret
      })
      .end(function (response) {
        var balance = response.body.response[opts.wallet].balance;
        unirest.get(path + version + 'deposit_address')
        .query({
            wallet: opts.wallet
          , coin: opts.coin
          , id: id
          , secret: secret
        })
        .end(function (response) {
          var deposit_address = response.body.response[opts.wallet].deposit_address;
          callback({
              wallet: opts.wallet
            , balance: balance
            , deposit_address: deposit_address
          });
        });
      });
    }


  };
};


// https://cryptos.io/api/v1/move?from_wallet=foo&to_wallet=bar&amount=34&coin=dog&id=ABCJEHAN&secret=shhhh4566

// https://cryptos.io/api/v1/withdraw?from_wallet=foo&to_address=DRQpm63etc&amount=34&coin=dog&id=ABCJEHAN&secret=shhhh4566

// https://cryptos.io/api/v1/balance?wallet=foo&coin=dog&id=ABCJEHAN&secret=shhhh4566

// https://cryptos.io/api/v1/deposit_address?wallet=foo&coin=dog&id=ABCJEHAN&secret=shhhh4566

