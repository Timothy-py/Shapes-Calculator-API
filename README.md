# Shapes-Calculator-API

Shapes Calculator API for calculating the area of shapes - Square, Rectangle, Triangle Circle

## Main API Functionalites

- User Register/Signup
- User Login
- User Perform Calculations
- User View all her Calculatons

## Tech Stack

- Javascript(Node.js)
- Express.js
- Postgres DB
- Sequelize ORM
- Token Authentication - jsonwebtoken

## How to Setup

Follow the under-listed procedures to setup locally and to test this project on your local machine.

\* **Clone the project files into a directory on your local machine**  
`git clone https://github.com/Timothy-py/Shapes-Calculator-API.git`

\* **Install the dependencies**  
`npm install`  
\* **Install PostgreSQL on your local machine**  
If you don't have postgres installed already on your machine, search online on how to install and setup PostgreSQL for your OS and also install psql(cli for postgres)

- After the installations is successful, create a database for this app e.g shapes_calculatordb.
- In this project directory, go to config/config.json file and change 'username', 'password', 'database' variables to what you used to setup your database.

## Start the Server

- Open a console in the project directory and run
  `node server.js`  
  if everyting goes well, you must see a console log that states - _Server is running on PORT: 7000_

## Testing the Routes

Open your Postman or any other api testing tool and check out the following routes

- Signup - POST http://localhost:7000/api/shapescalculator/signup

* Login - POST http://localhost:7000/api/shapescalculator/login
* Calculator - POST http://localhost:7000/api/shapescalculator/calculator
* View My Calculations - GET http://localhost:7000/api/shapescalculator/mycalculations

## API Documentation

The API was documented using Postman  
URL - https://www.getpostman.com/collections/6b831dc7b936ba17cfa5

## API AUTOMATED TESTING Documentation

The Automated Testing for the API was done using Postman  
URL - https://www.postman.com/collections/fc283b1715981bdf7bc3

## Heroku URL

The API was deployed on Heroku  
URL - https://shapescalculator.herokuapp.com/

###### _contact me @ adeyeyetimothy33@gmail.com_
