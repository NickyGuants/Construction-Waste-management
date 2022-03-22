const express = require('express')
const { registerUser, authUser, updateUserProfile } = require('../controllers/userControllers');
const { protect, checkAdmin, } = require('../middlewares/authMiddleware');

const router = express.Router()

// create a user
router.route('/signup').post(registerUser)

// login a user
router.route("/login").post(authUser);

// route to update users profile
router.route("/profile").post(protect, updateUserProfile)


router.route("/admin/login").post(protect, checkAdmin, authUser)

// once logged in as admin you should be able to get all users/ all sites etc

module.exports = router