const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config({ path: "config/config.env" });

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://sahraouititao:titao123@cluster0.cqths0d.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((con) => {
      console.log(
        `MongoDb Database Connected with host : ${con.connection.host}`
      );
    });
};

module.exports = connectDatabase;
