var express = require('express');
var router = express.Router();
const {QRCodeer} = require('../../res/js/imgestablish/imgestablish');
const {requirebhtml,pytianqi} = require('../../res/js/routerapi/eatmeal');
router.get('/ceshi', async function (request, response, next) {

});
/**
 * 拿取的番禺的天气的接口文件
 */
router.get('/pyweather', async function (request, response, next) {
    requirebhtml("http://www.weather.com.cn/weather/101280102.shtml").then((e)=>{
        response.json(e);
    })
});
// http://www.weather.com.cn/weather/101280102.shtml
router.get('/QRCodeerimg', async function (request, response, next) {
    let url = "https://www.yqinyuan.top";
    let type = 0;
    await QRCodeer(url, type).then((e) => {
        if (type == 1) {
            response.writeHead(200, {'Content-Type': 'text/plain;charset=UTF-8'});
            response.end(e)
        } else {
            response.writeHead(200, {'Content-Type': 'image/png;charset=UTF-8'});
            e.pipe(response);
        }
    })
});


module.exports = router;
