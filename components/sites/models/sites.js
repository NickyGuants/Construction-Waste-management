const mongoose = require('mongoose')

const SiteSchema = mongoose.Schema({
    sitename: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    desc: {
        type: String,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Site", SiteSchema);