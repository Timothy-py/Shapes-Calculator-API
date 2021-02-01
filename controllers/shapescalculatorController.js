const models = require("../models");
const {body, validationResult} = require('express-validator');


// a function to set the appropriate limit and offset from 'page' and 'size' retrieved as query parameters
const getPagination = (page, size) =>{
    const limit = size ? +size : 3;     // set default data limit to 3 if not provided
    const offset = page ? page * limit : 0;  //set default offset to 0 if not provided

    return {limit, offset};
}

// a function to map paginated api response to a desired structure
const getPagingData = (data, page, limit) => {
    const {count: totalItems, rows: calculations} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {totalItems, calculations, totalPages, currentPage};
}


// get all calculations belonging to the current logged in user
exports.myCalculations = async (req, res) => {

    const {page, size} = req.query;

    const {limit, offset} = getPagination(page, size);

    await models.Shape.findAndCountAll({
        where:{UserId: req.user},
        limit: limit,
        offset: offset
    })
        .then(calculations => {
            res.status(200).json({
                message: "All your calculations retrieved successfully",
                status: true,
                data: getPagingData(calculations, page, limit)
            })
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Some error occured while retrieving your calculations."
            });
        });
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
                triangle(req, res, dimensions);
                break;
            case "circle":
                circle(req, res, dimensions);
                break;
        }

        if(req.create == "Create"){
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
                        shape: newshape.name,
                        dimension: newshape.dimensions,
                        area: newshape.area
                    }
                })
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    message: error.message || "Unable to perform calculaton",
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
            message: "Provide shape dimension: [side]",
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
            message: "Provide shape dimensions: [length, breadth]",
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
    if((dimensions.length_a)===undefined || (dimensions.length_b)===undefined || (dimensions.length_c)===undefined){
        req.create = "DoNotCreate"
        res.status(422).json({
            message: "Provide shape dimensions: [length_a, length_b, length_c]",
            status: false
        })   
    }else{
        let s = (dimensions.length_a + dimensions.length_b + dimensions.length_c)/2
        let area = Math.sqrt(s*(s-dimensions.length_a)*(s-dimensions.length_b)*(s-dimensions.length_c))
        req.area = parseFloat(area.toFixed(2))
        req.create = "Create"
    }
}

// rectangle calculator function
function circle(req, res, dimensions){
    if((dimensions.radius)===undefined){
        req.create = "DoNotCreate"
        res.status(422).json({
            message: "Provide shape dimension: [radius]",
            status: false
        })   
    }else{
        let area = Math.PI * (dimensions.radius**2)
        req.area = parseFloat(area.toFixed(2))
        req.create = "Create"
    }   
}

