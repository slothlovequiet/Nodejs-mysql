"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const response = require("../response");
const db = require("../settings/db");
const config = require("../config");
const passport = require("./../middleware/passport");

exports.getAllUsers = (req, res) => {
   db.query(
      "SELECT `id`, `name`, `second_name`, `email` FROM `users`",
      (error, rows, fields) => {
         if (error) {
            response.status(400, error, res);
         } else {
            response.status(200, rows, res);
         }
      }
   );
};

exports.signup = (req, res) => {
   db.query(
      "SELECT `id`, `email`, `name` FROM `users` WHERE `email` = '" +
         req.body.email +
         "'",
      (error, rows, fields) => {
         if (error) {
            response.status(400, error, res);
         } else if (typeof rows !== `undefined` && rows.length > 0) {
            const row = JSON.parse(JSON.stringify(rows));
            row.map((rw) => {
               response.status(
                  418,
                  {
                     message: `Пользователь с таким email - ${rw.email} уже зарегистрирован`,
                  },
                  res
               );
               return true;
            });
         } else {
            const email = req.body.email;
            const name = req.body.name;
            const secondName =
               req.body.second_name !== ""
                  ? req.body.second_name
                  : "Не указано";

            const salt = bcrypt.genSaltSync(15);
            const password = bcrypt.hashSync(req.body.password, salt);

            const sql =
               "INSERT INTO `users`(`name`, `second_name`, `email`, `password`) VALUES('" +
               name +
               "', '" +
               secondName +
               "', '" +
               email +
               "', '" +
               password +
               "')";
            db.query(sql, (error, result) => {
               if (error) {
                  response.status(400, error, res);
               } else {
                  response.status(
                     200,
                     {
                        message: `Регистрация прошла успешно`,
                        result,
                     },
                     res
                  );
               }
            });
         }
      }
   );
};

exports.signin = (req, res) => {
   db.query(
      "SELECT `id`, `email`, `password` FROM `users` WHERE `email` = '" +
         req.body.email +
         "'",
      (error, rows, fields) => {
         if (error) {
            response.status(400, error, res);
         } else if (rows.length <= 0) {
            response.status(
               401,
               `Пользователь с email - ${req.body.email} не найден`,
               res
            );
         } else {
            const row = JSON.parse(JSON.stringify(rows));
            row.map((rw) => {
               const password = bcrypt.compareSync(
                  req.body.password,
                  rw.password
               );
               if (password) {
                  //если true-пускаем пользователя и генерируем токен
                  const token = jwt.sign(
                     {
                        userId: rw.id,
                        email: rw.email,
                     },
                     config.jwt,
                     { expiresIn: 120 * 120 }
                  );
                  response.status(
                     200,
                     { token: `Bearer ${token}` },
                     res
                  );
               } else {
                  //Генерируем ошибку о неверном пароле
                  response.status(
                     401,
                     { message: `Неправильный пароль.` },
                     res
                  );
               }
               return true;
            });
         }
      }
   );
};
