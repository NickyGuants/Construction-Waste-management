const mongoose = require("mongoose");
const { options } = require("../routes/pickupRoutes");


const PickupSchema = mongoose.Schema({
    sitename: {
        type: String,
        //required: true,
    },
    userEmail: {
        type: String,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    weight: {
        type: Number,
        default: 0
    },
    details: {
        type: String
    },
    collected: {
        type: Boolean,
        default: false
    },
    cost: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,

})

PickupSchema.pre('save', function preSave(next) {
    var currentDate = this;

    currentDate.date = Date.now()
    next()

})

module.exports = mongoose.model("Pickup", PickupSchema)