//var LocalStrategy   = require('passport-local').Strategy;
var mysql           = require('mysql'); //MATCH this with package.json
var bcrypt          = require('bcrypt-nodejs');
var dbconfig        = require('./database');


var Auth0Strategy = require('passport-auth0');


module.exports = function(passport) {
  
  var strategy = new Auth0Strategy({
                 domain:       'myoberon.auth0.com',
                 clientID:     'M5xQRh1qxNyvAEvGtKkPPjvsTppsePhm',
                 clientSecret: 'BWxMtntez8seF8gJqaTfUOvrc4DXoV-XiSsxGvHRb9n6hENxpFR-w_5itJKOpmGX',
                 callbackURL:  'http://localhost/callback'
                },
                function(accessToken, refreshToken, extraParams, profile, done) {
                  // accessToken is the token to call Auth0 API (not needed in the most cases)
                  // extraParams.id_token has the JSON Web Token
                  // profile has all the information from the user
                  return done(null, profile);
                }
              );

  passport.use('auth0Strategy',strategy);
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};

   
