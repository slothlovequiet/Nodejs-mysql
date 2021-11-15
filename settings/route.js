'use strict'

module.exports = (app) => {
   const usersController = require('../controller/usersController')

   
   app
      .route('/api/users')
      .get(usersController.getAllUsers)
   app
      .route('/api/auth/signup')
      .post(usersController.signup)

   app
      .route('/api/auth/signin')
      .get(usersController.signin)
}