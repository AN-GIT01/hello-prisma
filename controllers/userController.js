const { json } = require("express");
const { createDbUser, findUserByName, findUserById } = require("../repo/user");

const handleCreateUser = async (req, res) => {
  const { name, pwd, role } = req.body.user;
  if (!name || !pwd || !role)
    return res
      .status(400)
      .json({ message: "Username, password and role are required" });

  // check for duplicate usernames
  dbUser = await findUserByName(name);
  if (dbUser)
    return res
      .status(409)
      .json({ message: "User with this name already exists" }); //Conflict
  try {
    const resDb = await createDbUser({
      name: name,
      pwd: pwd,
      role: role,
    });
    return res.status(resDb.code).json(resDb.data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleRemoveUser = async (req, res) => {
  res.sendStatus(204);
};

const handleGetUserById = async (req, res) => {
  const id = req.params?.id;
  if (!id) {
    return res.status(400).json({ message: "id is undefined" });
  }
  const val = parseInt(id);
  if(isNaN(val)) {
    return res.status(400).json({ message: `bad user id: ${id}` });
  }

  const resDb = await findUserById(val);
  return res.status(resDb.code).json(resDb.data);


//   res.status(204).json({ message: "user not found" });
};

module.exports = { handleCreateUser, handleRemoveUser, handleGetUserById };
