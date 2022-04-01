const express = require("express");
const {
    getSites,
    CreateSite,
    getAllSites,
    updateSite,
    deleteSite,
    getEverySite,
    getSpecificSite
} = require("../controllers/siteController");
const { protect, checkAdmin } = require("../../users/middlewares/authMiddleware");

const router = express.Router();

// get a site for a specific user
router.route("/sites").get(protect, getSites);
// create a site
router.route("/sites/create").post(protect, CreateSite)

// get all sites // this is for admin
router.route("/sites/all").get(protect, checkAdmin, getAllSites)

// route to get all sites, just for test ***
router.route('/sites/every').get(getEverySite)

// route to get specific site
router.route('/sites/:id').get(getSpecificSite)

// route to update a users specific site details
//router.route("/sites/edit/:id").post(protect, updateSite)
router.route("/sites/edit/:id").post(updateSite);

// route to delete a users specific site details
// router.route("/sites/delete").post(protect, deleteSite)
// // route to delete a users specific site details
router.route("/sites/delete/:id").post(deleteSite)


module.exports = router;