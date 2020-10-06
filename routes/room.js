const express = require("express");
const router = express.Router();

const Room = require("../models/Room");
const { Chat } = require("../models/Chat");

router.post("/", async (req, res) => {
  const { room } = req.body;

  try {
    const result = await Room.findOne({ room });

    if (result) {
      return res.render("result", {
        message: "Try different name of chat room.",
      });
    }

    const chat1 = new Chat({
      chat: "Start Chating anonymously.",
    });

    const defaultChats = [chat1];

    const newRoom = new Room({
      room,
      chats: defaultChats,
    });

    await newRoom.save();

    return res.render("result", {
      message: "Successfully created your chat room.",
    });
  } catch (err) {
    console.log(err);
    return res.render("result", {
      message: "Internal server error",
    });
  }
});

router.get("/:room", async (req, res) => {
  const { room } = req.params;

  try {
    const result = await Room.findOne({ room });

    if (!result) {
      return res.render("result", {
        message: "Chat room not found! First create your chat room.",
      });
    }

    return res.render("room", {
      room: result,
    });
  } catch (err) {
    console.log(err);
    return res.render("result", {
      message: "Internal server error.",
    });
  }
});

router.post("/:room", async (req, res) => {
  const { room } = req.params;
  const { message: chat } = req.body;

  try {
    const result = await Room.findOne({ room });

    const newChat = new Chat({
      chat: chat,
    });

    result.chats.push(newChat);
    await result.save();
    res.redirect("/" + room);
  } catch (err) {
    console.log(err);
    res.render("result", {
      message: "Internal server error.",
    });
  }
});

module.exports = router;
