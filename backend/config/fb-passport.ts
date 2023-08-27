import passport from "passport";
const FacebookStrategy = require('passport-facebook').Strategy;
import User from "../models/User/UserModels";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
})
passport.deserializeUser((id, done) => {
  console.log("Deserialized", id)
  User.findById(id).then(user => {
    done(null, user);
  });
})

passport.use(new FacebookStrategy({
  clientID: "668980591928183",
  clientSecret: "df70eb23da4a611ffae59398713efb7d",
  callbackURL: "http://localhost:5000/api/users/facebook/callback"
},
  async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });

      if (!user) {
        user = await User.create({
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0].value,
          type: "facebook",
        });
      }

      return cb(null, user);
    } catch (error) {
      return cb(error, null);
    }
  }
));
