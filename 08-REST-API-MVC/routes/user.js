const express = require("express");
const {
  handleGetAllUsers,
  handlegetUserByID,
  handleUpdateUserbyID,
  handleDeleteUserbyID,
  handleCreteNewUser,
} = require("../controllers/user");

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

router.route("/").get(handleGetAllUsers).post(handleCreteNewUser);

router
  .route("/:id")
  .get(handlegetUserByID)
  .patch(handleUpdateUserbyID)
  .delete(handleDeleteUserbyID);

module.exports = router;
