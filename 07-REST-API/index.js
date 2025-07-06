const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 2000;

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
  console.log("this is middleware 2 ", req.username);
  next();
});

// Mobile Friendly response
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

//REST API

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    // To get the id
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id); // find the id on mock data
    return res.json(user);
  })
  .patch((req, res) => {
    //Edit User with id
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({ status: "User not found" });
    }

    //UpdatedUser only the provided fields
    const UpdatedUser = { ...users[index], ...req.body };
    users[index] = UpdatedUser;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ status: "Error writing file " });
      }
      res.json({ status: "user updated", user: UpdatedUser });
    });
  })

  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({ status: "Item not found" });
    }

    const deletedUser = users.splice(index, 1)[0];

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ status: "Error writing file" });
      }
      res.json({ status: "User Deleted", user: deletedUser });
    });
  });

app.post("/api/users", (req, res) => {
  // const body = req.body;
  // console.log("Body", body);

  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

// Patch means we have to edit some user

app.listen(PORT, () => console.log(`Server Started at PORT${PORT} `));
