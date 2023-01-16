const puppeteer = require('puppeteer');
const {mysqld} = require('../mysql/mysqld');
const {gettimeday,gettimedayretu} = require('../time/util');
 async function ksvedioanalysis (urlyuan) {
    var urljiu = "";
    var result = {
        ksurl:"",
        kstitle:"",
    };
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(urlyuan)
    urljiu =  await page.url();
    while (result.ksurl == ''){
        await page.goto(urljiu);
        await page.reload()
        let  resultxin = await page.evaluate(  () => {
            let ksurl = document.querySelector('.player-video').src
            let title = document.querySelector('title').innerText;
            return {
                ksurl,
                title,
            }
        });
        result.ksurl =  resultxin.ksurl
        result.kstitle =  resultxin.title
    }
    await browser.close();
    return result ;
};

async function expressage_inquire (expressageid) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://www.guoguo-app.com/")
    await page.focus('#J_SearchInput');
    await page.keyboard.sendCharacter(expressageid);
    await page.click('#J_SearchBtn')
    let  resultxin = await page.evaluate(  () => {
        let ksurl = document.querySelector('.date').innerText
        return {
            ksurl,
        }
    });
    console.log(resultxin)
    // await browser.close();
};


async function add_interest(adddata,fileimage,interest_id){
    // datetime  上课的时间戳
    // dateclassxia //下课的时间戳
    let timeArray = [];
    for (let i=0;i<adddata.classtime;i++){
        let timeobject = {}; //2022-06-05 15:12|2022-06-05 16:12
        timeobject.timestampup = adddata.datetime*1 + 604800000 * i; //全部的上课时间
        timeobject.timestampdown = adddata.dateclassxia*1 + 604800000 *i; //全部的下课时间
        timeArray.push(timeobject);
    }
    let ArraytimeString =  JSON.stringify(timeArray).toString()
    let setsqldataaddinter = `INSERT INTO interestclass(interestid,token,interest,name,classtime,residuetime,tuition,
    classlocation,datetime,imageurl,week)VALUES ("${interest_id}","${adddata.token}","${adddata.interest}","${adddata.name}","${adddata.classtime}","${adddata.residuetime}"
     ,"${adddata.tuition}","${adddata.classlocation}",'${ArraytimeString}',"${fileimage}","${adddata.week}")`
    console.log(setsqldataaddinter,55)
    return mysqld(setsqldataaddinter).then((e)=>{
        let datalistsql = JSON.parse(JSON.stringify(e));
        let obj = {
            start:0,
            msg:"添加失败!"
        }
        if(datalistsql.affectedRows == 1){ //成功
            obj.start = 1;
            obj.msg = "添加成功!"
        }
        return obj
    })
}

async function getinterest(token){
    let sqlselect = `select * from interestclass where token="${token}"`
    return mysqld(sqlselect).then((e)=>{
        let  datasql =  JSON.parse(JSON.stringify(e))
        let datalist = []
        datasql.forEach((item,index)=>{
            let dataobj = datasql[index];
            dataobj.datetime = JSON.parse(item.datetime)
            datalist.push(dataobj);
        })
        let obj = {
            start:0,
            msg:"无数据",
            datainterest:[],
        }
        if (datalist.length){
            obj.start = 1;
            obj.msg  = "获取成功"
            obj.datainterest = datasql
        }
        return obj
    })
}

async function fougetinterest(token,inietid){
    let sqlselect = null;
    if(inietid){
        sqlselect = `select * from interestclass where token='${token}' AND interestid<>'${inietid}'`
    }else {
        sqlselect = `select * from interestclass where token='${token}'`
    }
    return mysqld(sqlselect).then((e)=>{
        let  datasql =  JSON.parse(JSON.stringify(e))
        let datalist = []
        datasql.forEach((item,index)=>{
            let dataobj = datasql[index];
            dataobj.datetime = JSON.parse(item.datetime)
            datalist.push(dataobj);
        })
        let obj = {
            start:0,
            msg:"无数据",
            datainterest:[],
        }
        if (datalist.length){
            obj.start = 1;
            obj.msg  = "获取成功"
            obj.datainterest = datasql
        }
        return obj
    })
}

async function get_onedata(id){
    let selecesqlone = `select * from interestclass where interestid="${id}"`;
    return mysqld(selecesqlone).then((e) => {
        let  datasql =  JSON.parse(JSON.stringify(e))
        let datalist = []
        datasql.forEach((item,index)=>{
            let dataobj = datasql[index];
            dataobj.datetime = JSON.parse(item.datetime)
            datalist.push(dataobj);
        })
        let obj = {
            start:0,
            msg:"没有数据",
            dataiter:[],
        }
        if (datasql.length){
            obj.start = 1;
            obj.msg = "成功";
            obj.dataiter = datalist
        }
        return obj
    })
}
async function uplouddata(queryda){
    console.log(queryda,5566)
    let updatamysql = `UPDATE interestclass SET interest="${queryda.interest}",
    name="${queryda.name}",classtime="${queryda.classtime}",residuetime="${queryda.residuetime}",tuition="${queryda.tuition}",
    tuition="${queryda.tuition}",classlocation="${queryda.classlocation}",datetime='${queryda.datetime}',week="${queryda.week}"
    WHERE interestid="${queryda.iterid}"`
    return mysqld(updatamysql).then((e)=>{
        let sqldata = JSON.parse(JSON.stringify(e))
        let obj = {
            start:0,
            msg:"更新失败！",
        }
        if(e.affectedRows === 1){ //成功
            obj.start = 1;
            obj.msg = "更新成功！"
        }
        return obj;
    })
}
async function deleteiterdata(id){
    let mysqldata = `DELETE FROM interestclass WHERE interestid="${id}"`
    return mysqld(mysqldata).then((e)=>{
        let datasqldelete  = JSON.parse(JSON.stringify(e));
            console.log(datasqldelete,1111111);
            let obj = {
                start:0,
                msg:"删除失败！"
            }
            if(datasqldelete. affectedRows == 1 ){
                obj.start = 1;
                obj.msg = "删除成功！";
            }
            return obj;
    })
}

/**
 * 更新对应的课程
 * @returns {Promise<void>}
 */
async function updataiterclass(interestid,residuetime){
    let sqlda = `UPDATE interestclass SET residuetime=${residuetime} where interestid = ${interestid}`
    return mysqld(sqlda).then((e)=>{
        let datasqldelete  = JSON.parse(JSON.stringify(e));
        console.log(datasqldelete)
    })
}


/***
 * 入口
 * @returns {Promise<unknown>}
 */
async function jishitimed(){
    let  sqlda = `select * from interestclass where residuetime<>0`
    return mysqld(sqlda).then((e)=>{
        let datasqldelete  = JSON.parse(JSON.stringify(e));
        let datasqldeletesize = datasqldelete.length;
        for(let i=0;i<datasqldeletesize;i++){
            for(let j=0;j<datasqldelete[i].classtime;j++){
                let bbas = datasqldelete[i].datetime.split(" ");
                let datea = new Date(bbas[0]).getTime(); //转换为时间戳
                let timestamp = datea + 604800000 * j.toString();
                let time = gettimedayretu(timestamp).yesr_time_day;
                let timedang = gettimeday().yesr_time_day;
                if(time == timedang){ //说明是今天的数据
                    let residuetime =  (datasqldelete[i].residuetime*1) - 1 ; //对应的剩余时间
                    let interestid = datasqldelete[i].interestid;
                    updataiterclass(interestid,residuetime);
                }
            }
        }
    })
}


module.exports = {
    ksvedioanalysis,
    expressage_inquire,
    add_interest,
    getinterest,
    get_onedata,
    uplouddata,
    deleteiterdata,
    jishitimed,
    fougetinterest
}