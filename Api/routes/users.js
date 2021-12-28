const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const posts = require("../models/Post");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ errorMsg: "Enter valid credentials" });
    }
  } else {
    res.status(500).json(" YOu can update only your account");
  }
});

// DELETE
// http://localhost:8000/api/users/
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await posts.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been successfully deleted" });
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.json("User not found");
    }
  } else {
    res.status(401).json(" YOu can delete only your account");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.json(500).json(err);
  }
});

module.exports = router;
