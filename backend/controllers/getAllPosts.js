import Post from "../models/Post.js";
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email") 
      .sort({ createdAt: -1 });
        
            console.log("Fetched posts:", JSON.stringify(posts, null, 2));

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
