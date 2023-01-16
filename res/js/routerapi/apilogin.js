const svgCaptcha = require('svg-captcha');
const {mysqld} = require("../mysql/mysqld");
const {axiosrequire} = require("../interserve/serve");
const {gettimetimestamp} = require('../time/util');
const md5 = require('md5');

/***
 * token 是对应的 验证签认的验证
 * token验证的话首先是查找你这个人
 * 1. 数据库里面去查找你这个人
 * 2.判断是否有这个数据 ， 如果有的话 就判断时间返回对应的true 或者false
 * @param token
 * @returns {Promise<void>}
 */

async function tokenTime(token) {
    let sql_selecttoken = `select * from wxuserinfo where mdpassword="${token}"`
    return await mysqld(sql_selecttoken).then((e) => {
        let datalistuser = JSON.parse(JSON.stringify(e))
        let timestamp = gettimetimestamp();
        if (datalistuser.length != 0 && (timestamp * 1 - 100800) * 1 < (datalistuser[0].timestamp) * 1) {
            return true;
        } else {
            return false;
        }
    })
}

/***
 *
 * 验证登录
 * @param userinfo 用户输入的信息
 * @returns {Promise<void>}
 */
async function findcommonpassword(userinfo) {
    let mysqlseleceuser = `select  * from commonuserinfo where email="${userinfo.mail}"`
    return await mysqld(mysqlseleceuser).then(async (e) => {
        let userdata = JSON.parse(JSON.stringify(e))
        let objuserdatare = {
            start: 0,
            msg: "",
            userdata: "",
        }
        if (userdata.length == 0) {
            objuserdatare.start = 0;
            objuserdatare.msg = "您还未注册账户";
            return objuserdatare;
        } else {
            let passwordmd5 = md5(userinfo.password); //加密了的密码
            let updatamysql = `UPDATE commonuserinfo SET passwordmd="${passwordmd5}" WHERE email="${userinfo.mail}"`
            return await mysqld(updatamysql).then((me) => {
                objuserdatare.start = 1;
                objuserdatare.msg = "更新成功";
                return objuserdatare;
            })
        }
    })
}

/***
 *
 * 验证登录
 * @param userinfo 用户输入的信息
 * @returns {Promise<void>}
 */
async function commonlogon(userinfo) {
    let passwordmd5 = md5(userinfo.password); //加密了的密码
    let mysqlseleceuser = `select  * from commonuserinfo where email="${userinfo.mail}"`
    return await mysqld(mysqlseleceuser).then((e) => {
        let userdata = JSON.parse(JSON.stringify(e))
        let objuserdatare = {
            start: 0,
            msg: "",
            userdata: "",
        }
        if (userdata.length == 0) {
            objuserdatare.start = -2;
            objuserdatare.msg = "账户不存在，请注册"
        } else if (passwordmd5 === userdata[0].passwordmd) {
            objuserdatare.start = 1;
            objuserdatare.msg = "登录成功";
            objuserdatare.userdata = userdata[0];
        } else if (userinfo.mail === userdata[0].email) {
            objuserdatare.start = 0;
            objuserdatare.msg = "密码错误";
        } else {
            objuserdatare.start = -1;
            objuserdatare.msg = "未知错误";
        }
        return objuserdatare
    })
}

/***
 * 普通的登录注册
 * @param userinfo 用户的信息  包括 用户的姓名  性别  邮箱名  密码
 * @returns {Promise<unknown>}
 */
async function commonregisterjs(userinfo) {
    let passwordmd5 = md5(userinfo.password); //加密的密码
    let token = md5(userinfo.email + userinfo.password);
    let timestamp = gettimetimestamp();//获取当前的时间戳的信息
    let avatarUrl = "/aver/avver.png"; //用户的头像
    let enlanguage = "zh"; //用户的语言，后期可以用于设置用户的显示语言格式
    let Invitationcode = ""; //注册的时候自己就有邀请码了
    let sqlinsert = `INSERT INTO commonuserinfo(token,email,passwordmd,nickName,avatarUrl,gender,enlanguage,timestamp,Invitationcode,studentid,college,iphonenumber)
        VALUES ("${token}","${userinfo.email}","${passwordmd5}","${userinfo.username}","${avatarUrl}","${userinfo.gender}","${enlanguage}","${timestamp}","${Invitationcode}",
        "${userinfo.studentid}" ,"${userinfo.college}" ,"${userinfo.iphonenumber}" )`
    return await mysqld(sqlinsert).then((e) => {
        let userobj = {
            token: token,
            email: userinfo.email,
            nickName: userinfo.username,
            avatarUrl: avatarUrl,
            gender: userinfo.gender,
            enlanguage: enlanguage,
        }
        if (e.affectedRows == 1) {
            return userobj
        }
    })
}
/***
 *  实现简单的登录的使用
 * @param url 是对应的获取openid的url
 * @param userinfo 是对应的信息
 * @returns {Promise<unknown>}
 *
 */
async function openidlogin(url, userinfo) {
    let opensiwx = await axiosrequire("GET", url).then((e) => {
        let datalist = e.data;
        return datalist
    })
    let timestamp = gettimetimestamp();
    let wxappid = userinfo.wxappid + userinfo.wxsecret + opensiwx.openid;
    let mdpassword = md5(wxappid)
    //这里的话就是说二次查询了，就是说验证token
    let sqlseleceuser = `select  * from wxuserinfo where wx_openid="${opensiwx.openid}"`
    let selecmysqluser = await mysqld(sqlseleceuser).then((e) => {
        return JSON.parse(JSON.stringify(e))
    })
    //let timeuser = selecmysqluser[0].timestamp
    //如果数据库没有这个人的时候才是创建的时候
    if (selecmysqluser.length == 0) {
        let sqlinsert = `INSERT INTO wxuserinfo(wx_avatarUrl,wx_gender,wx_language,wx_nickName,wx_session_key,wx_openid,mdpassword,timestamp,region)
     VALUES ("${userinfo.avatarUrl}","${userinfo.gender}","${userinfo.language}","${userinfo.nickName}","${opensiwx.session_key}","${opensiwx.openid}","${mdpassword}","${timestamp}","${userinfo.region}")  `
        return await mysqld(sqlinsert).then((e) => {
            let datareturnmysql = {
                avatarUrl: userinfo.avatarUrl,
                gender: userinfo.gender,
                language: userinfo.language,
                nickName: userinfo.nickName,
                openid: opensiwx.openid,
                mdpassword
            }
            if (e.affectedRows == 1) {
                return datareturnmysql
            }
        })
    } else {
        // timestamp 是对应的时间
        let updatatimestamp = `UPDATE wxuserinfo SET timestamp="${timestamp}"`
        return await mysqld(updatatimestamp).then((e) => {
            let datareturnmysql = {
                avatarUrl: userinfo.avatarUrl,
                gender: userinfo.gender,
                language: userinfo.language,
                nickName: userinfo.nickName,
                openid: opensiwx.openid,
                mdpassword
            }
            return datareturnmysql
        })
    }
}


async function wxlopgincode(url) {
    let opensiwx = await axiosrequire("GET", url).then((e) => {
        let datalist = e.data;
        return datalist
    })
    let sqlselect = `select * from wxuserinfo where wx_openid="${opensiwx.openid}"`
    return await mysqld(sqlselect).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        if (datalistsql.length != 0) {
            let obj = {
                timestamp: datalistsql[0].timestamp,
                mdpassword: datalistsql[0].mdpassword,
                wx_openid: datalistsql[0].wx_openid,
                wx_nickName: datalistsql[0].wx_nickName,
                wx_avatarUrl: datalistsql[0].wx_avatarUrl,
                wx_session_key: datalistsql[0].wx_session_key,
                wx_gender: datalistsql[0].wx_gender,
                wx_language: datalistsql[0].wx_language,
            }
            return obj
        } else {
            return ""
        }
    })
}

//------------------------------------------------------下面是登录各种的util接口-----------------------------------
async function passwordvoluntarilyfunc(token) {
    let sqlselect = `select * from commonuserinfo where token="${token}"`
    return await mysqld(sqlselect).then(e =>{
        let datalistsql = JSON.parse(JSON.stringify(e))
        let  obj = {
            start : 0,
            msg : "无法完成自动登录！",
            userinfo:{},
        }
        if (datalistsql.length){
            console.log(datalistsql,1)
            obj.start = 1;
            obj.msg = "自动登录成功！",
            obj.userinfo = datalistsql[0]
        }
        return obj
    })
}

async function accountloginverificationy() {
    return new Promise((resolve, reject) => {
        //创建一个对应svg图片信息
        let captcha = svgCaptcha.create({
            width: 100,
            size: 1,// 验证码长度
            ignoreChars: '0o1i', // 验证码字符中排除 0o1i
            noise: 0, // 干扰线条的数量
            color: true,
            height: 30,
            background: '#ffffff'
        });
        let obj = {
            randomcode: captcha.text.toLowerCase(),//对应的验证码的文字信息
            //对应的图片的编码信息
            imgsvg: String(captcha.data)
        }
        resolve(obj);
    })
}


module.exports = {
    openidlogin,
    wxlopgincode,
    tokenTime,
    accountloginverificationy,
    commonregisterjs,
    commonlogon,
    findcommonpassword,
    passwordvoluntarilyfunc
}
