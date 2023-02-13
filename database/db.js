// Database connection API settings
const mongodb = require('mongoose')


function connectDb()
{
    mongodb.Promise = global.Promise
    mongodb.set('strictQuery',false);
    mongodb.connect('mongodb+srv://habbo1:habbo1@cluster1.25jwf1x.mongodb.net/quiz')
    const con = mongodb.connection

    mongodb.connection
        .on("open", () => console.log("Connected to Mongoose"))
        .on("close", () => console.log("Disconnected from Mongoose"))
        .on("error", (error) => console.log(error));
}

module.exports = connectDb
