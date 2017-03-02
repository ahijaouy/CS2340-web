var mysql           = require('mysql') 
    dbconfig        = require('./database'),
    Auth0Strategy   = require('passport-auth0'),
    env             = require('node-env-file');

env(__dirname + '/variables.env');


module.exports = function(passport) {
  
  var strategy = new Auth0Strategy({
                 domain:       process.env.domain,
                 clientID:     process.env.clientID,
                 clientSecret: process.env.clientSecret,
                 callbackURL:  process.env.callbackURL
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

   
