const express = require("express");
const {
    getSites,
    CreateSite,
    getAllSites
} = require("../controllers/siteController");
const { protect, checkAdmin } = require("../../users/middlewares/authMiddleware");

const router = express.Router();

// create a site
router.route("/sites").get(protect, getSites);

router.route("/sites/create").post(protect, CreateSite)

router.route("/sites/all").get(protect, checkAdmin, getAllSites)


module.exports = router;