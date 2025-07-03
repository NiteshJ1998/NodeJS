const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello From home page");
});

app.get("/about", (req, res) => {
  return res.send("Hello From About Page");
});

const myServer = http.createServer(app);

myServer.listen(9000, () => console.log("Server Started.."));
