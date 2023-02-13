var Quiz = require('../models/quiz')
var Question = require('../models/question')
const jwt = require('jsonwebtoken')

exports.getallquiz = (req, res) => {
    Quiz.find({upload:true}, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "Error!" });
        }
        else {
            res.json({ quiz: qz });
        }
    })
}

exports.getAllQuestion = (req, res) => {

    Question.find({ quizid: req.params.id }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ errormsg: "Error!" });
        }
        else {
            res.json({ msg: qz });
        }
    })
}


exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Error!")
    }
    let token = req.headers.authorization.split(' ')[1]
    // console.log(token);
    if (token == 'null') {
        return res.status(401).send("Error!")
    }
    let payload = jwt.verify(token, 'secretkey')
    if (!payload) {
        return res.status(401).send("Error!")
    }
    req.userId = payload.subject;
    req.username = payload.username;
    console.log(payload.username);
    next()
}