import express from "express";
import { signin } from "../controllers/Signin.js";
import { login } from "../controllers/Login.js";
// import { home } from "../controllers/Home.js";
import {Callback} from '../controllers/Callback.js';
import passport from "passport";
import { logout } from "../controllers/Logout.js";
import "../middleware/passport.js";

const Auth_Router = express.Router();

Auth_Router.post("/signin", signin);
Auth_Router.post("/login", login);
// Auth_Router.get("/home", home);
Auth_Router.post("/logout", logout);
Auth_Router.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));
Auth_Router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),Callback);

export default Auth_Router;
