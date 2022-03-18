const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    //takes id from database and generates a token

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = generateToken