import jwt from "jsonwebtoken";
export  const Callback = (req, res) => {
    console.log("req use :: ",req.user);
    const token = jwt.sign(
      { name: req.user.name, email: req.user.email },
      process.env.KEY,
      { expiresIn: "1h" }
    );

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "None",
    });
    res.redirect("https://clone-linkedin-alpha.vercel.app/main-page");
  
}