// const user = require("../models/user");

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
      let currentUser = await user.find({ mobile: req.body.myMobile });
      // let currentUserData = currentUser[0];
      // let finded = false;
      // for (let i = 0; i < currentUserData.recentlyChatted.length; i++) {
      //   if (currentUserData.recentlyChatted[i].mobile == req.body.myMobile) {
      //     finded = true;
      //     console.log(currentUser.recentlyChatted[i]);
      //     break;
      //   }
      // }
      // if (!finded) {
      //   const update = await user.findByIdAndUpdate(currentUserData._id, {
      //     $push: {
      //       recentlyChatted: { mobile: req.body.mobile },
      //     },
      //   });
      let currentUserData = currentUser[0];

      const found = currentUserData.recentlyChatted.some(
        (chat) => chat.mobile === req.body.mobile
      );

      if (!found) {
        const update = await user.findByIdAndUpdate(currentUserData._id, {
          $push: {
            recentlyChatted: { mobile: req.body.mobile },
          },
        });
        console.log(update);
      } else {
        console.log("Mobile number  found in recentlyChatted array.");
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
  //   console.log(req.body.mobile);
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
