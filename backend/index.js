import dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/Mongodb.js';
import passport from "passport";
import session from "express-session";
import cookieParser from 'cookie-parser';
import './middleware/passport.js'
import cors from 'cors';

dotenv.config();



import Auth_Router from './routes/AuthRoute.js';
import PostRouter from './routes/Post.js';

connectDb();

const app = express();

app.use(cors({origin:'http://localhost:5173',credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET ,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());


app.use('/auth',Auth_Router);
app.use('/posts',PostRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Error in connecting to ${PORT} : ${err.message}`);
        return;
    }
    console.log(`Server connected at PORT : ${PORT}`);
})