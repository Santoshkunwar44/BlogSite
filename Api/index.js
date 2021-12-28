const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/post");
const catRoute = require("./routes/categories");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const DB =
  "mongodb+srv://santosh:admin@cluster0.tme9l.mongodb.net/mymern?retryWrites=true&w=majority";

app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.json());
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MONGOdb"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute);
app.use("/api/category", catRoute);

app.listen(8000, () => {
  console.log("Backend is running...");
});
