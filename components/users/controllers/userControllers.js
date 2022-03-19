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

} );

const getUsers = asyncHandler( async ( req, res ) =>
{
    const users = await User.find();

    if ( users.length > 0 ) {
        res.status( 200 ).json( {
            users,
            result: users.length
        })
    } else {
        res.status( 400 ).send( {
            message: "No users registered in the database yet"
        })
    }
} )

const getSingleUser = asyncHandler( async ( req, res ) =>
{
    const user = await User.findById( req.params.id );

    if ( user ) {
        res.status( 200 ).json( {
            data: user
        })
    } else {
        res.status( 400 ).send( {
            message: "No user with that id exists."
        })
    }
})

module.exports = { registerUser, authUser, getUsers, getSingleUser }