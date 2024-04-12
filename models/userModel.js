const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    default: "Anonymous",
  },
  email: {
    type: String,
    default: "default@mail.com",
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
