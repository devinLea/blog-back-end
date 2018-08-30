const Code = require('./code');
const IS = require('is');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const dateTime = require('silly-datetime');
const uuid = require('node-uuid');

let utils = {
    //参数过滤
    filter(params, filterArr) { 
        if (IS.object(params) && IS.array(filterArr)) {
            let data = {};
            filterArr.forEach(e => {
                let val = params[e];
                if (!IS.undefined(val) && !IS.null(val) && !IS.empty(val) || IS.array.empty(val)) {
                    data[e] = val;
                }
            });
            return data;
        } else {
            return params;
        }
    },
    //创建时间
    creatTime(option){
        let time = dateTime.format(option.time,option.type);
        return time;
    },
    //唯一标识
    onlyUnique(){
        let unique = uuid.v1()+uuid.v4();
        return unique;
    },
    //创建token
    generateToken(data){
        let created = Math.floor(Date.now() / 1000);
        let cert = fs.readFileSync(path.join(__dirname, '../cert/private.pem'));
        let token = jwt.sign({
            data,
            exp: created + 3600 * 24
        }, cert, {algorithm: 'RS256'});
        return token;
    },
    //验证token
    verifyToken(token){
        let cert = fs.readFileSync(path.join(__dirname, '../cert/public.pem')),res = {};
        try{
            let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
            let {exp = 0} = result,current = Math.floor(Date.now()/1000);
            if(current <= exp){
                res = result.data || {};
            }
        }catch(e){
            return e
        }
        return res;
        
    }

}
module.exports = utils;