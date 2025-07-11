const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handlegetUserByID(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "No such user found " });
  return res.json(user);
}

async function handleUpdateUserbyID(req, res) {
  await User.findByIdAndUpdate(req.params.id, { firstName: "Changed" });
  return res.json({ status: "Success" });
  //Edit User with id
}

async function handleDeleteUserbyID(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
}

async function handleCreteNewUser(req, res) {
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

  return res.status(201).json({ msg: "Success", id: result._id });
}
module.exports = {
  handleGetAllUsers,
  handlegetUserByID,
  handleUpdateUserbyID,
  handleDeleteUserbyID,
  handleCreteNewUser,
};
