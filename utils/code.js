module.exports = {
    0:{
        code:0,
        msg:'success'
    },
    1001:{  
        code:1001,
        msg:'请求超时'
    },
    1002:{ 
        code:1002,
        msg:'暂无数据'
    },
    1003:{
        code:1003,
        msg:'登录超时'
    },
    1004:{
        code:1004,
        msg:'账号或密码错误'
    },
    1005:{
        code:1005,
        msg:'参数格式有误'
    },
    1006:{
        code:1006,
        msg:'查询失败'
    },
    1007:{
        code:1007,
        msg:'网络忙'
    },
    1008(option){
        let obj = {code,msg}
        obj.code = option.code;
        obj.msg = option.msg;
        return obj
    }
}