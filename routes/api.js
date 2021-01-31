const router = require('express').Router();

// import controllers
const authController = require('../controllers/authController');
const shapescalculatorController = require('../controllers/shapescalculatorController');


// AUTHENTICATON ROUTES
router.post("/signup", authController.signup);


// SHAPES CALCULATOR ROUTES


module.exports = router;