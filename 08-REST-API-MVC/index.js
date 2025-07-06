const express = require("express");

const { logRequestResponse } = require("./middlewares/index");
const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 2000;

app.use(express.json());
//Connection
connectMongoDB("mongodb://127.0.0.1:27017/REST-API").then(() =>
  console.log("Mongodb connected")
);

// Middleware -Plugin
app.use(express.urlencoded({ extended: false }));

app.use(logRequestResponse("log.txt"));

// app.use((req, res, next) => {
//   // console.log("this is middleware 2 ", req.username);
//   next();
// });

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT${PORT} `));
