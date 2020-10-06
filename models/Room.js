const mongoose = require("mongoose");

const { chatSchema } = require("./Chat");

const roomSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
      unique: true,
    },
    chats: {
      type: [chatSchema],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Room = mongoose.model("room", roomSchema);
