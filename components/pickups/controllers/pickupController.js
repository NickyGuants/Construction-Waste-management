const Site = require('../../sites/models/sites')


const User = require('../../users/models/users')

const Pickup = require('../models/pickups')

const asyncHandler = require('express-async-handler')


// route to create a pickup for a site
const createPickup = asyncHandler(async(req, res) => {
    try {

        const { sitename, userEmail, date } = req.body;

        if (!sitename || !userEmail) {
            res.status(400)
            throw new Error("Please fill all pickup details.")
        } else {
            const pickup = await Pickup.create({
                sitename: sitename,
                userEmail: userEmail,
                date: date
            })


            if (pickup) {
                res.status(201).json({
                    message: "Success, your pickup has been created",
                    pickup: {
                        _id: pickup._id,
                        sitename: pickup.sitename,
                        userEmail: pickup.userEmail,
                        date: await JSON.stringify(pickup.date),
                        collected: pickup.collected,
                        details: pickup.details,
                        weight: pickup.weight,
                        cost: pickup.cost
                    }
                })

            } else {
                res.status(400);
                throw new Error("error occurred, pickup request not created ");
            }


        }

    } catch (error) {
        res.status(400);
        throw new Error(error);
    }

});

// route to get all pickup requests for admin
const getAllPickups = asyncHandler(async(req, res, next) => {
    const allPickups = await Pickup.find({});

    if (allPickups) {
        res.status(201).json({
            message: "All pickups retrieved for admin",
            pickups: allPickups,
        });
    }
    next();
})

// route to get all pickups for a given user
// we will pass userEmail on the body
const getUserPickups = asyncHandler(async(req, res, next) => {

    try {
        const { userEmail } = req.body
        console.log(userEmail)

        if (!userEmail) {
            res.status(400).json({
                message: "cannot get specific users pickups. Please specify userEmail"
            })
            return
        } else {
            const getPickups = await Pickup.find({
                userEmail: userEmail
            })
            const newPickups = getPickups.map(p => ({
                sitename: p.sitename,
                userEmail: p.userEmail,
                details: p.details,
                cost: p.cost,
                weight: p.weight,
                collected: p.collected,
                date: p.date,
                _id: p._id

            }))

            res.status(201).json({
                message: "Successfully gotten the specified user pickups ",
                pickup: {
                    pickups: newPickups
                }
            })
        }

    } catch (error) {
        res.status(400).json({
            error: error + "could not get the specific users pickups",
        });
        throw new Error(error);
    }



})

// conteroller for admin to update the field of the pickup to reflect changes afer sorting

const updateUserPickups = asyncHandler(async(req, res, next) => {
    // each pickup will have its unique id
    try {

        const { cost, weight, details, collected } = req.body

        const id = req.params.id; // specific pickup id
        if (!id) {
            res.status(400);
            throw new Error("Please provide specific Pickup id");
            return;
        }


        const findPickup = await Pickup.findById(id);
        if (findPickup) {
            findPickup.sitename = req.body.sitename || findPickup.sitename
            findPickup.details = req.body.details || findPickup.details
            findPickup.cost = req.body.cost || findPickup.cost
            findPickup.weight = req.body.weight || findPickup.weight
            findPickup.collected = req.body.collected || findPickup.collected
            findPickup.date = req.body.date || findPickup.date
            findPickup.userEmail = req.body.userEmail || findPickup.userEmail


            const updatedPickup = await findPickup.save()

            res.status(201).json({
                success: `specific PICKUP ${id}  updated successfully`,
                pickup: updatedPickup,
            });

        } else {
            res.status(400).json({
                error: "Specific pickup not found, invalid ID",
            });
        }
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
})

module.exports = { createPickup, getAllPickups, getUserPickups, updateUserPickups }