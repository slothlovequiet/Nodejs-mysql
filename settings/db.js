const mysql = require('mysql')
const env = require('./../dbenv')

const connection = mysql.createConnection({
   host: env.HOST,
   port: env.PORT,
   user: env.USER,
   password: env.DBPASSWD,
   database: env.DBNAME,
})

connection.connect((error) => {
      if (error) {
         return console.log('Ошибка подключения к БД!');
      } else {
         return console.log('Подключение успешно!');
      }
   })

module.exports = connection
