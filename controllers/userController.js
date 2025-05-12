const { json } = require("express");
const { createDbUser, findUserByUsername, findUserById } = require("../repo/user");

const RoleEnum = {
  ADMIN: "1111",
  USER: "2222",
  EDITOR: "3333"
}

const handleCreateUser = async (req, res) => {
  const { username, password, role } = req.body.user;
  if (!username || !password || !role)
    return res
      .status(400)
      .json({ message: "Userusername, password and role are required" });

  // check for duplicate userusernames
  dbUser = await findUserByUsername(username);
  if (dbUser)
    return res
      .status(409)
      .json({ message: "User with this username already exists" }); //Conflict
  try {
    const resDb = await createDbUser({
      username: username,
      password: password,
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
  let newRoles = {}
  resDb.data.role.map(role =>{
    newRoles[role] = RoleEnum[role]    
  })
  console.log(newRoles)
  resDb.data.role = newRoles
  return res.status(resDb.code).json(resDb.data);


//   res.status(204).json({ message: "user not found" });
};

module.exports = { handleCreateUser, handleRemoveUser, handleGetUserById };
