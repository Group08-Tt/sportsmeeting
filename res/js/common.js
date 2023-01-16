const fs = require("fs");

const path = require('path');

const url = require("url");


getfile = function(extname) {
    //注意下面的路径是从app.js开始的不是这个文件开始的
    var data = fs.readFileSync('./res/js/mime.json');
    var mimeObj = JSON.parse(data.toString());
    return (mimeObj[extnamclse])
}
exports.static = function(req, res, staticPath) {
    console.log(req.url); //获取客户端的信息
    let pathname = url.parse(req.url).pathname;
    //默认加载的页面主要看前面的那个‘/’来确定的哈
    pathname = pathname == '/' ? '/index.html' : pathname;
    //可以获取后缀名的值
    let extname = path.extname(pathname);

    //判断如果不是 '/favicon.ico'的时候获取前端的值
    if (pathname != '/favicon.ico') {

        fs.readFile('./' + staticPath + pathname, (err, data) => {

            if (err) {

                res.writeHead(404, { "content-type": "text/html;charset='utf-8'" });

                res.end('这个页面有问题，加载失败'); //结束相应
            }

            //设置响应头 状态码是200 文件类型是HTML  字符集是utf-8
            let mime = getfile(extname);

            res.writeHead(200, { "content-type": ' ' + mime + ';charset=utf-8" ' });

            res.end(data); //结束相应

        })
    }

}