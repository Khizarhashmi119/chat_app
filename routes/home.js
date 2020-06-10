const express = require("express");
const routers = express.Router();

const Room = require("../models/Room");
const Chat = require("../models/Chat").Chat;
const date = require("../date");

routers
  .get("/", (req, res) => {
    res.render("home");
  })
  .post("/", async (req, res) => {
    const { room: roomName } = req.body;

    if (roomName.length > 2 && roomName.length < 10) {
      try {
        const result = await Room.findOne({ room: roomName });

        if (!result) {
          const chat1 = new Chat({
            chat: "Start Chating anonymously.",
            date: date(),
          });

          const defaultChats = [chat1];

          const newRoom = new Room({
            room: roomName,
            chats: defaultChats,
          });

          await newRoom.save();

          res.render("result", {
            message: "Successfully created your chat room.",
          });
        } else {
          res.render("result", {
            message: "Try different name of chat room.",
          });
        }
      } catch (err) {
        res.render("result", {
          message: "Internal server error",
        });

        console.log(err);
      }
    } else {
      res.render("result", {
        message: "Room name must have between 2 to 10 characters.",
      });
    }
  });

module.exports = routers;
