const express = require('express')
const { registerUser, authUser, getUsers, getSingleUser } = require('../controllers/userControllers')

const router = express.Router()

// create a user
router.route('/signup').post(registerUser)

// login a user
router.route( "/login" ).post( authUser );

//get all users
router.route( "/" ).get( getUsers );

//get single user
router.route( "/:id" ).get( getSingleUser );



module.exports = router