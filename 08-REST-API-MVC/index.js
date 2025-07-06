const express = require("express");
const fs = require("fs");

const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 2000;

app.use(express.json());
//Connection
connectMongoDB("mongodb://127.0.0.1:27017/REST-API");

// Middleware -Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.method} ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

app.use((req, res, next) => {
  // console.log("this is middleware 2 ", req.username);
  next();
});

//Routes
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT${PORT} `));
