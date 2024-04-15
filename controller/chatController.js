// const user = require("../models/user");

const chatArray = require("../models/chatmodel");

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

module.exports = { findChat };
