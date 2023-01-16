
const fs = require('fs');



/**
 * 读取文件的操作
 * 目的就是读取404这个html的内容主要是让他没有那个路由的时候显示出来
 * 传入的参数是    path   文件的路径   type  String
 */
function readnomodel(path) {
    var readStream = fs.createReadStream(path)
    var count = 0;
    var str = '';
    return new Promise((reject,resove)=>{
    readStream.on('data', (data) => {
        str += data;
        count++;
    })
    readStream.on('end', () => {
        reject(str);
    })
    readStream.on('error', (err) => {
        res.send("内部错误！");
    })
})
}
module.exports = {readnomodel};
