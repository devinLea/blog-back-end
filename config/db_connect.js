const config = require("./db_config")
const mysql = require("mysql")

let pool = mysql.createPool(config.dev);

let query = (sql, calback) => {
    return Promise((resolve,reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log("数据库连接失败")
                reject(err, null, null)
            } else {
                connection.query(sql, (qerr, rows, fields) => {
                    console.log("数据库连接成功")
                    connection.release()
                    reject(qerr, rows, fields)
                })
            }
    
        })
    })
}

module.exports = query;