/**
 * mysql的封装函数
 * 1.
 * @returns   参数是sql语句   传出参数是   读就是数组  那么存入那些就是状态
 *
 * 这个封装可以再加以优化，因为这个可以检查他的状态 然后写入到本地的文件地址
 * 内置函数的说明：
 *      对于错误信息的话那么他就会被收集起来    未测试
 */
const {appendFilefun} = require('../fs/fs');
const httpserve = require('../../../bin/config/configdev');
var mysql = require('mysql');
var fs = require('fs');
//传的参数  数据库的语句
async function mysqld(sql){
    var db = mysql.createConnection({
        host     : httpserve.mysql.host,
        user     : httpserve.mysql.user,
        password : httpserve.mysql.password,
        port: httpserve.mysql.port,
        database: httpserve.mysql.database //数据库名字
    });
    db.connect();
    return  new Promise((reject,resove)=>{
        db.query(sql,async function (err, result) {
            if(err){
                //如果错误的话可以把这个操作写入日志文件里面去的
                console.log('[SELECT ERROR] - ',err.message);
                await appendFilefun('./error/mysql.txt',err.message)

                return;
            }
            reject(result); //返回数据到promise
            db.end(); //结束数据库的连接
        });
    })
}

// async function mysqldlaianadmin(sql){
//     var db = mysql.createConnection({
    // host     : '106.52.139.13',
    // user     : 'root',
    // password : '98242647xU*',
    // port: '3306',
    // database: 'mybs' //数据库名字
//     });
//     db.connect();
//     return  new Promise((reject,resove)=>{
//         db.query(sql,async function (err, result) {
//             if(err){
//                 //如果错误的话可以把这个操作写入日志文件里面去的
//                 console.log('[SELECT ERROR] - ',err.message);
//                 await appendFilefun('./error/mysql.txt',err.message)
//                 return;
//             }
//             reject(result); //返回数据到promise
//             db.end(); //结束数据库的连接
//         });
//     })
// }

module.exports  = {
    mysqld
}