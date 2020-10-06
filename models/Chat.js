const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chat: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = { chatSchema, Chat };
