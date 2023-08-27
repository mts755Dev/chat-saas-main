import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../../controllers/User/userController';
import { protect } from '../../middleware/authMiddleware';
import passport from 'passport';
import User from '../../models/User/UserModels';
import generateToken from '../../utils/generateToken';

const CLIENT_URL = "http://localhost:3000/home"
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: CLIENT_URL,
  failureRedirect: '/login'
}))

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login',
  }))
router.get('/google/success', async (req, res) => {
  const request: any = req
  const user = { _id: JSON.parse(request.sessionStore?.sessions[Object.keys(request.sessionStore?.sessions)[0]]).passport.user }
  const getUser = await User.findById(user._id)
  if (getUser) {
    generateToken(res, getUser._id);
    res.json({
      _id: getUser._id,
      name: getUser.name,
      email: getUser.email,
    });
  } else {
    res.json({ user: null });
  }
});

router.get('/apple', passport.authenticate('apple'));
router.post("/apple/auth", passport.authenticate('apple', { failureRedirect: '/' }), (req, res) => {
  // res.redirect('/api/users/profile?login=google');
  res.end('Logged In');
}
);
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
