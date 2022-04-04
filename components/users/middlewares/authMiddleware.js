const jwt = require('jsonwebtoken')
const User = require('../models/users')
const Site = require('../../sites/models/sites')
const Waste = require('../../wastes/models/wastes')

const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async(req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = await req.headers.authorization.split(" ")[1];

            console.log("token is: " + token)

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");


            // const admin = req.user.isAdmin
            // console.log(admin)


            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, site token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

const protectSite = asyncHandler(async(req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = await req.headers.authorization.split(" ")[1];

            console.log("token is: " + token);

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.site = await Site.findById(decoded.id).select("-password");

            // const admin = req.user.isAdmin
            // console.log(admin)

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed.");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized to view wastes, since no token");
    }
});

const protectWaste = asyncHandler(async(req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = await req.headers.authorization.split(" ")[1];

            console.log("token is: " + token);

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.waste = await Waste.findById(decoded.id).select("-password");

            // const admin = req.user.isAdmin
            // console.log(admin)

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, waste token failed.");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized to view wastes, since no token");
    }
});
const checkAdmin = asyncHandler(async(req, res, next) => {

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            token = await req.headers.authorization.split(" ")[1];

            console.log("token in Check admin  is: " + token);

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decoded id is: " + decoded.id)
            const user = await User.findOne({
                isAdmin: true,
                _id: decoded.id
            });
            console.log("user is: " + user)
            if (!user) {
                throw new Error("You are NOT ADMIN, token failed");
            }
            next()
        } catch (error) {
            res.status(401);
            throw new Error("Not  authorized as ADMIN, token failed");
        }
    }

})

const checkUserEmail = asyncHandler(async(req, res, next) => {
    let userEmail;
    //let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            userEmail = await req.headers.authorization.split(" ")[1];

            console.log("My userEmail is: " + userEmail);

            //decodes token id
            //const decoded = jwt.verify(userEmail, process.env.JWT_SECRET);

            req.userEmail = await userEmail

            // const admin = req.user.isAdmin
            // console.log(admin)

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Error getting userEmail");
        }
    }

    if (!userEmail) {
        res.status(401);
        throw new Error("No email specified");
    }

})

module.exports = { protect, checkAdmin, protectSite, protectWaste, checkUserEmail }
