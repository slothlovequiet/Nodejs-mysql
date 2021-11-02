const mysql = require('mysql')

const connection = mysql.createConnection({
   host: 'localhost',
   port: '8888',
   user: 'root',
   password: 'root',
   database: 'rest',
})

connection.connect((error) => {
   if(error) {
      return console.log('Ошибка подключения к БД!');
   } else {
      return console.log('Подключение успешно!');
   }
})

module.exports = connection
