const express = require("express");
const student = require("./routes/student.route");
const course = require("./routes/courses.route");
const admin = require("./routes/admin.route.js");
const {
  verifyAccessTokenMiddleware,
} = require("./middleware/auth.middleware.js");
const upload = require("./middleware/multer.middleware.js");

const app = express();
const { PORT } = require("./config/index.js");

app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.use("/students", verifyAccessTokenMiddleware, student);
app.use("/courses", verifyAccessTokenMiddleware, course);
app.use("/admin", verifyAccessTokenMiddleware, upload.single("picture"), admin);

app.get("/", (req, res) => {
  res.json({ msg: "working!" });
});

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
