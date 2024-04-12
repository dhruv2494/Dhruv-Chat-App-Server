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
const register = async (req, res) => {
  let data = req.body;
  //   console.log(data.mobile,"pp");
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
module.exports = { findUser, register };
