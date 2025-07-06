const express = require("express");

const router = express.Router();

// Mobile Friendly response
// router.get("/users", async (req, res) => {
//   const allDbUsers = await User.find({}); //it means it show all the dbs which we have created
//   const html = `
//     <ul>
//       ${allDbUsers
//         .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
//         .join("")}
//     </ul>
//   `;
//   res.send(html);
// });

//REST API

router.get("/", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

router
  .route("/:id")
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

router.post("/", async (req, res) => {
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

module.export = router;
