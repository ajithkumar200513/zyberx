const express = require('express')
const route = express.Router()
const {UserSignup,UserLogin} = require('../Controllers/UserControllers')
const {forgetPassword,resetPassword} = require('../Controllers/FpCountroller')
route.post('/signup',UserSignup)
route.post('/login',UserLogin)
route.post('/forgotpass',forgetPassword)
route.post('/reset/:token',resetPassword)


module.exports = route