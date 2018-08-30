const express = require("express");
const router = express.Router();
const md5 = require("md5");
const IS = require('is');
const query = require("../../config/db_connect");
const Utils = require("../../utils");
const Code = require("../../utils/code");

//测试接口
router.post("/ceshi", async (req, res, next) => {
  console.log("测试接口", req.body);
  const sql = `UPDATE CESHI SET name='${req.body.name}' WHERE age=88`;
  await query(sql, (err, rows, fields) => {
    if (err) {
      res.send({
        code: "400",
        msg: "数据插入失败"
      });
    } else {
      res.send({
        code: "200",
        msg: "数据插入成功"
      });
    }
  });
});
//添加新用户
router.post('/insert',async (req,res,next) => {
    console.log(req.body);
    let data = Utils.filter(req.body, ["userId", "passWord" ,'userName']);
    let {userId,passWord,userName} = data;
    let creatTime = Utils.creatTime(new Date(),'yyyy-MM-dd hh:mm:ss');
    let onlyId = Utils.onlyUnique();
    const sql=`INSERT INTO BLOG_BACK_USER(ID,USERID,USERNAME,PASSWORD,CREATTIME) VALUES('${onlyId}','${userId}','${userName}','${md5(passWord)}','${creatTime}')`;
    await query(sql,(err,rows,fields)=>{
        console.error(err)
        if(!IS.array.empty(rows)){
            res.send(Code[0]);
        }else{
            res.send(Code[1008]({
                code:1008,
                msg:'用户添加失败'
            }));
        }
    })
})
//用户登录
router.post("/login", async (req, res, next) => {
  let data = Utils.filter(req.body, ["userId", "passWord"]);
  let { userId, passWord } = data;
  const sql = `SELECT * FROM BLOG_BACK_USER WHERE USERID='${userId}' AND PASSWORD='${passWord}'`;
   await query(sql,(err, rows, fields)=>{
        console.log('why',err)
        if(!IS.array.empty(rows)){
            // generateToken
            let data = rows[0];
            let uid = data['USERID'];
            let token = Utils.generateToken({uid});
            let body = {
                ...Code[0],token:token
            }
            res.send(body);
        }else{
            res.send(Code[1004]);
            
        }
    })
});

module.exports = router;
