const Site = require('../models/sites')

const generateToken = require('../../../utils/generateToken')

const asyncHandler = require('express-async-handler')

// @desc Get logged in user sites
// @route GET /user/sites
// @accesss Private
const getSites = asyncHandler(async(req, res) => {
    const sites = await Site.find({
            user: req.user._id
        })
        //res.json(sites)

    //sites.push(generateToken(sites._id))

    const newSites = sites.map(v => ({
        sitename: v.sitename,
        desc: v.desc,
        lat: v.lat,
        long: v.long,
        token: generateToken(sites._id),
        user: v.user._id,
        _id: v._id
    }))


    res.status(201).json({
        message: "sites for the given user found",
        site: {
            // sitename: sites.sitename,
            // desc: sites.desc,
            // lat: sites.lat,
            // long: sites.long,
            // token: generateToken(sites._id),
            //sites: sites.forEach((site) => generateToken(sites._id)),
            sites: newSites



        },
    });
})

// route to get all sites without authentication // just for testing
const getEverySite = asyncHandler(async(req, res) => {
    const allsites = await Site.find({})

    res.status(201).json({
        message: "All sites obtained",
        site: {
            sites: allsites

        },
    });
})


const CreateSite = asyncHandler(async(req, res) => {
    const { sitename, desc, lat, long } = req.body

    if (!sitename || !lat || !long) {
        res.status(400)
        throw new Error("Please fill in all fields")
        return
    } else {
        const site = await Site.create({
            user: req.user._id,
            sitename,
            lat,
            long,
            desc,
        })

        //const createdSite = await site.save()
        if (site) {
            res.status(201).json({
                message: "Succes, site created",
                site: {
                    _id: site._id,
                    sitename: site.sitename,
                    lat: site.lat,
                    long: site.long,
                    desc: site.desc,
                    token: generateToken(site._id)
                },
            });

        } else {
            res.status(400);
            throw new Error("error occurred, site not created ");

        }

    }
})

// route to getAll sites by the admin
const getAllSites = asyncHandler(async(req, res, next) => {

    const sites = await Site.find({})

    if (sites) {
        res.status(201).json({
            message: "Succes, All sites retrieved",
            sites: sites,
        });
    }
    next()


})

const updateSite = asyncHandler(async(req, res, next) => {

    try {

        const { sitename, desc, long, lat } = req.body;

        const id = req.params.id;
        if (!id) {
            res.status(400);
            throw new Error("Please provide site id");
            return;
        }
        if ((!sitename, !desc, !long, !lat)) {
            res.status(400);
            throw new Error("Please provide all site details");
            return;
        }

        const findSite = await Site.findById(id);
        if (findSite) {
            // res.status(200).json({
            //     message: `Success, specific site for id: ${req.body.id} found`,
            //     site: findSite
            // })
            findSite.sitename = req.body.sitename || findSite.sitename;
            findSite.desc = req.body.desc || findSite.desc;
            findSite.long = long || findSite.long;
            findSite.lat = lat || findSite.lat;

            const updatedSite = await findSite.save();

            res.status(201).json({
                success: "site updated successfully",
                site: updatedSite,
            });
        } else {
            res.status(400).json({
                error: "Specific site not found",
            });
        }

    } catch (error) {
        res.status(400);
        throw new Error(error);
    }

})

const deleteSite = asyncHandler(async(req, res, next) => {
    try {
        const id = req.params.id

        if (!id) {
            res.status(400);
            throw new Error("Please provide site id to delete");
            return;
        }

        await Site.findByIdAndDelete(id);

        res.status(201).json({
            message: "Site successfully Deleted"
        })

    } catch (error) {
        res.status(400);
        throw new Error(error);
        // return;

    }

})

const getSpecificSite = asyncHandler(async(req, res, next) => {
    try {

        const specificSite = await Site.findById(req.params.id);

        if (specificSite) {
            res.status(201).json({
                message: "Specific site found",
                specificSite,
            });
        } else {
            res.status(400).json({
                message: "No site with that id found"
            })
        }

    } catch (error) {
        res.status(400).json({
            error: error + "could not get the specific site"
        });
        throw new Error(error);
        // return;
    }
})

module.exports = { getSites, CreateSite, getAllSites, updateSite, deleteSite, getEverySite, getSpecificSite }