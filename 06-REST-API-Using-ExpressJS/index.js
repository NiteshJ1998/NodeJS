const express = require("express");

const app = express();
const PORT = 2000;

app.get("/", (req, res) => {
  return res.send("Home Page");
});

app.get("/about", (req, res) => {
  return res.send("This is about page");
});

app.listen(PORT, () => console.log(`Server Started at PORT${PORT} `));
