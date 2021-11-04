'use strict'

module.exports = (app) => {
   const indexController = require('./../controller/indexController')
   const usersController = require('./../controller/userController')

   app.route('/').get(indexController.index);
   app.route('/users').get(usersController.users)
   app.route('/users/add').post(usersController.add);
}