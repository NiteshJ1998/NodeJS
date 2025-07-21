const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoute = require("./routes/user");

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
mongoose
  .connect("mongodb://127.0.0.1:27017/blogg")
  .then((e) => console.log("mongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Sever started at PORT: ${PORT}`));
