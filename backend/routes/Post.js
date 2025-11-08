import express from "express";
import { createPost } from "../controllers/createPost.js";
import { getAllPosts } from "../controllers/getAllPosts.js";


const PostRouter = express.Router();

PostRouter.post("/create", createPost);
PostRouter.get("/all", getAllPosts);

export default PostRouter;
