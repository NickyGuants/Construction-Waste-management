const asyncHandler = require('express-async-handler');
const generateToken = require('../../../utils/generateToken');

const User = require('../models/users')


const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password, pic } = req.body;


    const userExists = await User.findOne({ email: email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        username,
        email,
        password,
        pic
    })

    if (user) {
        res.status(200).json({
            message: "Success, new user Created",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token: generateToken(user._id)

            }
        })
    } else {
        res.status(400);
        throw new Error('error occurred, user not created')
    }
    res.json({
        username,
        email,
    });
});

const authUser = asyncHandler(async(req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password, Retry");
    }

});

const updateUserProfile = asyncHandler(async(req, res) => {

    // get user by id then update it
    //const { _id, username } = await req.body

    //console.log(_id)
    const user = await User.findById(req.user._id)
        // const user = await User.findById({
        //     _id,

    // })


    if (user) {

        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.pic = req.body.pic || user.pic
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            pic: updatedUser.pic,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404)
        throw new Error("User not found")
    }

})


module.exports = { registerUser, authUser, updateUserProfile }