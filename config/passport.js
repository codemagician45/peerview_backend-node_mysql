// load all the things we need
//var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

// load the auth variables
var configAuth = require('./auth');

var User       = require('../models/front/user_front');

function extractProfile (profile) {
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl,
    email: profile.email
  };
}

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))

    // =========================================================================
    // google ================================================================
    // =========================================================================
  passport.use(new GoogleStrategy({
    clientID:     configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
        var google_array = extractProfile(profile);
        return done(null, google_array);
    });
  }
));
    
    
    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields: ["emails", "displayName", "name"]
    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            var new_array = [];
            // set all of the facebook information in our user model
            new_array['id']    = profile.id; // set the users facebook id                   
            new_array['token'] = token; // we will save the token that facebook provides to the user                    
            new_array['user_name']  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
            new_array['email']    = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                return done(null,new_array);
        });

    }));
    
    // =========================================================================
    // LINKEDIN ================================================================
    // =========================================================================
    passport.use(new LinkedInStrategy({
        clientID:     configAuth.linkedInAuth.clientID,
        clientSecret: configAuth.linkedInAuth.clientSecret,
        callbackURL: configAuth.linkedInAuth.callbackURL,
        scope: ['r_emailaddress', 'r_basicprofile'],
        profileFields: ['id', 'first-name', 'last-name', 'email-address'],
        state: true
      },
      function(request, accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            
             var new_array = [];
            // set all of the linkedIn information in our user model
            new_array['id']    = profile.id;                    
            new_array['displayName']  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
            new_array['email']    = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
            return done(null,new_array);
        });
      }
    ));

};