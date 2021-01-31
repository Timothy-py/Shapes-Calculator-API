// require app dependencies
const express = require('express'); 
require('dotenv').config();

// setup express server
const app = express();
const port = process.env.PORT || 7000;

// enable access to req.body
app.use(express.json());

// require app routes
const shapes_calculator = require('./routes/api')

// specify root url path for app
app.use('/api/shapescalculator', shapes_calculator)


// configure app PORT
app.listen(port, ()=>{
    console.log(`Server is running on PORT: ${port}`);
})


module.exports = app;

