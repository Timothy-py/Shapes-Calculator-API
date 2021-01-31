const jwt = require('jsonwebtoken');
require('dotenv').config();


// function for generatiing jwt
function jwtGenerator(userId) {
    const payload = {
        user: userId
    };
    
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '1hr'});
}

module.exports = jwtGenerator;