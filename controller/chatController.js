// const user = require("../models/user");

const chatArray = require("../models/chatmodel");
const recentChat = require("../models/recentChatModel");
const user = require("../models/userModel");

const findChat = async (req, res) => {
  const mobile1 = req.body.mobile1;
  const mobile2 = req.body.mobile2;
  try {
    let a = await chatArray.find({ room: `${mobile1}${mobile2}` });
    if (a[0] !== undefined) {
      res.send({
        found: true,
        roomData: a[0],
      });
    } else {
      let a = await chatArray.find({ room: `${mobile2}${mobile1}` });
      if (a[0] !== undefined) {
        res.send({
          found: true,
          roomData: a[0],
        });
      } else {
        let a = await chatArray.create({
          room: `${mobile1}${mobile2}`,
          chat: [],
        });
        res.status(201).send({
          found: true,
          roomData: a,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const getRecentChat = async (req, res) => {
  const mobile = req.body.mobile;
  try {
    let a = await recentChat.find({ userMobile: mobile });
    if (a[0] !== undefined) {
      let data = a[0].chat;
      let chatData = await Promise.all(
        data.map(async (e, i) => {
          let userData = await user.find({ mobile: e.number });
          return {
            name: userData[0].name,
            mobile: userData[0].mobile,
          };
        })
      );

      res.send({
        found: true,
        chat: chatData,
      });
    } else {
      res.send({
        found: false,
        chat: [],
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { findChat, getRecentChat };
