import express from "express"
import jwt from "jsonwebtoken"
import User from "../model/user.js"
import bcrypt from "bcryptjs"
import { verifyToken } from "../middleware/protected.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Register
router.post("/register",upload.single('profilePic'), async (req, res) => {
  const { email, password, role,firstname,lastname } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });
    console.log(req.body)

    if (!req.file?.path) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
      profilePic: req.file.path, // Cloudinary URL
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.json({
      msg: "Logged in",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

     res.status(201).json({
      msg: "User registered",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out" });
});

router.get("/me", verifyToken, (req, res) => {
  res.json({
    msg: "Access granted",
    user: req.user
  });
});

export default router;
