import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import userRoutes from './routes/User/userRoutes';
import paymentRoutes from './routes/Payment/PaymentRoutes';
import './config/apple-passport';
import './config/passport';
import './config/fb-passport';
import bodyParser from "body-parser";
import passport from 'passport';
const port = process.env.PORT || 4000;

connectDB();

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET, POST, PUT, DELETE",
  withCredentials: true, //included credentials as true
  credentials: true,

};

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
  secret: '33q3322ewq',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes)

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
