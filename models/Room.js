const mongoose = require("mongoose");

const chatSchema = require("./Chat").chatSchema;

const roomSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  chats: {
    type: [chatSchema],
    required: true,
  },
});

module.exports = Room = mongoose.model("room", roomSchema);
