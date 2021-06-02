const mysql = require('mysql')

<<<<<<< HEAD
/*exports.pool = mysql.createPool({
    "user": "root",
    "password": "QWE!@#45",
    "database": "ecommerce",
    "host": "localhost",
=======
exports.pool = mysql.createPool({
    "user": "b676a72193f87a",
    "password": "0e0f262d",
    "database": "heroku_b0aeee382a2b27a",
    "host": "us-cdbr-east-04.cleardb.com",
>>>>>>> cb0a0a7dba6e754cbd9bc1b258203e31e6fb13f0
    "port": 3306,
});*/

<<<<<<< HEAD
exports.pool = mysql.createPool({
=======
/*exports.pool = mysql.createPool({
>>>>>>> cb0a0a7dba6e754cbd9bc1b258203e31e6fb13f0
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
})