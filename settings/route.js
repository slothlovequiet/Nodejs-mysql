'use strict'

module.exports = (app) => {
   const usersController = require('../controller/usersController')

   
   app
      .route('/users')
      .get(usersController.getAllUsers)
   app
      .route('/users/signup')
      .post(usersController.signup)
}