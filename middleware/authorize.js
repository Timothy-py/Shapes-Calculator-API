const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = async(req, res, next) => {
    try{
        // get the user token from request header
        const jwtToken = req.header("token");

        // if token is not provided: throw ERROR
        if(!jwtToken){
            return res.status(403).json({
                message: "Not Authorized",
                status: false
            });
        }

        // now verify the token provided
        const payload = jwt.payload(jwtToken, process.env.jwtSecret);

        // pass the user object to req.
        req.user = payload.user;
    }catch(error){
        console.error(error.message);
        return res.status(403).json({
            message: "Not Authorized",
            status: false
        });
    }
};