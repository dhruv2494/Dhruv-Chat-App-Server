const express = require("express");
const { findUser, register } = require("../controller/userController");

const userRoute = express.Router();

userRoute.post("/find-user", findUser);
userRoute.post("/register", register);

module.exports = userRoute;
