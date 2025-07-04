const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 2000;

// Middleware -Plugin
app.use(express.urlencoded({ extended: false }));

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
    res.json({ status: "Pending" });
  })

  .delete((req, res) => {
    res.json({ status: "Pending" });
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
