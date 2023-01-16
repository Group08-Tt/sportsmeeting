const fs = require('fs');
const request = require('request');
const path=require('path');
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
            reject("内部错误！");
        })
    })
}

/***
 *
 * @param path   是对应的文件的路径    type   ：   String
 * @param data   是对应的追加的内容    type   ：  String
 * @returns {Promise<number>}
 * success   return 1
 * catch     return 0
 */

function appendFilefun (path,data) {
    return new Promise((reject,resove)=>{
        fs.appendFile(path, data, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('创建成功');
        })
    }).then(()=>{
        //成功返回一个 1
        return 1;
    }).catch(()=>{
        //失败返回一个0
        return 0;
    })
}



/***
 * 功能是传入对应的网络地址 和对应的文件名称是啥 这里可以扩展到就是以后这种文件path的位置
 * @param fileurl 文件的网络地址  type ： String
 * @param filename  文件的名字  自动识别后缀   其实这里可能会有问题因为 有一些数据他没具体的这种后缀咋办
 * @returns {Promise<unknown>}
 */
const fsdonlund = function(fileurl,filename){
    return new Promise((resolve,reject)=>{
        console.log(path.extname('aa.txt')); //获取侯爱民的路径的那个.txt
        let filetype = path.extname(fileurl)
        let filename = filename + filetype; //自动获取对应的网络的文件的后缀
        let fileStream = fs.createWriteStream("./image/" + filename,{autoClose:true})
        request(fileurl).pipe(fileStream);
    })
}
/***
 * 功能是把某个数据写到对应的文件中
 * @param path   是对应的路径和包括文件名字
 * @param data   需要写入到这个对应path的内容是什么
 * @returns {Promise<unknown>} 返回的为true 那么就是成功  返回false就是失败
 */
const fswriteFiledonlo = function(path,data){
    return new Promise((resolve,reject)=>{
        fs.writeFile(path,data, 'binary', (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}




module.exports = {
    readnomodel,
    appendFilefun,
    fsdonlund,
    fswriteFiledonlo
};
