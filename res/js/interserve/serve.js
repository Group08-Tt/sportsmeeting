var superagent = require('superagent');
var charset = require('superagent-charset');
var axios = require('axios');
superagent = charset(superagent);

/***
 *作用： 是模拟一个浏览器请求网页信息 不像传统的
 * 参数介绍： url 是对应的网络地址    type: Stringh请求一样这个更加的像浏览器   仅8K
 *          codingtype  是对应的那个编码格式   type ： String
 * @type {request}
 * 返回的是对应的text （ 后期有希求的话可以再更加的封装他）
 */
const webpakeurl = function(url,codingtype){
    return new Promise((resolve, reject) => {
        //请求网络的url地址
        superagent.get(url)
            //编码格式是啥
            .charset(codingtype)
            //设置模拟网络请求 更加的像浏览器请求
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36')
            .end(function(err, res) {
                // console.log(res)
                resolve(res);
                //如果状态为200的话那么就让他把数据返回给我
                // if(res.statusCode){
                //     resolve(res.text);
                // }
            })
    })
}


/***
 *
 * @param url 是对应的请求的地址信息  适合缓存那个文件的时候
 * @returns {Promise<unknown>}  返回的是请求后的结果 失败返回 0
 */
function webpackdoRequest(url,herder,){
    return new Promise((resolve,reject)=>{
        superagent.get(url)
            //设置对应的请求问题，模拟浏览器访问对应的文件信息
            .set({
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
            })
            // 延迟信息
            .timeout({ response: 5000, deadline: 60000 })
            .end((err, res) => {
                res.statusCode == 200 || !err ? resolve(res) : resolve("0");
            })
    })
}


async function axiosrequire (method,url,herders){
    return new Promise((resolve,reject)=>{
        axios({
            headers:herders,
            method: method,
            url: url,
        }).then((e)=>{
            resolve(e);
        }).catch((err)=>{
            console.log(err)
        })
    })
}



async function axiosmode (herders,method,url){
    return new Promise((resolve,reject)=>{
        axios({
            headers:herders,
            method: method,
            url: url,
        }).then((e)=>{
            resolve(e);
        }).catch((err)=>{
            console.log(err)
        })
    })
}








module.exports = {
    webpakeurl,
    webpackdoRequest,
    axiosmode,
    axiosrequire
}