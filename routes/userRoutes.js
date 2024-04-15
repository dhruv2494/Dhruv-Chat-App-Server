const express = require("express");
const {
  findUser,
  register,
  searchUser,
  getOtherUserData,
} = require("../controller/userController");

const userRoute = express.Router();

userRoute.post("/find-user", findUser);
userRoute.post("/register", register);
userRoute.post("/search-user", searchUser);
userRoute.post("/get-other-user", getOtherUserData);

module.exports = userRoute;
