import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User/UserModels'
interface DecodedJwtPayload extends JwtPayload {
  userId: string;
}

const protect = asyncHandler(async (req: any, res: any, next) => {
  req.user = { _id: JSON.parse(req.sessionStore.sessions[Object.keys(req.sessionStore.sessions)[0]]).passport.user }
  if (req.query.login === "google") return next()
  let token;
  token = req.cookies?.jwt || req.cookies;

  if (token) {
    try {
      const decoded = jwt.verify(token, "33q3322ewq") as DecodedJwtPayload
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
