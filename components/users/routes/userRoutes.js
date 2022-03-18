const express = require('express')
const { registerUser, authUser } = require('../controllers/userControllers')

const router = express.Router()

// create a user
router.route('/signup').post(registerUser)

// login a user
router.route("/login").post(authUser);



module.exports = router