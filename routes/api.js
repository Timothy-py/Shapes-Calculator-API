const router = require('express').Router();

// import controllers
const authController = require('../controllers/authController');
const shapescalculatorController = require('../controllers/shapescalculatorController');

// import middleware
const authorizer = require('../middleware/authorize');


// AUTHENTICATON ROUTES
// signup/register route
router.post("/signup", authController.signup);
// login route
router.post("/login", authController.signin);


// SHAPES CALCULATOR ROUTES
router.get("/mycalculations", authorizer, shapescalculatorController.myCalculations);
router.post("/calculator", authorizer, shapescalculatorController.calculator);

module.exports = router;