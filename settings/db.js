const mysql = require('mysql')
//const env = require('./../dbenv')

const connection = mysql.createConnection({
   host: 'localhost',
   port: 3306,
   user: 'root',
   password: 'root',
   database: 'rest2'
})

connection.connect((error) => {
      if (error) {
         return console.log('Ошибка подключения к БД!')
      } else {
         return console.log('Подключение успешно!')
      }
   })

module.exports = connection
