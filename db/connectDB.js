const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Julesvdw:MvYxDwSncCpW9ho1@cryptohawk-lv7bz.gcp.mongodb.net/cryptohawk?retryWrites=true&w=majority",
      { useUnifiedTopology: true, useNewUrlParser: true }
    );

    console.log("mongodb connected...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
