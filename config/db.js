const config = require("config");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
