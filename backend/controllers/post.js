import Post from "../models/Post.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const createPost = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.KEY);
    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const { content } = req.body;
    if (!content || content.trim() === "")
      return res.status(400).json({ error: "Post content cannot be empty" });

    const newPost = new Post({ user: user._id, content });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "user email") 
      .sort({ createdAt: -1 }); 

    res.status(200).json(posts);
  } catch (error) {
    console.error("Get Posts Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
