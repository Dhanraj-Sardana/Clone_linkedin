import dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/Mongodb.js';
import passport from "passport";
import session from "express-session";
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import './middleware/passport.js';

dotenv.config();

import Auth_Router from './routes/AuthRoute.js';
import PostRouter from './routes/Post.js';

connectDb();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://clone-linkedin-alpha.vercel.app" 
 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: false,
cookie: {
  maxAge: 24 * 60 * 60 * 1000, 
  httpOnly: true,
  secure: true,     
  sameSite: "none", 
}
,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, 
      collectionName: 'sessions',
      ttl: 24 * 60 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', Auth_Router);
app.use('/posts', PostRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error in connecting to ${PORT}: ${err.message}`);
    return;
  }
  console.log(`Server connected at PORT: ${PORT}`);
});
