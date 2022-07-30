const jwt = require('jsonwebtoken');

const generateAccessToken = (userDetails) => {
    return jwt.sign(userDetails,process.env.TOKEN_SECRET,{expiresIn: '1d'});
}

module.exports = generateAccessToken;