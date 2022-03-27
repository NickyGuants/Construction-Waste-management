const mongoose = require('mongoose')

const WasteSchema = mongoose.Schema({

    site: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Site"
    },
    count: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Cement', 'Plastic', 'Metal'],

    },
    collected: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Waste", WasteSchema)