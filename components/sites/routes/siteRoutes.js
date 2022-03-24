const express = require("express");
const {
    getSites,
    CreateSite,
    getAllSites,
    updateSite,
    deleteSite
} = require("../controllers/siteController");
const { protect, checkAdmin } = require("../../users/middlewares/authMiddleware");

const router = express.Router();

// get a site for a specific user
router.route("/sites").get(protect, getSites);
// create a site
router.route("/sites/create").post(protect, CreateSite)

// get all sites // this is for admin
router.route("/sites/all").get(protect, checkAdmin, getAllSites)

// route to update a users specific site details
router.route("/sites/edit").post(protect, updateSite)

// route to delete a users specific site details
router.route("/sites/delete").post(protect, deleteSite)


module.exports = router;