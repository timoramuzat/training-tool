var Quiz = require('../models/quiz')
var User = require('../models/user')
var Question = require('../models/question')
const jwt = require('jsonwebtoken')

exports.createQuiz = (req, res) => {
    whoid = req.userId;
    whoemail = req.username
    var quiz = new Quiz({
        quizname: req.body.quizname,
        quizdescription: req.body.description,
        owner: whoid,
        owneremail: whoemail
    });
    quiz.save((error, qz) => {
        if (error) {
            console.log(error);
            res.json({ msg: "Error" });
        }
        else {

            res.status(200).json({ message: "Quiz added" })
        }
    })
}

exports.getUploadquiz = (req, res) => {
    Quiz.find({ owner: req.userId, upload: false }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "Error!" });
        }
        else {
            res.json({ quiz: qz });
        }
    })
}

exports.seeStudent = (req, res) => {
    User.find({ role: "student" }, (err, usr) => {
        if (err) {
            console.log(error);
            res.json({ msg: "Error!" });
        }
        else {
            res.json({ user: usr });
        }
    })
}


exports.addQuestion = (req, res) => {

    Question.find({ quizid: req.body.quizid }, (err, q) => {
        if (err) {
            console.log(error);
            res.json({ msg: "Error!" });
        }
        else {
            var question = new Question({
                quizid: req.body.quizid,
                questionId: q.length + 1,
                questionText: req.body.questionText,
                answer: req.body.answer,
                options: req.body.options
            });

            question.save((error, qsn) => {
                if (error) {
                    console.log(error);
                    res.json({ msg: "Error!" });
                }
                else {
                    res.status(200).json({ message: "Question added" })
                }
            })
        }
    })
}

exports.uploadQuiz = (req, res) => {
    console.log(req.body);
    Question.find({ quizid: req.body.id }, (err, qz) => {
        if (err) {
            res.json({ msg: "Error!" });
        }
        else {
            console.log(qz.length);
            if (qz.length < 1) {
                res.json({ msg: "You must have at least 2 questions in this quiz." });
            }
            else {
                Quiz.updateOne({ _id: req.body.id }, { upload: true }, function (err, user) {
                    if (err) {
                        console.log(err)
                        res.json({ msg: "Error!" })
                    }
                    else {
                        const io = req.app.get('io');
                        io.emit("quizcrud", "Quiz");
                        res.json({ message: "Quiz uploaded" });
                    }
                })

            }

        }
    })

}

exports.deleteQuiz = (req, res) => {
    var id = req.params.id
    // console.log(req.params.id);
    Quiz.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.json({ msg: "Error!" });
            console.log("Error!");
        }
    })
    Question.deleteMany({ quizid: id }, (err) => {
        if (err) {
            res.json({ msg: "Error!" });
            console.log("Error");
        }
    })
    const io = req.app.get('io');
    io.emit("quizcrud", "Quiz");
    res.status(200).json({ msg: "Deleted" })
}


exports.getHomequiz = (req, res) => {
    Quiz.find({ owner: req.userId, upload: true }, (err, qz) => {
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


exports.deleteQuestion = (req, res) => {
    var id = req.params.id
    Question.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.json({ msg: "Something went wrong!" });

        }
    })
    res.json({ msg: "Deleted" })
}

exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("No")
    }
    let token = req.headers.authorization.split(' ')[1]
    // console.log(token);
    if (token == 'null') {
        return res.status(401).send("No")
    }
    let payload = jwt.verify(token, 'secretkey')
    if (!payload) {
        return res.status(401).send("No")
    }

    req.userId = payload.subject;
    req.username = payload.username;
    next()

}