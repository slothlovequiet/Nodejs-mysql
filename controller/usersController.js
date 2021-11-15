'use strict';
const bcrypt = require('bcryptjs')

const response = require('../response')
const db = require('../settings/db')

exports.getAllUsers = (req, res) => {

   db.query('SELECT `id`, `name`, `second_name`, `email` FROM `users`', (error, rows, fields) => {
      if(error) {
         response.status(400, error, res);
      } else {
         response.status(200, rows, res)
      }
   })
  
}

exports.signup = (req, res) => {

   db.query("SELECT `id`, `email`, `name` FROM `users` WHERE `email` = '" + req.body.email + "'", (error, rows, fields) => {
      if(error) {
         response.status(400, error, res)
      } else if(typeof rows !== `undefined` && rows.length > 0) {
         console.log(rows);
         const row = JSON.parse(JSON.stringify(rows))
         row.map(rw => {
            response.status(418, {message: `Пользователь с таким email - ${rw.email} уже зарегистрирован`}, res)
            return true
         })
         
      } else {
         const email = req.body.email
         const name = req.body.name
         const secondName = req.body.second_name !== '' ? req.body.second_name : 'Не указано'
         
         const salt = bcrypt.genSaltSync(15)
         const password = bcrypt.hashSync(req.body.password, salt)

         const sql = ("INSERT INTO `users`(`name`, `second_name`, `email`, `password`) VALUES('" + name + "', '" + secondName + "', '" + email + "', '" + password + "')");
         db.query(sql, (error, result) => {
         if(error) {
            response.status(400, error, res)
         } else {
            response.status(200, {message: `Регистрация прошла успешно`, result}, res)
         }
      })
         //response.status(200, `Registration`, res)
      }
   })

 // const sql = "INSERT INTO `users`(`name`, `second_name`, `email`) VALUES('" + req.query.name + "', '" + req.query.second_name + "', '" + req.query.email + "')";
 // db.query(sql, (err, result) => {
 //    if(err) {
 //       console.log(error);
 //    } else {
 //       response.status(result, res)
 //    }
 // })
 // //console.log(req.query);
}