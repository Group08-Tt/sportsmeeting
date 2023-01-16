const {webpakeurl} = require('../interserve/serve');
var cheerio = require('cheerio'); //这是解析html的dom元素相当于就是用jq来操作爬下来的网页的信息 太秀了！
async  function requirebhtml (url){
   return await webpakeurl(url,"UTF-8").then((res)=>{
        $ = cheerio.load(res.text); //把这个数据解析为htmldom元素好为下面操作
        let  day =  $(".skyid").length;
        let weatherdatalist = [];
        for (let i=0 ;i<day;i++){
            let obj = {
                day : "",
                weather : "",
                temperature : ""
            }
            obj.day = $(".skyid h1")[i].children[0].data;
            obj.weather = $(".skyid .wea")[i].attribs.title
            obj.temperature = $(".skyid .tem span")[i].children[0].data + "~" + $(".skyid .tem i")[i].children[0].data
            weatherdatalist.push(obj);
        }
        return  weatherdatalist
   })
}
 async function pytianqi(){

}


module.exports = {
    requirebhtml,
    pytianqi
}