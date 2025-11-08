import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signin = async (req, res) => {
   const {userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send(err);

      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) return res.status(500).send(error);

        const user = new User({name: userName, email, password: hash });
        await user.save();

        const token = jwt.sign(
           { email:email, name:userName },
          process.env.KEY,
           { expiresIn: "1h" }
         );

        res.cookie("token", token, {
           httpOnly: true,
           secure: false, 
           sameSite: "Lax",
         });

        res.status(200).json({ message: "User signed in successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
