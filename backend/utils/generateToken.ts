import jwt from 'jsonwebtoken';

const generateToken = (res: any, userId: any) => {
  const token = jwt.sign({ userId }, '33q3322ewq', { expiresIn: '30d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    domain: 'localhost',
    path: '/',
  });
};

export default generateToken;
