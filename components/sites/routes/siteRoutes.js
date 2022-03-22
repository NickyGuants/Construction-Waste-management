const express = require("express");
const {
    getSites,
    CreateSite,
    getAllSites
} = require("../controllers/siteController");
const { protect, checkAdmin } = require("../../users/middlewares/authMiddleware");

const router = express.Router();

// get a site for a specific user
router.route("/").get(protect, getSites);
// create a site
router.route("/create").post(protect, CreateSite)

// get all sites // this is for admin
router.route("/all").get(protect, checkAdmin, getAllSites)


module.exports = router;