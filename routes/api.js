var express = require('express')
var router = express.Router()
const apiController = require('../controller/api')
require('dotenv').config()



router.post('/registerstudent', apiController.registerStudent)
router.post('/registerteacher', apiController.registerTeacher)
router.post('/login', apiController.logIn)




module.exports = router
