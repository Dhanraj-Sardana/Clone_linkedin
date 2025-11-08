import express from "express";
import { signin } from "../controllers/Signin.js";
import { login } from "../controllers/Login.js";
import { Cookie } from "../controllers/Cookie.js";
import {Callback} from '../controllers/Callback.js';
import passport from "passport";
import "../middleware/passport.js";
const Auth_Router = express.Router();
Auth_Router.post("/signin", signin);
Auth_Router.post("/login", login);
Auth_Router.get("/cookie",Cookie);
Auth_Router.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));
Auth_Router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),Callback);

export default Auth_Router;
