const express = require('express')

const { protect, checkAdmin, } = require('../middlewares/authMiddleware');
const { registerUser, authUser, getUsers, getSingleUser,updateUserProfile } = require('../controllers/userControllers')


const router = express.Router()

// create a user
router.route('/account/signup').post(registerUser)

// login a user
router.route( "/account/login" ).post( authUser );

//get all users
router.route( "/" ).get( getUsers );

//get single user
router.route( "/:id" ).get( getSingleUser );

// route to update users profile
router.route("/profile").post(protect, updateUserProfile)


router.route("/admin/login").post(protect, checkAdmin, authUser)

// once logged in as admin you should be able to get all users/ all sites etc

module.exports = router