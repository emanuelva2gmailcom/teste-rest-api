const { query } = require('express')
const mysql = require('mysql')


exports.pool = mysql.createPool({
    "connectionLimit": 100,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
})

exports.execute = (query, params = []) => {
    return new Promise((resolve, reject) => {
        this.pool.query(query, params, (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}