const express = require('express');
const router = express.Router();
const fs = require('fs')
var multipart = require('connect-multiparty')(); //解析其他格式的数据的包
const {
    ExcelFile,
    fileuploud
} = require('../../res/js/file_multer/index'); //文件上传解析的
const {
    Adminlogin,
    ExcelFileread,
    Selectathletesfun,
    uploudathletesfun,
    deleteathletes,
    gameinfoinsertfun,
    gameinfoSelectfun,
    gameinfoDeletefun,
    gameinfoUploudfun,
    signloginfun,
    selectwxuserinfo,
    Exceldaochufun,
    collagename,
    indexparameterfun,
    selectadminminknowledgefun,
    deleteadminminknowledge,
    insertadminminknowledgfun,
    uploudadminminknowledgefun,
    colleagegroupfun,

    selectminknowledgefun,
    oneminknowledgefun,
    modificationpasswordfun,
    datatabberfun,
    datatabbernavfun,
    rankingsfun,
    accomplishlsitfun,
    competitionfun,

} = require('../../res/js/functionFile/bsgwyy')

router.get('/ceshi', async function (request, response, next) {
    response.send("123");
});

//-------------------------------------------客户端的接口信息-------------------------------------------------------------

/***
 * 赛事的信息
 */
router.get('/competition',async function (request,response,next) {
        let competitionreq = await competitionfun();
        response.json(competitionreq);
})


/***
 * 完赛的全部数据
 */
router.get('/accomplishlsit',async function (request,response,next) {
    let accomplishlsitreq = await  accomplishlsitfun();
    response.json(accomplishlsitreq);
})
/***
 * 排名榜
 */
router.get('/rankings',async function (request,response,next) {
    let  rankingsfunreq = await  rankingsfun(request.query);
    response.json(rankingsfunreq);
})




/**
 * tabber 数据模块
 */

router.get('/datatabber',async function (request,response,next) {
    let projectname = request.query.projectname;
    let  tabberres = await datatabberfun(projectname);
    response.json(tabberres);
})

/**
 * tabber 数据模块 的导航的数据
 */

router.get('/datatabbernav',async function (request,response,next) {
    let  tabberres = await datatabbernavfun();
    response.json(tabberres);
})

/**
 * 修改密码
 */
router.post('/modificationpassword',multipart,async function (request,response,next) {
        let respassword = await modificationpasswordfun(request.body);
        response.json(respassword);
})

/**
 * 签到的信息
 */
router.post('/signlogin',multipart,async function (request,response,next) {
    let obj = {
        token:request.body.token,
        local:request.body.local
    }
     let signlogin =  await signloginfun(obj);
     response.json(signlogin);
})

/***
 * 获取体育小常识的全部的信息
 */
router.get('/selectminknowledge', async function (request, response, next) {
    let selectminknowledgedata = await selectminknowledgefun();
    response.json(selectminknowledgedata);
})

/***
 * 获取一条小常识
 * 获取他的id来查
 */
router.get('/oneminknowledge', async function (request, response, next) {
    let id = request.query.id;
    let oneminknowledgedata = await oneminknowledgefun(id);
    response.json(oneminknowledgedata);
})



//-------------------------------------------Admin管理接口信息-------------------------------------------------------------

// colleagegroupfun

router.get('/colleagegroupfun',async function (request,response,next) {
    let colleagegroupreq = await colleagegroupfun();
    response.json(colleagegroupreq);
})

/***
 * 更新对应的小常识
 */
router.post('/uploudadminminknowledge',async function (request,response,next) {
        let uploudadminres = await uploudadminminknowledgefun(request.body);
        response.json(uploudadminres);
})


/***
 * 删除小常识
 */
router.post('/deleteadminminknowledge',multipart,async function (request,response,next) {
        let  deletemin = await deleteadminminknowledge(request.body.id);
        response.json(deletemin);
})


/***
 * 新增小常识
 */
// const cpUploadimage = fileuploud().fields([{name: 'file', maxCount: 1}])
router.post('/insertadminminknowledge',multipart,async function (request,response,next) {
    let reqstart = await insertadminminknowledgfun(request.body);
    response.json(reqstart);
})


/***
 * 管理端小常识分页查询
 */
router.get("/selectadminminknowledge",async function (request,response,next) {
    let limit = 20;
    let obj = {
        page: (request.query.page * 1 - 1) * limit,
        limit,
    }
    let  indexparametermode =   await selectadminminknowledgefun(obj);
    response.json(indexparametermode);
})







/***
 * 主页的对应的参数
 */
router.get("/indexparameter",async function (request,response,next) {
    let  indexparametermode =   await indexparameterfun();
    response.json(indexparametermode);
})


/***
 * 导出对应的学院观众数
 */
router.get("/collagename",async function (request,response,next) {
    let  Exceldaochumode =   await collagename();
    response.json(Exceldaochumode);
})


/***
 * 导出对应的签到的信息
 */
router.get("/Exceldaochu",async function (request,response,next) {
    console.log(request.query)
    let obj = {
        college:request.query.college,
        sign:request.query.sign
    }
    let  Exceldaochumode =   await Exceldaochufun(obj);
    response.json(Exceldaochumode);
})

/***
 * 查询对应的客户端的用户的信息
 */

router.get("/selectwxuserinfo",async function (request,response,next) {
    let limit = 20;
    let obj = {
        page: (request.query.page * 1 - 1) * limit,
        limit,
        college:request.query.college,
        sign:request.query.sign
    }
     let selectwxuser =  await selectwxuserinfo(obj)
    response.json(selectwxuser);
})





/**
 * 更新对应的比赛的信息
 */

router.post('/gameinfoUploud', multipart, async function (request, response, next) {
    let reqbody = request.body;
    let gameUOloud = await gameinfoUploudfun(reqbody);
    response.json(gameUOloud);
})



/***
 * 删除比赛的信息
 */
router.post('/gameinfoDelete', multipart, async function (request, response, next) {
    let deletefun = await gameinfoDeletefun(request.body.projectid);
    response.json(deletefun);
})


/***
 * 查询比赛的项目
 */
router.get('/gameinfoSelect', async function (request, response, next) {
    let limit = 20;
    let obj = {
        page: (request.query.page * 1 - 1) * limit,
        limit,
        projectcategory:request.query.projectcategory*1,
    }
    let selecty = await gameinfoSelectfun(obj);
    response.json(selecty);
})


/***
 * 插入对应的比赛的项目
 */
router.post('/gameinfoinsert', multipart, async function (request, response, next) {
    let gameinser = await gameinfoinsertfun(request.body);
    response.json(gameinser);
})


/***
 * 分页获取对应的运动员信息
 */
router.get('/selectathletes', async function (request, response, next) {
    let limit = 20;
    let obj = {
        page: (request.query.page * 1 - 1) * limit,
        limit,
        gender:request.query.gender,
        college:request.query.college,
    }
    let selecty = await Selectathletesfun(obj);
    response.json(selecty);
})


/***
 * 运动员信息的修改
 */
router.post('/uploudathletes', multipart, async function (request, response, next) {
    let uplouddatastart = await uploudathletesfun(request.body);
    response.json(uplouddatastart)
})
/***
 * 运动员信息的删除
 */
router.post('/deleteathletes', multipart, async function (request, response, next) {
    let deleteat = await deleteathletes(request.body.athletesid);
    response.json(deleteat);
})

/***
 * Admin对应的登录
 */
router.post('/login', multipart, async function (request, response, next) {
    let username = request.body.username;
    let pwd = request.body.password;
    let adminloginapisql = await Adminlogin(username, pwd);
    response.json(adminloginapisql)
})


/***
 * 接收Excel文件并且去存入数据库里面
 */
const cpUpload = ExcelFile().fields([{name: 'file', maxCount: 1}])
router.post('/ExcelReadFile', cpUpload, async function (request, response, next) {
    let datainsert = await ExcelFileread()
    response.json(datainsert);
})


module.exports = router;