import passport from 'passport';
import User from '../models/User/UserModels';
import AppleStrategy from 'passport-apple';
import path from 'path';

passport.use(new AppleStrategy({
  clientID: "com.oauthtesting03",
  teamID: "P5AHP6SL3X",
  callbackURL: "https://thetutorialheaven.com/auth",
  keyID: "5TZBB4472C",
  privateKeyLocation: path.join(__dirname, './AuthKey_5TZBB4472C.p8'),
  passReqToCallback: true
}, async function (req, accessToken, refreshToken, idToken, profile, cb) {
  let user = await User.findOne({ appleId: idToken.sub });
  console.log(req, profile)
  if (req.body && req.body.user) {
    user = await User.create({
      appleId: idToken.sub,
      name: profile.displayName,
      email: profile.emails?.[0].value,
      type: "apple",
    });
    console.log(req.body.user);
  }
  cb(null, idToken);
}));
