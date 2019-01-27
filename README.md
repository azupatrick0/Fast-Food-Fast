[![Build Status](https://travis-ci.org/azupatrick0/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/azupatrick0/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/azupatrick0/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/azupatrick0/Fast-Food-Fast?branch=develop)
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
## Pivotal Tracker Page 
[Link](https://www.pivotaltracker.com/n/projects/2193822)
## Pivotal Tracker Page React Redux
[Link](https://www.pivotaltracker.com/n/projects/2234035)
## Heroku API Page
[Link](https://fast-food-fast.herokuapp.com/api/v1)
## Heroku UI Page
[Link](https://fast-food-fast.herokuapp.com/index.html)
## Documentation
[Link](https://fastfoodfast10.docs.apiary.io)
## API Routes
* Register a user

    ``` 
    POST /auth/signup
    ```
* Login a user

    ``` 
    POST /auth/login 
    ```
* Get a list of orders

    ``` 
    GET /orders 
    ```
* Get the order history for a  particular user. 

    ``` 
    GET /users/<userId>/orders
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

* Get available menu

    ``` 
    GET /menu
    ```
    
* Add a meal option to the menu

    ``` 
    POST /menu
    ```
    
* Edit food items in the menu

    ``` 
    PUT /menu/<itemId>
    ```
    
* Delete food items from the menu

    ``` 
    DELETE /menu/items/<itemId>
    ```
    
* Get API documentation

    ``` 
    GET /docs
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
 * others ...
 ## Author
 * Azu Patrick
 ## License
 Project licensed under [MIT License](https://opensource.org/licenses/MIT)
