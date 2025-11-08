import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export const Cookie=(req,res)=>{
 const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {

    const decoded = jwt.verify(token, process.env.KEY);
    
    res.json({ user: decoded });
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}