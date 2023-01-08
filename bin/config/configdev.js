/***
 * 这个的配置文件主要的对全局的域名以及mysql配置
 * @type {{}}
 */

const Httpserve = {
        post: 3000,
        myHttps_domain: "http://127.0.0.1:3000",
        mysql: {
                host: '1.12.236.199',
                user: 'csmbs',
                password: 'i3zNLCGT2hmDr4Gf',
                port: '3306',
                database: 'csmbs', //数据库名字
        },
        aliyun: {
                //阿里云发送短信的
                sendnote: {
                        accessKeyId: "LTAI5tFhmeo6SpsGvYeCr2QF",// 阿里云用户的标识id
                        accessKeySecret: "pOZXvsfcsJJX6MIu7py19xvTx8MX12", // 阿里云用户的连接秘钥
                        paramsone: {
                                SignName: "yqinyuantop",
                                TemplateCode: "SMS_236560819"
                        }
                },
        }
}


module.exports = Httpserve