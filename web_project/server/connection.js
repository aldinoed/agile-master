// connection.js
require('dotenv').config();
const mysql = require("mysql");

// Buat pool koneksi database
const pool = mysql.createPool({
      connectionLimit: 10, // Sesuaikan dengan kebutuhan Anda
      // host: 'zayratshop.com',
      // user: 'u517506439_goshipAdmin',
      // password: 'Goshipb2',
      //   host: 'localhost',
      //   user: 'root',
      //   password: '',
      host: 'zayratshop.com',
      user: 'u517506439_goshipAdmin',
      password: 'Goshipb2',
      // host: 'localhost',
      // user: 'aldino',
      // password: 'angga225',
      database: 'u517506439_goship'
});

// Buat fungsi untuk menjalankan query
const executeQuery = (sql, values) => {
      return new Promise((resolve, reject) => {
            pool.query(sql, values, (error, results, fields) => {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(results);
                  }
            });
      });
};

module.exports = executeQuery;