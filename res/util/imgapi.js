const {webpakeurl,webpackdoRequest,axiosmode} = require("../js/interserve/serve.js");
const {mysqld } = require("../js/mysql/mysqld");
var cheerio = require('cheerio'); //这是解析html的dom元素相当于就是用jq来操作爬下来的网页的信息 太秀了！
const  {timeDateall,gettimetimestamp} = require("../js/time/util");
var https = require('https');
var axios = require('axios');
async function imgdatat (){
//这个适合打开网页
    let d = await webpakeurl("https://www.ivsky.com/tupian/","UTF-8").then((res)=>{
        $ = cheerio.load(res.text); //把这个数据解析为htmldom元素好为下面操作
        let domylength = $(".il_img a").length;
        let domy = $(".il_img a");
        let urldizi = []
        for ( let i=0;i<domylength;i++){
            let xinurl = "https://www.ivsky.com"+domy[i].attribs.href
            urldizi.push(xinurl)
        }
        return urldizi;
    })
    var  datalist = [];//对应的数据信息
    let dleng = d.length > 0 ? d.length : 0;
    for(let j=0;j<dleng;j++){
        await  webpakeurl(d[j],"UTF-8").then((res)=>{
            $ = cheerio.load(res.text); //把这个数据解析为htmldom元素好为下面操作
            //$(".il_img a")[0].href
            //console.log($(".il_img a")[0].attribs.href) //第一次进来主页面的时候就是只拿对应的网络的href地址信息
            let domylength = $(".il_img a").length;
            let domy = $(".il_img a");
            let domimg =  $(".il_img a img")
            for (let i=0;i<domylength;i++){
                let obj = {
                    xinurl:"",
                    imgslu:"",
                    name:"",
                    sizwc:"",
                }
                let xinurl = "https://www.ivsky.com"+domy[i].attribs.href;
                let title = domy[i].attribs.title;
                let name = title.split(" ")[0];
                let sizwc = title.split(" ")[1];
                let imgslu = "https:" +domimg[i].attribs.src;
                obj.xinurl = xinurl;
                obj.imgslu = imgslu;
                obj.name = name;
                obj.sizwc = sizwc;
                datalist.push(obj)
            }
        })

    }
    // console.log(datalist)
    return datalist;
}

//这个应该是打开的是主页
/***
 * 功能就是把传递url远端主页的信息一点一点的采集出来放在集合
 * @param url 远端的对应的地址信息
 * @returns {Promise<{targetaddress: [], classify: []}>}
 */
async  function indexingdata (url){
       let requdata =  await requirewebhtml(url);
        $ = cheerio.load(requdata); //把这个数据解析为htmldom元素好为下面操作
        //这是获取那个下面内容的信息
        let domylength = $(".il_img a").length;
        let domy = $(".il_img a");
        let domyimg = $(".il_img a img");
        //这个是那个小分类的信息
        let classifylist = $(".sline div a");
        let classifylistleng = $(".sline div a").length
        //下面是一些推荐的图片的信息 但是不建议返回给客户端
        let mintui = $(".s_xg a");
        let mintuileng = $(".s_xg a").length;
        //下面是标题的信息
        let titlelist =  $(".tpmenu li a");
        let titlelistleng =  $(".tpmenu li a").length;
        //数据收集
        let urldizi = {
            targetaddress:[],
            classify:[],
            mintui:[],
            titlelist:[],
        }
        //下面是一些推荐的图片的信息 但是不建议返回给客户端
        for (let c=0;c<titlelistleng;c++){
            let  objmint = {
                titleurl:"",
                titleb:"",
            }
            let titleurl = titlelist[c].attribs.href;
            let titleb = titlelist[c].children[0].data;
            objmint.titleurl = titleurl;
            objmint.titleb = titleb;
            urldizi.titlelist.push(objmint)
        }
        //下面是一些推荐的图片的信息 但是不建议返回给客户端
        for (let ix=0;ix<mintuileng;ix++){
            let  objmin = {
                mintuiurl:"",
                mintuititle:"",
            }
            let mintuiurl = mintui[ix].attribs.href;
            let mintuititle = mintui[ix].children[0].data;
            objmin.mintuiurldomyimg = mintuiurl;
            objmin.mintuititle = mintuititle;
            urldizi.mintui.push(objmin)
        }
        //循环拿到对应的列表信息
        for ( let i=0;i<domylength;i++){
            let  obj = {
                xinurl:"",
                title:"",
                domyimg:"",
            }
            let xinurl =  domy[i].attribs.href;
            let title = domy[i].attribs.title;
            let domyimgindex =  "https://images.weserv.nl/?url=https:" + domyimg[i].attribs.src;
            //  let domyimgindex =  "https:" + domyimg[i].attribs.src;
            obj.xinurl = xinurl;
            obj.title = title;
            obj.domyimg = domyimgindex;
            urldizi.targetaddress.push(obj)
        }
        //循环拿出对应的组
        for ( let j=0;j<classifylistleng;j++){
            let objclass = {
                classifyurl:"",
                title:"",
            }
            let classifyurl = classifylist[j].attribs.href;
            let title = classifylist[j].children[0].data;
            objclass.classifyurl = classifyurl;
            objclass.title = title;
            urldizi.classify.push(objclass)
        }
        return urldizi;

}
async function imglist(url){
    let requihtml = await requirewebhtml(url);
        $ = cheerio.load(requihtml); //把这个数据解析为htmldom元素好为下面操作
        let domylength = $(".il_img a").length;
        let domy = $(".il_img a");
        let domimg =  $(".il_img a img")

       let recommendleng = $(".xg_img a").length;
       let recommend = $(".xg_img a")
       let recommendimg = $(".xg_img a img")



       let imglist = {
            imgdataindex:[],
           imgdatarecommend:[],
       };
       for (let j=0;j<recommendleng;j++){
           let obj = {
               url:"",
               title:"",
               imgsrc:"",
           }
           obj.url = recommend[j].attribs.href;
           obj.title = recommendimg[j].attribs.alt;
           obj.imgsrc = "https://images.weserv.nl/?url=https:" + recommendimg[j].attribs.src;
           // obj.imgsrc = "https:" + recommendimg[j].attribs.src;
           imglist.imgdatarecommend.push(obj)
       }
        for (let i=0;i<domylength;i++){
            let obj = {
                xinurl:"",
                imgslu:"",
                name:"",
                sizwc:"",
            }
            // let xinurl = "https://www.ivsky.com"+domy[i].attribs.href;
            let xinurl =  domy[i].attribs.href;
            let title = domy[i].attribs.title;
            let name = title.split(" ")[0];
            let sizwc = title.split(" ")[1];
            let imgslu = "https://images.weserv.nl/?url=https:" + domimg[i].attribs.src;
            // let imgslu = "https:" + domimg[i].attribs.src;
            // let imgslu = "https:" +domimg[i].attribs.src;
            obj.xinurl = xinurl;
            obj.imgslu = imgslu;
            obj.name = name;
            obj.sizwc = sizwc;
            imglist.imgdataindex.push(obj)
        }
        return imglist
}


async function imgartwork(url){
    let requihtml = await requirewebhtml(url);
        $ = cheerio.load(requihtml); //把这个数据解析为htmldom元素好为下面操作
        //获取到对应的图片的信息
       let detachicun =  $("#pic_info span")[0].children[0].data;
        let detasize =  $("#pic_info span")[1].children[0].data;
        let thumbnailimg = "https://images.weserv.nl/?url=https:" + $("#imgis")[0].attribs.src
        let detabianhao =  $("#pic_info span")[2].children[0].data;
        let preimgx = $("#imgis")[0].attribs.src
        let dizhi = preimgx.split(".com")[1].split("/pre/")[0]+"/pic/"+preimgx.split(".com")[1].split("/pre/")[1]
         let url1 = `https://www.ivsky.com/get_picinfo.php?tn=downloadpic&picurl=${dizhi}`
        //配置请求头的地址信息
        let  herder = {
            Cookie:"",
            accept:'application/json, text/javascript, */*; q=0.01',
            'accept-encoding':'gzip, deflate, br',
            'accept-language':'zh-CN,zh;q=0.9',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
        }
        var time = Date.parse(new Date()).toString();//获取到毫秒的时间戳，精确到毫秒
        time = time.substr(0,10);//精确到秒
        let  her = "Hm_lpvt_c13cf8e9faf62071ac13fd4eafaf1acf="+time +";__yjs_duid=1_f17737b39fce7f0dacc3479d214ca6391636448585267"
        herder.Cookie = her;
          let timeyz = await axiosmode(herder,'GET',url1);
          let donloudimg = "https://img-picdown.ivsky.com/img/downloadpic/download/"+timeyz.data.data
        let  datalistmode = {
            detachicun,
            detasize,
            detabianhao,
            donloudimg,
            thumbnailimg
        }
        return  datalistmode
}

async function searchimg(url){
    return  await  webpakeurl(url,"UTF-8").then((res)=>{
        $ = cheerio.load(res.text); //把这个数据解析为htmldom元素好为下面操作
        let domylength = $(".il_img a").length;
        let domy = $(".il_img a");
        let domimg =  $(".il_img a img")
        let imglist = [];
        for (let i=0;i<domylength;i++){
            let obj = {
                xinurl:"",
                imgslu:"",
                title:"",
            }
            let xinurl =domy[i].attribs.href;
            let title = domimg[i].attribs.alt;
            let imgslu = "https://images.weserv.nl/?url=" + domimg[i].attribs.src;
             // let imgslu =  domimg[i].attribs.src;
            obj.xinurl = xinurl;
            obj.imgslu =  imgslu;
            obj.title = title;
            imglist.push(obj)
        }
        return imglist
    })
}

/***
 * 对收藏的信息进行删除处理
 * @param mdpassword
 * @param openid
 * @param pathurl
 * @param specification
 * @returns {Promise<unknown>}
 */

async  function removemysqlsearch(mdpassword,openid,pathurl,specification){
    let  sqlremove = `delete from collectimage where mdpassword="${mdpassword}" && img_pathurl="${pathurl}" && specification="${specification}" || openid ="${openid}" && img_pathurl="${pathurl}" && specification="${specification}"`
    return  await mysqld(sqlremove).then((e)=>{
        let  datalist =  JSON.parse(JSON.stringify(e))
        return datalist
    })
}

/***
 * 功能是 输入对应的信息查询是否有这一条数据，有的话那么就就返回对应的数据，没有的话那么就返回一个空值
 * @param mdpassword token验证
 * @param openid  用户的openid
 * @param pathurl 用户的网络路径
 * @param specification  图片的id
 * @returns {Promise<unknown>}
 */
async function searchhottu(mdpassword,openid,pathurl,specification){
    let  sqlselect = `select * from collectimage where mdpassword="${mdpassword}" && img_pathurl="${pathurl}" && specification="${specification}" || openid ="${openid}" && img_pathurl="${pathurl}" && specification="${specification}"`
    return  await mysqld(sqlselect).then((e)=>{
        let  datalist =  JSON.parse(JSON.stringify(e))
        return datalist
    })
}

/***
 * 对收藏的信息进行存储
 * @param mdpassword token验证的信息
 * @param openid  用户的openid 信息
 * @param img_pathurl  图片的path的路劲的问题
 * @param img_url 图片的src
 * @param specification 图片的编号
 * @returns {Promise<unknown>}
 */
async function searchhotinsert(mdpassword,openid,img_pathurl,img_url,specification){
    let submittime =  gettimetimestamp();
    let  sqlinsert = `INSERT INTO collectimage(mdpassword,openid,img_pathurl,img_url,specification,submittime)
     VALUES ("${mdpassword}","${openid}","${img_pathurl}","${img_url}","${specification}","${submittime}") `
    return  await mysqld(sqlinsert).then((e)=>{
        let datalist = JSON.parse(JSON.stringify(e))
            return datalist
    })
}

async function insetfeedback(mdpassword,openid,msg){
    let submittime =  timeDateall();
    let  sqlinsert = `INSERT INTO feedbackimg(mdpassword,openid,msg,submittime)
     VALUES ("${mdpassword}","${openid}","${msg}","${submittime}") `
    return  await mysqld(sqlinsert).then((e)=>{
        let datalist = JSON.parse(JSON.stringify(e))
        return datalist
    })
}

/***
 *
 * @param pagecole 对应的页数
 * @param openid  用户的openid
 * @param mdpassword 用户的token数据
 * @returns {Promise<{countlist: null, datalist: []}>}
 */

async function mycollectpaging(pagecole,openid,mdpassword){
    let size = 10
    let obj = {
        countlist:null,
        datalist:[]
    }
    let pagezui = size * (pagecole-1)
    let sql_countzong = `select COUNT(*) countlist from collectimage where openid="${openid}" || mdpassword="${mdpassword}" ` //总数
      let sql_datalist = `select * from collectimage WHERE mdpassword="${mdpassword}" || openid="${openid}" ORDER BY submittime DESC limit ${pagezui},${size}`
      let countlist =  await mysqld(sql_countzong);
      let mtsqldata  =  await mysqld(sql_datalist);
      obj.datalist = JSON.parse(JSON.stringify(mtsqldata))
      let  congtdata_leng = JSON.parse(JSON.stringify(countlist))[0].countlist
      let batchTimes = Math.ceil(congtdata_leng / size)
     obj.countlist = batchTimes
      return obj;
}
async function funjingxuanimg(pagecole){
    let size = 15
    let obj = {
        countlist:null,
        datalist:[]
    }
    let pagezui = size * (pagecole-1)
    let sql_countzong = "select COUNT(*)  countlist from indeximagedata"
    let sql_datalist = `select * from indeximagedata limit ${pagezui},${size}`
    let countlist =  await mysqld(sql_countzong);
    let mtsqldata  =  await mysqld(sql_datalist);
    obj.datalist = JSON.parse(JSON.stringify(mtsqldata))
    let  congtdata_leng = JSON.parse(JSON.stringify(countlist))[0].countlist
    var batchTimes = Math.ceil(congtdata_leng / size)
    obj.countlist = batchTimes
    return obj;
}







async function collectmysqldselect(){
    return  new Promise(()=>{

    })
}


async  function requirewebhtml (url){
     let tokenyan =  await webpakeurl(url,"UTF-8").then((res)=>{
        let token = JSON.parse(JSON.stringify(res.headers))['set-cookie'][0].split('=')[1]
        let secret = JSON.parse(JSON.stringify(res.headers))['set-cookie'][1].split('=')[1]*1-100
        let obj = {
            token,
            secret
        }
        return obj;
    })
    let  herderb = {
        Cookie:`t=${tokenyan.token}; r=${tokenyan.secret}`,
        accept:'application/json, text/javascript, */*; q=0.01',
        'accept-encoding':'gzip, deflate, br',
        'accept-language':'zh-CN,zh;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
    }
    let timeyz = await axiosmode(herderb,'GET',url);
     return timeyz.data
}







//  async function axiosmode (her){
//     console.log(her)
//     return new Promise((resolve,reject)=>{
//         axios({
//             headers: her,
//             method: 'get',
//             url: 'https://www.ivsky.com/get_picinfo.php?tn=downloadpic&picurl=/img/tupian/pic/202104/19/maoheren.jpg',
//             data:{
//                 'tn':"downloadpic",
//                 'picurl':'/img/tupian/pic/202104/19/maoheren.jpg'
//             }
//         }).then((e)=>{
//             //resolve(e);
//             console.log(e);
//         }).catch((err)=>{
//             console.log(err)
//         })
//     })
// }



module.exports = {
    imgdatat,
    indexingdata,
    imglist,
    imgartwork,
    axiosmode,
    searchimg,
    funjingxuanimg,
    searchhotinsert,
    searchhottu,
    removemysqlsearch,
    mycollectpaging,
    insetfeedback,
    requirewebhtml
}