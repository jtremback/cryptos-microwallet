'use strict';

var cryptos = require('./cryptos2')('JEHANID', 'abc123secret');

// app.get('/view', function (req, res) {
//   cryptos.view(req.user.email, function (response){
//     return res.json(response);
//   });
// });

// app.post('/create', function (req, res) {
//   cryptos.create(req.user.email, req.query, function (response) {
//     return res.json(response);
//   });
// });

// app.post('/withdraw', function (req, res) {
//   cryptos.withdraw(req.user.email, req.query, function (response) {
//     return res.json(response);
//   });
// });

// app.post('/move', function (req, res) {
//   cryptos.move(req.user.email, req.query, function (response) {
//     //Must remove info that the client is not supposed to have.
//     response.message.to_wallet = undefined;
//     return res.json(response);
//   });
// });


exports.view = function (req, res) {
  cryptos.view(req.user.email, function (response){
    return res.json(response);
  });
};

exports.create = function (req, res) {
  cryptos.create(req.user.email, req.query, function (response) {
    return res.json(response);
  });
};

exports.withdraw = function (req, res) {
  cryptos.withdraw(req.user.email, req.query, function (response) {
    return res.json(response);
  });
};

exports.move = function (req, res) {
  cryptos.move(req.user.email, req.query, function (response) {
    //Must remove info that the client is not supposed to have!
    response.message.to_wallet = undefined;
    return res.json(response);
  });
};