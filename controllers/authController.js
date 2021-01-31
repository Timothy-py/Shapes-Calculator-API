const models = require("../models");
const bcrypt = require('bcrypt');

// import utils
const jwtGenerator = require('../utils/jwtGenerator');

// Handle USER SignUP POST request
exports.signup = async(req, res) => {
    try {
        // destructure the req.body (email, password)
        let {email, password} = req.body;
        
        // check if user exist in DB: if YES throw error ELSE continue
        let user = await models.User.findOne({
            where: {email: email}
        })
        // throw ERROR
        if(user){
            return res.status(401).json({
                message: "User already exist",
                status: false
            });
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
            .then((user) => {
                res.status(201).json({
                    message: "User created successfully",
                    status: true,
                    data: {
                        email: user.email,
                        password: user.password
                    }
                })
            })
            .catch((error) => {
                res.status(400).json({
                    message: `There was an error creating the User: ${error}`,
                    status: false
                })
            })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};


// Handlu USER SIgn in POST Request
exports.signin = async(req, res) => {
    try {
        
        // destructure the req.body {email, password}
        const {email, password} = req.body;

        // check if user exist in the DB: if YES continue login ELSE throw Error
        let user = await models.User.findOne({
            where: {email: email}
        })
        // throw ERROR
        if(!user){
            return res.status(401).json({
                message: "Email or Password Incorrect",
                status: false
            });
        }

        // check if incoming password is same as password in DB
        const validPassword = await bcrypt.compare(password, user.password);

        // if incoming password is incorrect
        if(!validPassword){
            return res.status(401).json({
                message: "Email or Password Incorrect",
                status: false
            });
        }

        // since password is correct, give the user a JWT
        const token = jwtGenerator(user.id)

        res.status(200).json({
            message: `Logged in successfully as ${user.email}`,
            status: true,
            token: token
        })

    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};