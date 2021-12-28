const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Please! Enter Valid Credentials" });
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (validate) {
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
      } else {
        return res
          .status(400)
          .json({ errorMsg: "Username or password is invalid" });
      }
    } else {
      return res.status(400).json({ errorMsg: " User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ errorMsg: "Username or password  is invalid" });
  }
});


module.exports =router;