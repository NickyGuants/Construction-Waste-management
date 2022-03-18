const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    pic: {
        type: String,
        //required: true,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
}, { timestamps: true });

UserSchema.pre('save', async function(next) {

    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

//function to decrpt password after being saved
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model('User', UserSchema)