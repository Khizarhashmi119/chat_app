const express = require("express");

const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

connectDB();

app.use(require("./routes/home"));
app.use(require("./routes/room"));

app.listen(PORT, () =>
  console.log(`Server is up and running at port no. ${PORT}...`)
);
