
var childProcessexec = require('child_process').exec;
var childProcessexecFile = require('child_process').execFile;

/***
 * 在命令台上执行对应的命令
 * @param cmd 需要执行的命令
 * @param option 对应的配置选项
 * @returns {Promise<unknown>}
 */
function ordercmd(cmd,option){
    return new Promise((resolve,reject)=>{
        let  cmd = 'node index.js';
        let  options = {
            cwd:"F:\\桌面信息\\测试的地方\\xudd",//配置对应的文件的位置
            encoding:"utf-8",//对应的编码
        }
        childProcessexec(cmd,options, (error, stdout, stderr)=> {
            if(error){
                //命令是错误的
                throw  error;
                return 0
            }
            resolve(stdout);
        })
    })
}

/***
 * 执行文件的命令操作
 * @param filePath  对应的文件
 * @param args  对应配置参数
 * @param options  配置选项
 * @returns {Promise<unknown>} 返回的对应的执行结果
 */
function  orderFile(filePath,args,options){
    return new Promise((resolve,reject)=>{
        let  filepath = "node"; //对应的文件路劲或者执行的命令    String
        let  args = ["-v"];//对应的配置参数     String []
        //配置选项      Object
        let  options = {
            cwd: "",//子进程的当前的目录
            encoding:"utf-8",//对应的编码
        };
        childProcessexecFile(filepath,args,options,(error, stdout, stderr)=>{
            if (error) return 0;
            resolve(stdout);
        })
    })
}

module.exports = {
    ordercmd,
    orderFile
}