const asyncHandler = require('express-async-handler');
const generateToken = require('../../../utils/generateToken');


const Waste = require('../../wastes/models/wastes')


// @desc route to create a waste
const CreateWaste = asyncHandler(async(req, res, next) => {
        const { count, type, collected, amount } = req.body

        if (!count || !type) {
            res.status(400);
            throw new Error("Please fill in all fields to create site");
            return;
        } else {
            const waste = new Waste({
                site: req.site._id,
                count: count,
                type: type,
                // collected: collected,
                amount: 0

            })
            const createdWaste = await waste.save()
            if (waste) {
                res.status(201).json({
                    message: "Succes, waste created",
                    createdWaste: {
                        count: waste.count,
                        type: waste.type,
                        collected: waste.collected,
                        amount: waste.amount,
                        token: generateToken(waste._id)
                    }
                });
            } else {

                res.status(400);
                throw new Error('error occurred, waste not created ')


            }

        }
    })
    // get all wastes for a specific site
    //private
const getWastes = asyncHandler(async(req, res) => {
    const wastes = await Waste.find({
        // site: req.site._id
        site: req.site._id,
    });
    //console.log(wastes)
    const displayWastes = wastes.map(v => ({
        count: v.count,
        type: v.type,
        collected: v.collected,
        _id: v._id,
        amount: v.amount,
        token: generateToken(v._id)

    }))
    res.status(201).json({
        message: "Specific waste for the given site found",
        waste: {
            // count: wastes.count,
            // type: wastes.type,
            // token: generateToken(wastes._id),
            waste: displayWastes,

        }
    })
})

// controller to update a waste per site
const updateWastes = asyncHandler(async(req, res, next) => {
    const { count, type } = await req.body
    try {

        const filter = { site: req.waste._id };
        const id = req.waste._id
        const update = { count: count, type: type };

        const updated = await Waste.findByIdAndUpdate(id, update)


        res.status(201).json({
            success: "waste updated successfully",
            waste: updated,
        });
        next()



    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: "Specific waste not found" + error,
        });

    }






})


const deleteWaste = asyncHandler(async(req, res) => {
    try {
        if (req.waste._id) {
            await Waste.findByIdAndDelete(req.waste._id)

            res.status(201).json({
                message: "Waste successfully Deleted",
            });

        } else {
            res.status(400);
            throw new Error("Please provide waste id to delete the waste");
            return;

        }

    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
})


module.exports = { CreateWaste, getWastes, updateWastes, deleteWaste }