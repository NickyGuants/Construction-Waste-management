const express = require("express");
const {
    getSites,
    CreateSite,
    getAllSites
} = require("../controllers/siteController");
const { protect, checkAdmin } = require("../../users/middlewares/authMiddleware");

const router = express.Router();

// get a site for a specific user
router.route("/sites").get(protect, getSites);
// create a site
router.route("/sites/create").post(protect, CreateSite)

// get all sites // this is for admin
router.route("/sites/all").get(protect, checkAdmin, getAllSites)


module.exports = router;