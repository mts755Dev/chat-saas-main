import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User/UserModels';
import passportGoogle from "passport-google-oauth20";
const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user: any, done) => {
  done(null, user.id);
})
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
})
passport.use(new GoogleStrategy({
  clientID: '295777151332-lhffu6uehskrblbi7acolj2sbg1ia7ro.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "/api/users/google/callback"
},
  async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0].value,
          type: "google",
        });
      }

      cb(null, user);
    } catch (error) {
      return cb(error, null);
    }
  }
));

