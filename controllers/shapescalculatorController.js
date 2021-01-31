const models = require("../models");
const {body, validationResult} = require('express-validator');

// get all calculations belonging to the current logged in user
exports.myCalculations = (req, res) => {
    res.status(200).json({
        message: "Get User Info successfully",
        user: req.user
    })
}

// calculator
exports.calculator = [
    // execute validator function
    validator(),

    async(req, res) => {
        // check for validations
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({
                errors: errors.array()
            })
        }

        // destructure req.body
        const shape = req.body.shape
        const dimensions =req.body.dimensions

        // execute different function based on the shape passed
        var area = ''
        switch(shape){
            case "square":
                square(req, dimensions);
                break;
            case "rectangle":
                rectangle(req, dimensions);
                break;
            case "triangle":
                rectangle(req, dimensions);
            case "circle":
                circle(req, dimensions);
                break;
        }

        // log shape calculated info into the DB
        await models.Shape.create({
            name: shape,
            dimensions: dimensions,
            area: req.area,
            UserId: req.user
        })
        .then((newshape) => {
            res.status(200).json({
                message: "Area successfully calculated",
                status: true,
                data: {
                    name: newshape.name,
                    dimension: newshape.dimensions,
                    area: newshape.area
                }
            })
        })
        .catch((error) => {
            res.status(400).json({
                message: "Unable to perform calculaton",
                status: false
            })
        })
    }

]

// validator function to validate request body object
function validator(){
    return[
        body('shape')
        .notEmpty().withMessage("shape cannot be empty")
        .isIn(["square", "rectangle", "triangle", "circle"]).withMessage("Invalid shape! Accepted shapes [square, rectangle, triangle, circle]"),

        body('dimensions')
        // .isJSON().withMessage("dimension must be a valid JSON obj")
        .notEmpty().withMessage("dimension cannot be empty")
    ]
}

// square calculator function
function square(req, dimensions){
    let area = (dimensions.side)**2
    req.area = area
    return area;
}

// rectangle calculator function
function rectangle(req, shape, dimensions){
    
}

// triangle calculator function
function triangle(req, shape, dimensions){
    
}

// rectangle calculator function
function circle(req, shape, dimensions){
    
}