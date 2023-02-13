var User = require('../models/user')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

exports.getCheck = (req, res, next) => {
  res.json({ msg: "All ok" })
}

exports.registerStudent = async (req, res) => {
  var user = new User({
    username: req.body.username,
    age: req.body.age,
    role: "student",
    password: User.hashPassword(req.body.p1),
  });
  User.find({ username: req.body.username }, (err, users) => {

    if (err) {
      console.log("Error! ");
      res.json({ msg: "Error!" });
    }
    if (users.length != 0) {
      console.log("Username already exists");
      res.json({ msg: "Username already exists" });
    }
    else {
      user.save((error, registeredUser) => {
        if (error) {
          console.log(error);
          res.json({ msg: "some error!" });
        }
        else {
          let payload = { subject: registeredUser._id, subject: user._id, username:user.username}
          let token = jwt.sign(payload, 'secretkey')
          res.status(200).json({ token: token, role: user.role })

        }
      })
    }
  })
}


exports.registerTeacher = async (req, res) => {
  // var x = await check(req,res,req.body.username);
  var user = new User({
    username: req.body.username,
    age: req.body.age,
    role: "teacher",
    password: User.hashPassword(req.body.p1),
  });
  User.find({ username: req.body.username }, (err, users) => {

    if (err) {
      console.log("Error ");
      res.json({ msg: "Error" });
    }
    if (users.length != 0) {
      console.log("Error");
      res.json({ msg: "User already exists" });
    }
    else {
      user.save((error, registeredUser) => {
        if (error) {
          console.log(error);
          res.json({ msg: "Error!" });
        }
        else {
          let payload = { subject: registeredUser._id, subject: user._id, username:user.username}
          let token = jwt.sign(payload, 'secretkey')
          res.status(200).json({ token: token, role: user.role })

        }
      })
    }
  })
}

exports.logIn = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      console.log(err)
      res.json({ msg: "Error!" });
    }
    else {
      if (!user) {
        res.json({ msg: 'Username not correct' })
      }
      else {
        bcrypt.compare(req.body.p1, user.password).then(match => {
          if (match) {
            console.log("User has logged in");
            let payload = { subject: user._id,username:user.username }
            let token = jwt.sign(payload, 'secretkey')
            res.status(200).json({ token: token, role: user.role })
          }
          else {
            console.log("Password not correct");
            res.json({ msg: 'Error!' })
          }
        }).catch(err => {
          console.log("somthing wrong");
          res.json({ msg: 'Error!' })
        })
      }
    }
  })
}







exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Error!")
  }
  let token = req.headers.authorization.split(' ')[1]

  if (token == 'null') {
    return res.status(401).send("Error!")
  }
  let payload = jwt.verify(token, 'secretkey')
  if (!payload) {
    return res.status(401).send("Error!")
  }
  req.userId = payload.subject
  req.username = payload.username;
  next()
}

