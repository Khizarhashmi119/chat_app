if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const roomRoutes = require("./routes/room");

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB is connected...");
    app.listen(PORT, () =>
      console.log(`Server is up and running at port no. ${PORT}...`)
    );
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use(roomRoutes);
