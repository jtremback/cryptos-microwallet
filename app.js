'use strict';

var express = require('express')
  , dirtySession = require('connect-dirty')
  , passport = require('passport')
  , api = require('./api')
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
    return done(null, { email: email });
  }
));




var app = express();

// configure Express
app.configure(function() {
  // app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({store: new dirtySession(), secret: 'bro'}));
  // app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
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


app.get('/view', api.view);
app.post('/create', api.create);
app.post('/withdraw', api.withdraw);
app.post('/move', api.move);


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
