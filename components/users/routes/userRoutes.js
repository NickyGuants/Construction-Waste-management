const express = require('express')
const { registerUser, authUser, updateUserProfile } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router()

// create a user
router.route('/signup').post(registerUser)

// login a user
router.route("/login").post(authUser);

// route to update users profile
router.route("/profile").post(protect, updateUserProfile)



module.exports = router