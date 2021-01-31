const router = require('express').Router();

// import controllers
const authController = require('../controllers/authController');
const shapescalculatorController = require('../controllers/shapescalculatorController');


// AUTHENTICATON ROUTES
// signup/register route
router.post("/signup", authController.signup);

// login route
router.post("/login", authController.signin);


// SHAPES CALCULATOR ROUTES


module.exports = router;