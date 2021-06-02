const mysql = require('mysql')

/*exports.pool = mysql.createPool({
    "user": "root",
    "password": "QWE!@#45",
    "database": "ecommerce",
    "host": "localhost",
    "port": 3306,
});*/

exports.pool = mysql.createPool({
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
})