const { Schema, default: mongoose } = require("mongoose");

const recentChatSchema = new Schema({
  userMobile: {
    type: String,
  },
  chat: [
    {
      number: {
        type: String,
      },
    },
  ],
});

const recentChat = mongoose.model("recentChat", recentChatSchema);
module.exports = recentChat;
