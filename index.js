const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const connectToDb = require('./database/db')

const port = process.env.PORT || 8000;

// const userRouter = require('./routes/user')
const { readdirSync } = require('fs') //this is use to read all files from routes folder
app.use(cors())
app.use(express.json())
connectToDb();


// app.use("/", userRouter)
readdirSync("./routes").map((r) => { app.use("/", require("./routes/" + r)) })




app.listen(port, (err) => {
    if (err) throw err;
    console.log(`app is running on port ${port}`)
})