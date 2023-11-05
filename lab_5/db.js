const mysql = require("mysql2");

const pool = mysql.createPool({
  user: "root",       // Ваше имя пользователя MySQL
  password: "root",   // Ваш пароль MySQL
  host: "localhost",  // Адрес вашего MySQL сервера
  port: 3306,         // Порт MySQL (по умолчанию 3306)
  database: "complex_lab",  // Имя вашей базы данных
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

module.exports = promisePool;
