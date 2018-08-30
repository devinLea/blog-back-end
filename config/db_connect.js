const config = require("./db_config")
const mysql = require("mysql")

let pool = mysql.createPool(config.dev);

let query = (sql, callback) => {
    // return Promise((resolve,reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("数据库连接失败")
                callback(err, null, null)
            } else {
                connection.query(sql, (qerr, rows, fields) => {
                    console.log("数据库连接成功")
                    callback(qerr, rows, fields)
                    connection.end();
                    
                })
            }
    
        })
    // })
}

module.exports = query;