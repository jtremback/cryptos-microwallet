'use strict';

//Dependencies
var unirest = require('unirest');

module.exports = function(id, secret, path, version) {
  if (!path) var path = 'https://cryptos.io/api';
  if (!version) var version = 'v1';

  return {


    view: function(wallet, callback) {
      var opts = {};
      opts.secret = secret;
      unirest.get(path + '/' + version + '/' + id + '/' + wallet + '/view')
      .query(opts)
      .end(function (response) {
        callback(response.body);
      });
    }

    ,

    create: function(wallet, opts, callback) {
      opts.secret = secret;
      unirest.post(path + '/' + version + '/' + id + '/' + wallet + '/create')
      .query(opts)
      .end(function (response) {
        callback(response.body);
      });
    }

    ,

    move: function(wallet, opts, callback) {
      opts.secret = secret;
      unirest.post(path + '/' + version + '/' + id + '/' + wallet + '/move')
      .query(opts)
      .end(function (response) {
        callback(response.body);
      });
    }

    ,

    withdraw: function(wallet, opts, callback) {
      opts.secret = secret;
      unirest.post(path + '/' + version + '/' + id + '/' + wallet + '/withdraw')
      .query(opts)
      .end(function (response) {
        callback(response.body);
      });
    }
  };
};