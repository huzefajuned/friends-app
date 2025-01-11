const express = require("express");
const User = require("../models/User.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.post("/request", auth, async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user._id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    if (friend.friendRequests.includes(user._id)) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    friend.friendRequests.push(user._id);
    await friend.save();

    res.json({ message: "Friend request sent" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending friend request", error: error.message });
  }
});

router.post("/accept", auth, async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user._id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.friendRequests.includes(friend._id)) {
      return res
        .status(400)
        .json({ message: "No friend request from this user" });
    }

    user.friendRequests = user.friendRequests.filter(
      (id) => !id.equals(friend._id)
    );
    user.friends.push(friend._id);
    friend.friends.push(user._id);

    await user.save();
    await friend.save();

    res.json({ message: "Friend request accepted" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error accepting friend request",
        error: error.message,
      });
  }
});

router.post("/reject", auth, async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user._id);

    user.friendRequests = user.friendRequests.filter(
      (id) => !id.equals(friendId)
    );
    await user.save();

    res.json({ message: "Friend request rejected" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error rejecting friend request",
        error: error.message,
      });
  }
});

router.post("/unfriend", auth, async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user._id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    user.friends = user.friends.filter((id) => !id.equals(friend._id));
    friend.friends = friend.friends.filter((id) => !id.equals(user._id));

    await user.save();
    await friend.save();

    res.json({ message: "Friend removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing friend", error: error.message });
  }
});

router.get("/list", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "friends",
      "username"
    );
    res.json(user.friends);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting friends list", error: error.message });
  }
});

export default router;
