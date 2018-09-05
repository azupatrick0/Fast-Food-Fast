[![Build Status](https://travis-ci.org/azupatrick0/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/azupatrick0/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/azupatrick0/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/azupatrick0/Fast-Food-Fast?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/43858cf4c54536e521f4/maintainability)](https://codeclimate.com/github/azupatrick0/Fast-Food-Fast/maintainability)
# Fast-Food-Fast
## Description
Fast-Food-Fast is a food delivery service app for a restaurant. Built for Andela Cycle 36 Developer Challenge.
## Required Features 
  * Users can create an account and log in 
  * A user should be able to order for food 
  * The admin should be able to add, edit or delete the fast-food items 
  * The admin should be able to see a list of fast-food items  
  * The admin user should be able to do the following:  
      * See a list of orders  
      * Accept and decline orders  
      * Mark orders as completed  
  * A user should be able to see a history of ordered food
## Technologies
  * HTML
  * CSS
  * Javascript
  * Node.js
  * Express
  * Mocha/Chai
  * Eslint
  * Babel
## Github Page
[Link](https://azupatrick0.github.io/Fast-Food-Fast/UI/index.html)
## Pivotal Tracker Page
[Link](https://www.pivotaltracker.com/n/projects/2193822)
## Heroku Page
[Link](https://fast-food-fast.herokuapp.com/api/v1)
## UI Template Pages
  * [/index](https://azupatrick0.github.io/Fast-Food-Fast/UI/index.html)   
  * [/signup](https://azupatrick0.github.io/Fast-Food-Fast/UI/signup.html)  
  * [/signin.html](https://azupatrick0.github.io/Fast-Food-Fast/UI/signin.html) 
  * [/dashboard.html](https://azupatrick0.github.io/Fast-Food-Fast/UI/dashboard.html) 
  * [/orders.html](https://azupatrick0.github.io/Fast-Food-Fast/UI/orders.html)  
  * [/admin.html](https://azupatrick0.github.io/Fast-Food-Fast/UI/admin.html)  
  * [/history.html](https://azupatrick0.github.io/Fast-Food-Fast/UI/history.html) 
## API Routes
* Get a list of orders

    ``` 
    GET /orders 
    ```
* Fetch a specific order

    ``` 
    GET /orders/<orderId>  
    ```
* Place a new order for food

    ``` 
    POST /orders  
    ```
* Update the order status

    ``` 
    PUT /orders/<orderId>   
    ```
## Installation
 * Ensure you have node 8.x.x installed.
 
 * Install node modules with the command
 
   * npm install
   
 * Start the API server with command
 
   * npm start
   
 * Check API index with Postman
 
   * http://localhost:3000/api/v1
   
 * Run test with
 
   * npm test
   
## Aknowledgement
 * Andela
 * Google
 * W3schools
 * Medium
 * Fileformat
 * Stackoverflow
 * httpstatuses
 ## Author
 * Azu Patrick
 ## License
 Project licensed under [MIT License](https://opensource.org/licenses/MIT)
