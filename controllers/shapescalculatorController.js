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
        switch(shape){
            case "square":
                square(req, res, dimensions);
                break;
            case "rectangle":
                rectangle(req, res, dimensions);
                break;
            case "triangle":
                rectangle(req, res, dimensions);
            case "circle":
                circle(req, dimensions);
                break;
        }

        if(req.create == "Create"){
            // log shape calculated info into the DB
            await models.Shape.create({
                shape: shape,
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
                console.log(error)
                res.status(400).json({
                    message: "Unable to perform calculaton",
                    status: false
                })
            })
        }
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
function square(req, res, dimensions){
    if((dimensions.side) === undefined){
        req.create = "DoNotCreate"
        res.status(422).json({
            message: "side is not provided",
            status: false
        })
    }else{
        let area = (dimensions.side)**2
        req.area = parseFloat(area.toFixed(2))
        req.create = "Create"
    }
    
}

// rectangle calculator function
function rectangle(req, res, dimensions){
    if((dimensions.length)===undefined || (dimensions.breadth)===undefined){
        req.create = "DoNotCreate"
        res.status(422).json({
            message: "length or breadth is not provided",
            status: false
        })   
    }else{
        let area = (dimensions.length) * (dimensions.breadth)
        req.area = parseFloat(area.toFixed(2))
        req.create = "Create"
    }
}

// triangle calculator function
function triangle(req, res, dimensions){
    
}

// rectangle calculator function
function circle(req, shape, dimensions){
    
}