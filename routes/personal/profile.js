const express = require('express');
const query = require('../../config/db_connect');
const router = express.Router();


//测试接口
router.post('/ceshi',async(req,res,next)=>{
    console.log('测试接口',req.body);
    const sql = `UPDATE CESHI SET name='${req.body.name}' WHERE age=88`;
    query(sql,function(err, rows, fields){
        if (err) {
            res.send({
                code: "400",
                msg: "数据插入失败",
            })
        } else {
            res.send({
                code: "200",
                msg: "数据插入成功"
            })
        }
    })

})
router.post('/login',async(req,res,next) => {
    
})


module.exports = router;

