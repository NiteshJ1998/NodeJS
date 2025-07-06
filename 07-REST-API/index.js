const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 2000;

app.use(express.json());
//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/REST-API") // this return promise
  .then(() => console.log("MongoDB connected "))
  .catch((err) => console.log("MongoDB not connected", err));

//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

//Model

const User = mongoose.model("user", userSchema);

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

// Mobile Friendly response
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({}); //it means it show all the dbs which we have created
  const html = `
    <ul>
      ${allDbUsers
        .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
        .join("")}
    </ul>
  `;
  res.send(html);
});

//REST API

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "No such user found " });
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { firstName: "Changed" });
    return res.json({ status: "Success" });
    //Edit User with id
  })

  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required to fill" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "Success" });
});

// Patch means we have to edit some user

app.listen(PORT, () => console.log(`Server Started at PORT${PORT} `));
