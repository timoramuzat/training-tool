

const express = require('express')
const app = express()
var cors = require('cors')
// var bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000


// all routes
var apiRoutes = require('./routes/api')
var teacherRoutes = require('./routes/teacher')
var studentRoutes = require('./routes/student')

// some dependency
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// {
//     "origin": "http://localhost:4200",
//     'allowedHeaders': ['Authorization', 'Content-Type'],
// }
// {
    // 'allowedHeaders': ['Authorization', 'Content-Type'],
// }
// app.options('*', cors())

//database connection
const db = require('./database/db');
db()
// app.use(function (req, res, next) {
// res.header("Access-Control-Allow-Headers", "*")
// res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
// })

// socket
var server = require('http').Server(app);
var io = require('socket.io')(server,
    {
        cors:
        {
            origin: '*',
            methods: ["GET", "POST"],
            credentials: true
        }
    });
app.set('io', io);


io.on('connection', socket => {

    console.log("New connection succesfully received!");


});


// for testing purpose
app.get('/', (req, res) => {
    res.send("Stegaware server database")
})


// use all routes
app.use('/', apiRoutes)
app.use('/student', studentRoutes)
app.use('/teacher', teacherRoutes)


// for debugging
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
