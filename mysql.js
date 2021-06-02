const mysql = require('mysql')

exports.pool = mysql.createPool({
    "user": "b676a72193f87a",
    "password": "0e0f262d",
    "database": "heroku_b0aeee382a2b27a",
    "host": "us-cdbr-east-04.cleardb.com",
    "port": 3306,
});

/*exports.pool = mysql.createPool({
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
})*/