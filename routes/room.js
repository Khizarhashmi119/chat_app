const express = require("express");
const routers = express.Router();

const Room = require("../models/Room");
const Chat = require("../models/Chat").Chat;
const date = require("../date");

routers
  .get("/:room", async (req, res) => {
    const { room: roomName } = req.params;

    try {
      const result = await Room.findOne({ room: roomName });

      if (!result) {
        res.render("result", {
          message: "Chat room not found! First create your chat room.",
        });
      } else {
        res.render("room", {
          room: result,
        });
      }
    } catch (err) {
      res.render("result", {
        message: "Internal server error.",
      });

      console.log(err);
    }
  })
  .post("/:room", async (req, res) => {
    const { room: roomName } = req.params;
    const { message: chat } = req.body;

    try {
      const result = await Room.findOne({ room: roomName });

      if (result) {
        const newChat = new Chat({
          chat: chat,
          date: date(),
        });

        result.chats.push(newChat);
        await result.save();
        res.redirect("/" + roomName);
      }
    } catch (err) {
      res.render("result", {
        message: "Internal server error.",
      });

      console.log(err);
    }
  });

module.exports = routers;
