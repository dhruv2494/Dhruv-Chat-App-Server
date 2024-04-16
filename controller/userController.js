// const user = require("../models/user");

const recentChat = require("../models/recentChatModel");
const user = require("../models/userModel");

const findUser = async (req, res) => {
  //   console.log(req.body.mobile);
  try {
    let a = await user.find({ mobile: req.body.mobile });
    if (a[0] !== undefined) {
      res.send({
        found: true,
        user: a[0],
      });
    } else {
      res.send({
        found: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const searchUser = async (req, res) => {
  try {
    let a = await user.find({ mobile: req.body.mobile });
    if (a[0] !== undefined) {
      let currentUser = await recentChat.find({
        userMobile: req.body.myMobile,
      });
      if (currentUser[0] !== undefined) {
        let currentUserData = currentUser[0];

        const found = currentUserData.chat.some(
          (chat) => chat.number === req.body.mobile
        );

        if (!found) {
          const update = await recentChat.findByIdAndUpdate(
            currentUserData._id,
            {
              $push: {
                chat: { number: req.body.mobile },
              },
            }
          );
          console.log(update);
        } else {
          console.log("Mobile number  found in recentlyChatted array.");
        }
      } else {
        const update = await recentChat.create({
          userMobile: req.body.myMobile,
          chat: [{ number: req.body.mobile }],
        });
      }
      res.send({
        found: true,
        user: { name: a[0].name, mobile: a[0].mobile },
      });
    } else {
      res.send({
        found: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const register = async (req, res) => {
  let data = req.body;
  try {
    let a = await user.create({
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      password: data.password,
    });
    res.status(201).send(a);
  } catch (e) {
    console.log(e);
  }
};

const getOtherUserData = async (req, res) => {
  try {
    let a = await user.find({ mobile: req.body.mobile });
    if (a[0] !== undefined) {
      res.send({
        found: true,
        user: { name: a[0].name, mobile: a[0].mobile },
      });
    } else {
      res.send({
        found: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};



module.exports = { findUser, register, searchUser, getOtherUserData };
