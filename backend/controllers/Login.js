import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { email, password, googleId } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

  
    if (user.provider === "google") {
      
      return res.status(403).json({
        error: "This account was created using Google. Please use 'Continue with Google' to log in.",
      });
    }


    if (user.provider === "local") {
      if (!user.password) {
        return res.status(400).json({ error: "Password not set for this account." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Wrong password" });
      }

      // 
      // const token = jwt.sign({ id: user._id, email: user.email }, process.env.KEY, {
      //   expiresIn: "1h",
      // });

      // res.cookie("token", token, {
      //   httpOnly: true,
      //   secure: false,
      //   sameSite: "Lax",
      // });

      return res.status(200).json({ message: "Login successful" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
