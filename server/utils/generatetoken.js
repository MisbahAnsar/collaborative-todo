const jwt = require('jsonwebtoken');

const generateToken = (userID) => {
    return jwt.sign({id: 'userId'}, process.env.SECRET, {
        expiresIn: '30d'
    })
}

module.exports = generateToken;