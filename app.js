'use strict';

var express = require('express')
  , dirtySession = require('connect-dirty')
  , passport = require('passport')
  , cryptos = require('./cryptos')('jehan', 'foomaster')
  , PersonaStrategy = require('passport-persona').Strategy;


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the BrowserID verified email address
//   is serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  done(null, { email: email });
});


// Use the PersonaStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a BrowserID verified email address), and invoke
//   a callback with a user object.
passport.use(new PersonaStrategy({
    audience: (process.env.URL || 'http://localhost:8787')
  },
  function(email, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's email address is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the email address with a user record in your database, and
      // return that user instead.
      return done(null, { email: email });
    });
  }
));




var app = express();

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  // app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.session({store: new dirtySession(), secret: 'bro'}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/../../public'));
});


app.get('/', function(req, res){
  if (!req.user) return res.render('index');
  return res.redirect('/wallet/DOG');
});

app.get('/view/:coin', ensureAuthenticated, function(req, res){
  var coin = req.params.coin;
  cryptos.view({
      wallet: req.user.email
    , coin: coin
  }, function (response) {
    return res.json({
        deposit_address: response.deposit_address[coin]
      , balance: response.balance[coin]
      , user: response.wallet
      , coin: coin
    });
  });
});

app.post('/move/:coin', ensureAuthenticated, function(req, res){

});

app.post('/withdraw/:coin', ensureAuthenticated, function(req, res){
  var coin = req.params.coin;
  cryptos.withdraw({
      from_wallet: req.user.email
    , to_address: req.body.to_address
    , amount: req.body.amount
    , coin: coin
  }, function (response){
    console.log(JSON.stringify(response));
    return res.json(response);
  });
});


// POST /auth/browserid
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  BrowserID authentication will verify the assertion obtained from
//   the browser via the JavaScript API.
app.post('/auth/browserid',
  passport.authenticate('persona', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

var port = process.env.PORT || 8787;
console.log('App is listening on ' + port);
app.listen(port);



// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  return res.end('not authenticated');
}
