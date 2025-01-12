const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require('../middleware/auth')
const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("signup  api hit!");
  try {
    const { username, password, interests } = req.body;
    const user = new User({ username, password, interests });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// New route to verify the token and return user data
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
});

// export default router;
module.exports = router;
