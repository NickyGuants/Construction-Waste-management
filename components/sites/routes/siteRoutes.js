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
router.route("/").get(protect, getSites);
// create a site
router.route("/create").post(protect, CreateSite)

// get all sites // this is for admin
router.route("/all").get(protect, checkAdmin, getAllSites)

// route to get all sites, just for test ***
router.route('/every').get(getEverySite)

// route to get specific site
router.route('/:id').get(getSpecificSite)

// route to update a users specific site details
//router.route("/sites/edit/:id").post(protect, updateSite)
router.route("/edit/:id").post(updateSite);

// route to delete a users specific site details
// router.route("/sites/delete").post(protect, deleteSite)
// // route to delete a users specific site details
router.route("/delete/:id").post(deleteSite)


module.exports = router;