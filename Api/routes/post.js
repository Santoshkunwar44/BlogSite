const router = require("express").Router();
const User = require("../models/User");
const posts = require("../models/Post");

//CREATE NEW POST
router.post("/", async (req, res) => {
  const newPost = new posts(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(505).json(err);
  }
});

///UPDATE
router.put("/:id", async (req, res) => {
  try {
    const user = await posts.findById(req.params.id);
    if (user.username === req.body.username) {
      try {
        const updatePost = await posts.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(500).json("You  can update only your post");
    }
  } catch (err) {
    res.status(200).json("No user found");
  }
});
// DELETE

router.delete("/:id", async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("post has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(500).json(" YOu can only delete your post!");
    }
  } catch (err) {
    res.status(200).json("No user found");
  }
});

//GET POST

router.get("/:id", async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POST

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let post;
    if (username) {
      post = await posts.find({ username });
    } else if (catName) {
      post = await posts.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      post = await posts.find();
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
