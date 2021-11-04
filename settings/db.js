const mysql = require('mysql')

const connection = mysql.createConnection({
   host: 'localhost',
   
   port: 3600,
   user: 'root',
   database: 'rest',
   password: 'root',
})

connection.connect((error) => {
      if (error) {
         return console.log('Ошибка подключения к БД!');
      } else {
         return console.log('Подключение успешно!');
      }
   })

module.exports = connection
