const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username });
    if (existingUser)
      return res.status(409).json({ message: "Username Already Exist" });

    const user = await userModel.create({
      username,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    res.cookie("token", token);

    res.status(200).json({
      message: "User Created Succefully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});
// Login User
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) return res.status(401).json({ message: "Unauthorized User" });

  if (password === user.password) {
    return res.json({ message: "User is Authenticated" });
  }
});

// Getting User Data
router.get("/user", (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized User" });
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
});
module.exports = router;
