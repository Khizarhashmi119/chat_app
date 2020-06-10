const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chat: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports.chatSchema = chatSchema;
module.exports.Chat = Chat = mongoose.model("chat", chatSchema);
