const mongoose = require("mongoose");
// const dotenv = require('dotenv')
// dotenv.config(); -- no need to define every where
// console.log(process.env.DATABASE_URL)
const connectToDb = async () => {
  console.log("database url" + process.env.DATABASE_URL);
  await mongoose.connect(process.env.DATABASE_URL);
  if (connectToDb) {
    console.log("database is connected sucessfully");
  } else {
    console.log("connection unsuccesfull");
  }
};

module.exports = connectToDb;
