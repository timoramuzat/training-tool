// Database connection API settings
const mongodb = require('mongoose')
function connectDb()
{
    mongodb.Promise = global.Promise
    mongodb.connect('mongodb+srv://habbo1:habbo1@cluster1.25jwf1x.mongodb.net/quiz')
    const con = mongodb.connection

    con.on('open', () => {
        console.log("Stegaware is connected to database");
    })
}

module.exports = connectDb