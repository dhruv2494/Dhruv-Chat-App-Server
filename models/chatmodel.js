const { Schema, default: mongoose } = require("mongoose");

const chatSchema = new Schema({
  room: {
    type: String,
  },
  chat: [
    {
      sender: {
        type: String,
      },
      massage: {
        type: String,
      },
      timestamp: {
        type: String,
      },
    },
  ],
});

const chatArray = mongoose.model("chat", chatSchema);
module.exports = chatArray;
