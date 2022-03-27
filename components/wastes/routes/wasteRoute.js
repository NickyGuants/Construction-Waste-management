const express = require("express");
const {
    getWastes,
    CreateWaste,
    updateWastes,
    deleteWaste
} = require("../controllers/wasteController");
const {
    protect,
    checkAdmin,
    protectSite,
    protectWaste,
} = require("../../users/middlewares/authMiddleware");

const router = express.Router();

// get a waste for a specific site
router.route("/wastes").get(protectSite, getWastes);
// create a site
router.route("/wastes/create").post(protectSite, CreateWaste);

// get all wastes for a given user


// update wastes for a given site
router.route('/wastes/edit').post(protectWaste, updateWastes)


// to delete a waste for a given site
router.route('/wastes/delete').post(protectWaste, deleteWaste)


module.exports = router;