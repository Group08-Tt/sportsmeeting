const Core = require('@alicloud/pop-core'); //对接阿里云的发送短信文档
const Httpserve = require("../../../bin/config/configdev");
/***
 * @param params  这个参数是对应的配置的参数的
 *   type   boject
 *   {
 *       PhoneNumbers     type:String         发送短信的目标人物       是传过来的参数
 *       SignName         type:String        发送的签名的名称的        在configdev.js中配置
 *       TemplateCode     type:String        模板CODE                在configdev.js中配置
 *       TemplateParam    type:OBject        是发送短信时候需要携带的参数是在定义模板上定义的数据   是传过来的参数自己写的    传过来是一个对象
 *   }
 * @returns {Promise<unknown>}
 */
function aliyunduanx(params){
    return new Promise((resolve,reject)=>{
        let TemplateParamString = JSON.stringify(params.TemplateParam); //code 对象
        params.TemplateParam = TemplateParamString;
        var client = new Core({
            accessKeyId: Httpserve.aliyun.sendnote.accessKeyId,
            accessKeySecret: Httpserve.aliyun.sendnote.accessKeySecret,
            endpoint: 'https://dysmsapi.aliyuncs.com',
            apiVersion: '2017-05-25'
        });
        // var params = {
        //     "PhoneNumbers": "15363303576", //参数是写进来
        //     "SignName": "yqinyuantop", //
        //     "TemplateCode": "SMS_236560819",
        //     "TemplateParam": "{\"code\":\"45655\"}"
        // }
        const requestOption = {
            method: 'POST'
        };
        client.request('SendSms', params, requestOption).then((result) => {
            let resut =  JSON.parse(JSON.stringify(result))
            resolve(resut);
        },(ex) => {
            reject(ex);
        })
    })
 }
module.exports = {
    aliyunduanx
}