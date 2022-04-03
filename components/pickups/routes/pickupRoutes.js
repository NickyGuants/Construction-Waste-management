const express = require("express");
const { protect, checkAdmin } = require("../../users/middlewares/authMiddleware");


const {
    getAllPickups,
    getUserPickups,
    createPickup,
    updateUserPickups
} = require('../controllers/pickupController')


const router = express.Router()

// route to create a pickup for specific user
router.route('/create').post(createPickup)


// router to get specifc user pickups
router.route('/myPickups').get(getUserPickups)


// router to get all pickups requests for admin
router.route('/allPickups').get(getAllPickups)

// router for admim to be able to edit/add data for pickup requests
router.route('/update/:id').post(updateUserPickups)

module.exports = router