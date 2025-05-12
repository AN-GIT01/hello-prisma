const prisma = require("../lib/prisma");
const { reportStatus } = require("../lib/functions");

const createDbUser = async (user) => {
  try {
    const dbUser = await prisma.user.create({ data: user });
    return reportStatus(201, dbUser);
  } catch (err) {
    if (err.code === "P2002") {
      console.log("Not unique record: " + err.code);
      return reportStatus(409, {
        message: "User with this name alredy exists",
      });
    } else {
      console.log("General error: " + err.code);
      return reportStatus(500, { message: "General server error" });
    }
  }
};

const findUserByUsername = async (username) => {
  try {
    const dbUser = await prisma.user.findFirst({
      where: { username: username },
    });
    return dbUser;
  } catch (err) {
    console.log("findUserByUsername error: " + err.message);
  }
};

const findUserById = async (id) => {
  try {
    const dbUser = await prisma.user.findFirst({
      where: { id },
    });
    if (dbUser) {
      return reportStatus(200, dbUser);
    }
    console.log(`User with id: ${id} not found`)
    return reportStatus(404, { message: `User with id: ${id} not found` });
  } catch (err) {
    console.log("findUserById error: " + err.message);
    return reportStatus(500, { message: "General server error" });
  }
};

//   module.exports = { getAllUsers, getUserById, createUser, deleteUser, updateUser };
module.exports = { createDbUser, findUserByUsername, findUserById };
