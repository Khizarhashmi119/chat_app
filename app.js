const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require("./date");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/chatDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const chatSchema = new mongoose.Schema({
  chat: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const roomSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true
  },
  chats: {
    type: [chatSchema],
    required: true
  }
});

const Chat = mongoose.model("chat", chatSchema);
const Room = mongoose.model("room", roomSchema);

app
  .route("/")
  .get((req, res) => {
    res.render("home");
  })
  .post((req, res) => {
    const roomName = req.body.room;
    if (roomName.length > 2 && roomName.length < 10) {
      Room.findOne({ room: roomName }, (err, result) => {
        if (!err) {
          if (!result) {
            const chat1 = new Chat({
              chat: "Start Chating anonymously.",
              date: date()
            });
            const defaultChats = [chat1];
            const newRoom = new Room({
              room: roomName,
              chats: defaultChats
            });
            newRoom.save().then(() => {
              res.render("result", {
                message: "Successfully created your chat room."
              });
            });
          } else {
            res.render("result", {
              message: "Try another name of chat room."
            });
          }
        } else {
          res.render("result", {
            message: "Error! Try again later."
          });
        }
      });
    } else {
      res.render("result", {
        message: "Room name must have between 2 to 10 characters."
      });
    }
  });

app
  .route("/:room")
  .get((req, res) => {
    const roomName = req.params.room;
    Room.findOne({ room: roomName }, (err, result) => {
      if (!err) {
        if (!result) {
          res.render("result", {
            message: "Chat room not found! First create your chat room."
          });
        } else {
          res.render("room", {
            room: result
          });
        }
      } else {
        res.render("result", {
          message: "Error! Try again later."
        });
      }
    });
  })
  .post((req, res) => {
    const roomName = req.params.room;
    const chat = req.body.message;
    Room.findOne({ room: roomName }, (err, result) => {
      if (!err) {
        if (result) {
          const newChat = new Chat({
            chat: chat,
            date: date()
          });
          result.chats.push(newChat);
          result.save();
          res.redirect("/" + roomName);
        } else {
          res.render("result", {
            message: "Error! Try again later."
          });
        }
      } else {
        res.render("result", {
          message: "Error! Try again later."
        });
      }
    });
  });

app.listen(3000, () => {
  console.log("Server has been started at port no. 3000.");
});
