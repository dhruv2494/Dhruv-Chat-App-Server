const express = require("express");
const { findChat, getRecentChat } = require("../controller/chatController");

const chatRoute = express.Router();

chatRoute.post("/find-chat", findChat);
chatRoute.post("/find-recent-chat", getRecentChat);

module.exports = chatRoute;
