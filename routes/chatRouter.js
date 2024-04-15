const express = require("express");
const { findChat } = require("../controller/chatController");

const chatRoute = express.Router();

chatRoute.post("/find-chat", findChat);

module.exports = chatRoute;
