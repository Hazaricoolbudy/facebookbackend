const mongoose = require('mongoose');
// const dotenv = require('dotenv')
// dotenv.config(); -- no need to define every where
// console.log(process.env.DATABASE_URL)
const connectToDb = async () => {
    await mongoose.connect(process.env.DATABASE_URL)
    if (connectToDb) {
        console.log("database is connected sucessfully")
    } else {
        console.log('connection unsuccesful')
    }
}



module.exports = connectToDb;