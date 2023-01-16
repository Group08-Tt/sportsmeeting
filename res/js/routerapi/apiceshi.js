const {mysqld} = require("../mysql/mysqld");
const {axiosrequire} = require("../interserve/serve");
const  {gettimetimestamp} = require('../time/util');
const md5 = require('md5');




async function smqceshi (url){
    let sqlinsert = `INSERT INTO wxuserinfo(wx_avatarUrl,wx_gender,wx_language,wx_nickName,wx_session_key,wx_openid,mdpassword,timestamp,region)
     VALUES ("${userinfo.avatarUrl}","${userinfo.gender}","${userinfo.language}","${userinfo.nickName}","${opensiwx.session_key}","${opensiwx.openid}","${mdpassword}","${timestamp}","${userinfo.region}")  `
    return  await mysqld(sqlselect).then((e)=>{
        let datalistsql =  JSON.parse(JSON.stringify(e))
            return datalistsql
    })
}




module.exports = {
    smqceshi
}
