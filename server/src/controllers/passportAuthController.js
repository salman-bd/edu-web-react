import passport from "passport";

// import GoogleStrategy from "passport-google-oauth20";
// import FacebookStrategy from "passport-facebook";

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';  
import { Strategy as FacebookStrategy } from 'passport-facebook';   

// import keys from "../config/keys";
import { User } from "../models/user.model.js";


// Handeling Infinite run: Start 
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

const googleClientID = process.env.GOOGLE_CLIENT_ID;  
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;   
const facebookAppID = process.env.FACEBOOK_APP_ID;  
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET;  

// Example usage  
console.log(`\nGoogle Client ID: ${googleClientID}\n`);  

// For Google
passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: "/auth/google/callback"
},
  (accessToken, refreshToken, profile, done) => {
      console.log("\nAll google login data: ", profile); // profile has all google login data
      
      // check if user id already inserted
      User.findOne({ userId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          // insert new user id
          new User({
            userId: profile.id,
            fullName: profile.displayName,
            email: profile.emails[0].value,
            picture: profile._json.picture
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);

// For facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: facebookAppID,
      clientSecret: facebookAppSecret,
      callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // check if user id already inserted
      User.findOne({ userId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          // insert new user id
          
          new User({
            userId: profile.id,
            fullName: profile.displayName,
            email: profile.emails[0].value,
            picture: profile._json.picture
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);

export default passport;