const Site = require('../../sites/models/sites')

const asyncHandler = require('express-async-handler')

// @desc Get logged in user sites
// @route GET /user/sites
// @accesss Private
const getSites = asyncHandler(async(req, res) => {
    const sites = await Site.find({
        user: req.user._id
    })
    res.json(sites)
})


const CreateSite = asyncHandler(async(req, res) => {
    const { sitename, desc, lat, long } = req.body

    if (!sitename || !lat || !long) {
        res.status(400)
        throw new Error("Please fill in all fields")
        return
    } else {
        const site = new Site({
            user: req.user._id,
            sitename,
            lat,
            long,
            desc
        })

        const createdSite = await site.save()

        res.status(201).json({
            message: "Succes, site created",
            createdSite
        })
    }
})

const getAllSites = asyncHandler(async(req, res, next) => {

    const sites = await Site.find({})
    if (sites) {
        res.status(201).json({
            message: "Succes, All sites retrieved",
            sites: sites,
        });
    }

})

module.exports = { getSites, CreateSite, getAllSites }