const mongoose = require("mongoose");
const config = -require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(`${config.get("DBURI")}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("mongodb connected...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
