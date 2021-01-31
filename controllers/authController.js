const models = require("../models");
const bcrypt = require('bcrypt');

// Handle USER SignUP POST request
exports.signup = async(req, res, next) => {
    try {
        // 1. destructure the req.body (email, password)
        let {email, password} = req.body;
        
        // check if user exist in DB: if YES throw error ELSE continue
        let user = await models.User.findOne({
            where: {email: email}
        })
        // throw ERROR
        if(user){
            return res.status(401).send("User already exist");;
        }

        // Encrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const encryptedPassword = await bcrypt.hash(password, salt)

        // create new user
        await models.User.create({
            email: email,
            password: encryptedPassword
        })



    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};