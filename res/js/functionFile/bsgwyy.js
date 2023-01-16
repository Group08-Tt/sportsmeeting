/**
 * 一些接口
 **/
const {mysqld} = require('../mysql/mysqld');
const xlsx = require('node-xlsx'); //解析Excel的
const nodeExcel = require('excel-export'); //对应的写出Excel的生成文件
const path = require("path");
const {excel_sheng} = require("../util/util_excel");
const md5 = require("md5")
const {gettimedayretu} = require("../time/util");
const {axiosrequire} = require("../interserve/serve")
const Httpserve = require('../../../bin/config/configdev');


const competitionfun = async function () {
    let sqlselecgame = `SELECT * FROM competitionitem`;
    let mysqldatagame = await mysqld(sqlselecgame).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        let getTime = new Date().getTime();
        let objdata = []
        datalistsql.forEach((item, index) => {
            if (item.begintime < getTime && item.endtime > getTime){ //正在进行
                item.start = 1;
            }else if(item.begintime < getTime && item.endtime < getTime ){ //已经结束
                item.start = 3
            }else if(item.begintime > getTime && item.endtime > getTime ){ //未开始
                item.start = 2
            }
            item.begintime = gettimedayretu(item.begintime * 1).all_time;
            item.endtime = gettimedayretu(item.endtime * 1).all_time;
            if(item.start != 3){
                objdata.push(item)
            }

        })
        return objdata
    })
    let obj = {
        start: 1,
        msg: "无数据",
        data: [],
    }
    if (mysqldatagame.length > 0) {
        obj.start = 1;
        obj.msg = "获取成功";
        obj.data = mysqldatagame
    }
    return obj;
}



/***
 * 完赛的信息
 */
const accomplishlsitfun = async function () {
    let  sqlselecegame = `SELECT * FROM competitionitem`
    let accomplishlsitsql = await mysqld(sqlselecegame).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql;
    })
    let datalist = []
    accomplishlsitsql.forEach((item,index)=>{
        item.start = item.firstone && item.firsttwo && item.firstthree  ? 1 : 0;
        item.endtime = gettimedayretu(item.endtime*1).all_time;
        if(item.start == 1){
            datalist.push(item);
        }
    })

    let obj = {
        start: 0,
        msg: "无数据",
        data: [],
    }
    if (datalist.length > 0) {
        obj.start = 1;
        obj.msg = "请求成功";
        obj.data = datalist
    }
    return obj;
}



/***
 * 排行榜
 * @param data
 * @returns {Promise<{msg: string, data: [], start: number}>}
 */
const rankingsfun = async function (data) {
    let  sqlselece = `SELECT * FROM competitionitem WHERE projectcategory=${data.projectcategory} AND gamegender=${data.gamegender}`
    let datatabbernavsql = await mysqld(sqlselece).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql;
    })
    let datalist = []
    datatabbernavsql.forEach((item,index)=>{
        item.start = item.firstone && item.firsttwo && item.firstthree  ? 1 : 0;
        if(item.start == 1){
            datalist.push(item);
        }
    })

    let obj = {
        start: 0,
        msg: "无数据",
        data: [],
    }
    if (datatabbernavsql.length > 0) {
        obj.start = 1;
        obj.msg = "请求成功";
        obj.data = datalist
    }
    return obj;
}




/***
 * 获取对应的导航的信息
 * @returns {Promise<void>}
 */

const datatabbernavfun = async function () {
    let sqlcount = `SELECT projectname FROM competitionitem  GROUP BY projectname`;
    let datatabbernavsql = await mysqld(sqlcount).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql;
    })
    let obj = {
        start: 0,
        msg: "获取失败",
        data:[],
    }
    if (datatabbernavsql.length >  1) {
        obj.start = 1;
        obj.msg = "获取成功";
        obj.data  = datatabbernavsql
    }else if(datatabbernavsql.length == 0){
        obj.start = 2;
        obj.msg = "无数据";
    }
    return obj;
}


/***
 * tabber 的数据模块接口数据
 * @param data
 * @returns {Promise<void>}
 */
const datatabberfun = async function (projectname) {
    let datasql = `SELECT * FROM competitionitem WHERE projectname="${projectname}"`;
    let mysqldatatabber = await mysqld(datasql).then((e)=>{
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql;
    })
    let gamegenderone = [];
    let gamegendertwo = []
    mysqldatatabber.forEach((item,index)=>{
        if (item.gamegender == 1 ){
            item.start = item.firstone && item.firsttwo && item.firstthree  ? 1 : 0;
            item.endtime = gettimedayretu(item.endtime*1).all_time;
            if(item.start == 1){
                gamegenderone.push(item);
            }
        }else if(item.gamegender == 2){
            item.start = item.firstone && item.firsttwo && item.firstthree  ? 1 : 0
            item.endtime = gettimedayretu(item.endtime*1).all_time;
            if(item.start == 1){
                gamegendertwo.push(item);
            }
        }
    })
    let obj = {
        start: 0,
        msg: "无数据",
        data: [],
    }
    if (mysqldatatabber.length > 0) {
        obj.start = 1;
        obj.msg = "请求成功";
        obj.data = {
            gamegenderone,
            gamegendertwo,
        }
    }
    return obj;
}

/**
 * 修改密码
 * @returns {Promise<void>}
 */
const modificationpasswordfun = async function (data) {
    let md5pwd =  md5(data.password);
    let sqlsiginuser = `UPDATE commonuserinfo  SET passwordmd="${md5pwd}" where token="${data.token}"`;

    let signUploud = await mysqld(sqlsiginuser).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql.affectedRows;
    })
    let obj = {
        start: 0,
        msg: "更改失败",
    }
    if (signUploud == 1) {
        obj.start = 1;
        obj.msg = "更改成功";
    }
    return obj;

}

const getlocaadree = async function (location) {
    let url = `https://apis.map.qq.com/ws/geocoder/v1/?coord_type=5&get_poi=0&output=json&key=3BGBZ-2O2W3-HR23V-3FMPT-V3WBF-MMFUF&location=${location}`
      return  await axiosrequire("GET",url).then((e)=>{
          return e.data.result.address;
     });
}


/***3
 * 点击签到 把对应的签到信息为 1
 * 拿token 的值去修改
 *
 */
const signloginfun = async function (data) {
    let addree =  await getlocaadree(data.local);
    console.log(addree)
    let sqlsigin = `UPDATE commonuserinfo SET sign=1,address="${addree}" where token="${data.token}"`
    let signlogin = await mysqld(sqlsigin).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql.affectedRows;
    })
    let obj = {
        start: 0,
        msg: "签到失败",
    }
    if (signlogin == 1) {
        obj.start = 1;
        obj.msg = "签到成功";
    }
    return obj;
}


/***
 * 获取一条体育小常识
 * @param id 对应的 id
 */
const oneminknowledgefun = function (id) {
    let oneminknowledgeone = `select * from minknowledge where id="${id}"`
    return mysqld(oneminknowledgeone).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        datalistsql.forEach((item,index)=>{
            item.imagesrc  = Httpserve.myHttps_domain + item.imagesrc;
            item.time = gettimedayretu(item.time*1).all_time;
        })

        let obj = {
            start: 0,
            msg: "请求错误",
            data: "",
        }
        if (datalistsql.length != 0) {
            obj.start = 1;
            obj.msg = "请求成功";
            obj.data = datalistsql[0]
        }
        return obj;
    })
}


/***
 * 返回所有的体育小常识
 * @returns {Promise<{msg: string, data: string, start: number}>}
 */
const selectminknowledgefun = function () {
    let sqlselectknowledge = `select * from minknowledge`
    return mysqld(sqlselectknowledge).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))

        datalistsql.forEach((item,index)=>{
            item.imagesrc  = Httpserve.myHttps_domain + item.imagesrc;
            item.time = gettimedayretu(item.time*1).all_time;
        })

        let obj = {
            start: 0,
            msg: "请求错误",
            data: "",
        }
        if (datalistsql.length > 0) {
            obj.start = 1;
            obj.msg = "请求成功";
            obj.data = datalistsql
        }
        return obj;
    })
}


//--------------------------------------管理员后台的------------------------------------------------
/***
 * 获取就是对应的以学院的组的信息
 */
const colleagegroupfun = async function () {
    let groupexselectsql = `SELECT collegename as college FROM athletes GROUP BY college`;
    let groupexselect = await mysqld(groupexselectsql).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql
    })
    return  groupexselect
}




const uploudadminminknowledgefun = async function (data) {
    let gameinfoUploudsql = `UPDATE minknowledge SET title="${data.title}",body="${data.body}",imagesrc="${data.imagesrc}" WHERE id="${data.id}"`;
    let dminminknowledgereq = await mysqld(gameinfoUploudsql).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql.affectedRows;
    })
    let obj = {
        start: 0,
        msg: "更新失败"
    }
    if (dminminknowledgereq == 1) {
        obj.start = 1;
        obj.msg = "更新成功";
    }
    return obj;
}


/***
 * 删除小常识
 * @returns {Promise<void>}
 */
const deleteadminminknowledge = async function (id) {
    let mysqlminminknowledg = `DELETE FROM minknowledge WHERE id="${id}"`
    let startsqldelete = await mysqld(mysqlminminknowledg).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql.affectedRows;
    })
    let obj = {
        code: 0,
        msg: "删除失败"
    }
    if (startsqldelete == 1) {
        obj.code = 1;
        obj.msg = "删除成功";
    }
    return obj;
}

/***
 * 新增小常识
 * @returns {Promise<void>}
 */
const insertadminminknowledgfun = async function (data) {
    let sqlinsert = `INSERT INTO minknowledge(title,body,imagesrc,time) VALUES ("${data.title}","${data.body}","${data.imagesrc}","${data.creattime}")`
    let mysqldata = await mysqld(sqlinsert).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql.affectedRows;
    })
    let obj = {
        start: 0,
        msg: "添加失败"
    }
    if (mysqldata == 1) {
        obj.start = 1;
        obj.msg = "添加成功";
    }
    return obj;
}


/***
 * 管理员查询出的分页小常识
 * @param data
 * @returns {Promise<{msg: string, code: number, data: {}}>}
 */
const selectadminminknowledgefun = async function (data) {
    let count = `SELECT COUNT(1) AS count FROM minknowledge`;
    let sqlselecgame = `SELECT * FROM minknowledge  LIMIT ${data.page},${data.limit}`;
    let mysqldatalist = await mysqld(sqlselecgame).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql
    })

    let mysqldatacount = await mysqld(count).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql[0].count
    })

    let obj = {
        code: 1,
        msg: "失败",
        data: {}
    }
    if (mysqldatalist.length > 0) {
        obj.code = 1;
        obj.msg = "成功";
        obj.data = {
            row: mysqldatalist,
            count: mysqldatacount
        }
    }
    return obj;
}


/***
 *
 * 微信用户 ：  SELECT COUNT(1) FROM commonuserinfo

 运动员 ：   SELECT COUNT(1) FROM athletes

 比赛项目 ：  SELECT COUNT(1) FROM competitionitem
 *
 * @returns {Promise<void>}
 */
const indexparameterfun = async function () {
    let countwxuserinfo = `SELECT COUNT(1) as count FROM commonuserinfo`;
    let athletesinfosql = `SELECT COUNT(1) as count FROM athletes`;
    let gamedemo = `SELECT COUNT(1) as count FROM competitionitem`;
    let wxusercount = await mysqld(countwxuserinfo).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql[0].count
    })

    let athletesuserinfo = await mysqld(athletesinfosql).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql[0].count
    })

    let gameuserdata = await mysqld(gamedemo).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql[0].count
    })

    return {
        wxusercount,
        athletesuserinfo,
        gameuserdata
    }
}


/***
 * 导出对应的分院校的观众数
 */

const collagename = async function () {
    let sqlcollagename = `SELECT college,COUNT(college) as count  FROM commonuserinfo GROUP BY college`
    let sqlgroup = await mysqld(sqlcollagename).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql;
    })
    let  signsql = `SELECT college,COUNT(college) as countsign  FROM commonuserinfo WHERE sign=1 GROUP BY college`
    let signsqlsql = await mysqld(signsql).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql;
    })

    console.log(sqlgroup , signsqlsql)
    let  datalistto = [];

    sqlgroup.forEach((item,index)=>{
        let  obj = {
            college :item.college,
            allcount:item.count,
            countsign:0,
        }
        signsqlsql.forEach((item2,index2)=>{
         if(item2.college == item.college){
             obj.countsign = item2.countsign
         }
        })
        datalistto.push(obj)
    })


    console.log("数据是：",datalistto)
    let datapush = []
    let abcdeff = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "D", "E",]
    datalistto.forEach((item, index) => {
        let obj = {
            guanzhong: "观众席" + abcdeff[index] + "区",
            time: "2022-5-6 " + (7 + index) + ":00",
            college: item.college,
            allcount: item.allcount.toString(),
            countsign:item.countsign.toString()
        }
        datapush.push(obj)
    })
    var headers = [
        {
            title: "学院",
            key: "college",
        },
        {
            title: "观众位置",
            key: "guanzhong",
        },
        {
            title: "观众人数",
            key: "allcount",
        },
        {
            title: "签到人数",
            key: "countsign",
        },
        {
            title: "时间",
            key: "time",
        }
    ]
    let resovess = await excel_sheng(datapush, headers);
    let obj = {
        code: 0,
        msg: "导出失败",
        url: ""
    }
    if (resovess == 1) {
        obj.code = 1;
        obj.msg = "导出成功";
        obj.url = "/excelfile/goods.xlsx"
    }
    return obj;


}

/***
 * 导出数据的接口方法
 * @param data
 * @returns {Promise<void>}
 * @constructor
 */
const Exceldaochufun = async function (data) {
    console.log("数据：", data)
    let datalistselec = await Exceldaochu(data);
    var headers = [
        {
            title: "学号",
            key: "studentid",
        }, {
            title: "邮箱",
            key: "email",
        }, {
            title: "名字",
            key: "nickName",
        }, {
            title: "学院",
            key: "college",
        },
        {
            title: "性别",
            key: "gender",
            r: (val) => {
                let data = val * 1 == 1 ? "男" : "女"
                return data
            },
        },
        {
            title: "手机号",
            key: "iphonenumber",
        },
        {
            title: "位置",
            key: "address",
        },{
            title: "是否签到",
            key: "sign",
            r: (val) => {
                let data = val == 1 ? "是" : "否"
                return data
            },
        },
    ]
    let resovess = await excel_sheng(datalistselec, headers);
    let obj = {
        code: 0,
        msg: "导出失败",
        url: ""
    }
    if (resovess == 1) {
        obj.code = 1;
        obj.msg = "导出成功";
        obj.url = "/excelfile/goods.xlsx"
    }
    return obj;
}

/***
 * Excel导出用于数据
 * @param data
 * @returns {Promise<{msg: string, code: number, data: []}>}
 */
const Exceldaochu = async function (data) {
    let sqlselecgame = `SELECT * FROM commonuserinfo`;
    //需要修改
    if (data.college != 0 && data.sign != 3) {
        console.log(3)
        sqlselecgame = `SELECT * FROM commonuserinfo  where college="${data.college}" AND sign=${data.sign}`;
        count = `SELECT COUNT(1) AS count FROM commonuserinfo where college="${data.college}" AND sign=${data.sign}`;
    } else if (data.college != 0) {
        sqlselecgame = `SELECT * FROM commonuserinfo  where college="${data.college}"`;
        count = `SELECT COUNT(1) AS count FROM commonuserinfo where college="${data.college}"`;
    } else if (data.sign != 3) {
        console.log(2)
        sqlselecgame = `SELECT * FROM commonuserinfo  where sign=${data.sign}`;
        count = `SELECT COUNT(1) AS count FROM commonuserinfo where sign=${data.sign}`;
    }
    return await mysqld(sqlselecgame).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql
    })
}


/***
 * 对应的签到表的信息
 * @param data
 * @returns {Promise<{msg: string, code: number, data: []}>}
 */
const selectwxuserinfo = async function (data) {
    let count = `SELECT COUNT(1) AS count FROM commonuserinfo`;
    let sqlselecgame = `SELECT * FROM commonuserinfo  LIMIT ${data.page},${data.limit}`;
    let groupexselectsql = `SELECT college  FROM commonuserinfo GROUP BY college`;
    //需要修改
    if (data.college != 0 && data.sign != 3) {
        sqlselecgame = `SELECT * FROM commonuserinfo  where college="${data.college}" AND sign=${data.sign} LIMIT ${data.page},${data.limit}`;
        count = `SELECT COUNT(1) AS count FROM commonuserinfo where college="${data.college}" AND sign=${data.sign}`;
    } else if (data.college != 0) {
        sqlselecgame = `SELECT * FROM commonuserinfo  where college="${data.college}" LIMIT ${data.page},${data.limit}`;
        count = `SELECT COUNT(1) AS count FROM commonuserinfo where college="${data.college}"`;
    } else if (data.sign != 3) {
        sqlselecgame = `SELECT * FROM commonuserinfo  where sign=${data.sign} LIMIT ${data.page},${data.limit}`;
        count = `SELECT COUNT(1) AS count FROM commonuserinfo where sign=${data.sign}`;
    }
    let groupexselect = await mysqld(groupexselectsql).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql
    })

    let mysqldatagame = await mysqld(sqlselecgame).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql
    })
    let mysqldatacount = await mysqld(count).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql[0].count
    })
    let obj = {
        code: 1,
        msg: "无数据",
        data: [],
    }
    console.log(mysqldatacount)
    if (mysqldatacount > 0) {
        obj.code = 1;
        obj.msg = "获取成功";
        obj.data = {
            row: mysqldatagame,
            count: mysqldatacount,
            group: groupexselect
        }
    }
    return obj;
}


/***
 * 更新比赛的信息
 * @param data
 * @returns {Promise<{msg: string, start: number}>}
 */
const gameinfoUploudfun = async function (data) {
    let gameinfoUploudsql = `UPDATE competitionitem SET begintime="${data.begintime}",competition="${data.competition}",endtime="${data.endtime}",
    firstone="${data.firstone}",firstthree="${data.firstthree}",firsttwo="${data.firsttwo}",
    gamegender=${data.gamegender},projectcategory=${data.projectcategory},projectid="${data.projectid}",
    projectname="${data.projectname}",refereesname="${data.refereesname}" WHERE projectid="${data.projectid}"`;

    let gameinfoUploudreq = await mysqld(gameinfoUploudsql).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql.affectedRows;
    })
    let obj = {
        start: 0,
        msg: "更新失败"
    }
    if (gameinfoUploudreq == 1) {
        obj.start = 1;
        obj.msg = "更新成功";
    }
    return obj;
}


/***
 * 删除比赛的单个项目
 * @param projectid
 * @returns {Promise<{msg: string, start: number}>}
 */
const gameinfoDeletefun = async function (projectid) {
    let mysqlgamedelete = `DELETE FROM competitionitem WHERE projectid="${projectid}"`
    let startsqldelete = await mysqld(mysqlgamedelete).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql.affectedRows;
    })
    let obj = {
        code: 0,
        msg: "删除失败"
    }
    if (startsqldelete == 1) {
        obj.code = 1;
        obj.msg = "删除成功";
    }
    return obj;
}

/***
 * 查询比赛的项目的全部信息
 */
const gameinfoSelectfun = async function (data) {
    let count = `SELECT COUNT(1) AS count FROM competitionitem`;
    let sqlselecgame = `SELECT * FROM competitionitem  LIMIT ${data.page},${data.limit}`;
    if (data.projectcategory != 0) {
        sqlselecgame = `SELECT * FROM competitionitem  where projectcategory=${data.projectcategory} LIMIT ${data.page},${data.limit}`;
        count = `SELECT COUNT(1) AS count FROM competitionitem where projectcategory=${data.projectcategory}`;
    }
    let mysqldatagame = await mysqld(sqlselecgame).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        let getTime = new Date().getTime();
        let objdata = []
        datalistsql.forEach((item, index) => {
            if (item.begintime < getTime && item.endtime > getTime){ //正在进行
                item.start = 1;
            }else if(item.begintime < getTime && item.endtime < getTime ){ //已经结束
                item.start = 3
            }else if(item.begintime > getTime && item.endtime > getTime ){ //未开始
                item.start = 2
            }
            item.begintime = gettimedayretu(item.begintime * 1).all_time;
            item.endtime = gettimedayretu(item.endtime * 1).all_time;
                objdata.push(item)
        })
        return objdata
    })
    let mysqldatacount = await mysqld(count).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql[0].count
    })
    let obj = {
        code: 1,
        msg: "无数据",
        data: [],
    }
    if (mysqldatacount > 0) {
        obj.code = 1;
        obj.msg = "获取成功";
        obj.data = {
            row: mysqldatagame,
            count: mysqldatacount
        }
    }
    return obj;
}

/***
 * 比赛项目的录入
 * @returns {Promise<void>}
 */
const gameinfoinsertfun = async function (data) {
    let sqlinsert = `INSERT INTO competitionitem(projectid,projectname,projectcategory,competition,refereesname,begintime,endtime,gamegender)
VALUES ("${data.projectid}","${data.projectname}",${data.projectcategory},"${data.competition}","${data.refereesname}","${data.begintime}","${data.endtime}",${data.gamegender})`
    let mysqldata = await mysqld(sqlinsert).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql.affectedRows;
    })
    let obj = {
        start: 0,
        msg: "添加失败"
    }
    if (mysqldata == 1) {
        obj.start = 1;
        obj.msg = "添加成功";
    }
    return obj;


}


/**
 * 删除运动员
 * @param athletesid
 * @returns {Promise<{msg: string, start: number}>}
 */
const deleteathletes = async function (athletesid) {
    let mysqldata = `DELETE FROM athletes WHERE athletesid="${athletesid}"`
    let startsql = await mysqld(mysqldata).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql.affectedRows;
    })
    let obj = {
        start: 0,
        msg: "删除失败"
    }
    if (startsql == 1) {
        obj.start = 1;
        obj.msg = "删除成功";
    }
    return obj;
}


/***
 * 修改运动员的信息
 * @param data
 */
const uploudathletesfun = async function (data) {
    let sqlinsert = `UPDATE athletes SET collegename="${data.collegename}",studentid="${data.studentid}",projectid="${data.projectid}",projectname="${data.projectname}",
    collegeid="${data.collegeid}",nickname="${data.nickname}",gender="${data.gender}" WHERE athletesid="${data.athletesid}"`;
    let startsql = await mysqld(sqlinsert).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql.affectedRows;
    })
    let obj = {
        start: 0,
        msg: "更新失败"
    }
    if (startsql == 1) {
        obj.start = 1;
        obj.msg = "更新成功";
    }
    return obj;

}

/**
 * 运动员的分页查询
 * @param data
 * @returns {Promise<unknown>}
 * @constructor
 */
const Selectathletesfun = async function (data) {
    let sqlselectath = `SELECT * FROM athletes  LIMIT ${data.page},${data.limit}`;
    let count = `SELECT COUNT(1) AS count FROM athletes`;
    if (data.college != 0 && data.gender != 3) {
        sqlselectath = `SELECT * FROM athletes  where collegename="${data.college}" AND gender=${data.gender} LIMIT ${data.page},${data.limit}`;
        count = `SELECT COUNT(1) AS count FROM athletes where collegename="${data.college}" AND gender=${data.gender}`;
    } else if (data.college != 0) {
        sqlselectath = `SELECT * FROM athletes  where collegename="${data.college}" LIMIT ${data.page},${data.limit}`;
        count = `SELECT COUNT(1) AS count FROM athletes where collegename="${data.college}"`;
    } else if (data.gender != 3) {
        sqlselectath = `SELECT * FROM athletes  where gender=${data.gender} LIMIT ${data.page},${data.limit}`;
        count = `SELECT COUNT(1) AS count FROM athletes where gender=${data.gender}`;
    }

    let mysqldata = await mysqld(sqlselectath).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql
    })
    let mysqldatacount = await mysqld(count).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        return datalistsql[0].count
    })

    let obj = {
        code: 0,
        msg: "无数据",
        data: {}
    }
    if (mysqldatacount > 0) {
        obj.code = 1;
        obj.msg = "获取成功";
        obj.data = {
            row: mysqldata,
            count: mysqldatacount
        }
    }

    return obj;

}
/**
 * 上传后读取到数据库里面去
 * @returns {{msg: string, data: {}, start: number}}
 * @constructor
 */

const ExcelFileread = function () {
// 读取Excel
    let dir = path.join("./public/excelfile", "/FileExcel.xlsx") //用join把两个字符串拼接起来
    let exceldata = xlsx.parse(dir)
    console.log(exceldata)
    for (let rowId in exceldata[0]['data']) {
        let row = exceldata[0]['data'][rowId]
        if (rowId != 0) {
            let obj = {}
            obj.athletesid = row[0];
            obj.projectid = row[1]
            obj.projectname = row[2]
            obj.collegeid = row[3]
            obj.collegename = row[4]
            obj.studentid = row[5]
            obj.nickname = row[6]
            obj.gender = row[7]
            obj.competition = row[8]
            Excelinsertdata(obj)
        }
    }
    let obj = {
        start: 1,
        msg: "成功导入",
        data: {}
    }
    return obj
}
/***
 * 读取到的数据导入数据库
 * @param data 对应的数据信息
 * @constructor
 */

const Excelinsertdata = function (data) {
    let sqlinsert = `INSERT INTO athletes(athletesid,projectid,projectname,collegeid,collegename,studentid,nickname,gender,competition)
VALUES ("${data.athletesid}","${data.projectid}","${data.projectname}","${data.collegeid}","${data.collegename}","${data.studentid}","${data.nickname}","${data.gender}","${data.competition}")`
    let mysqldata = mysqld(sqlinsert).then((e) => {
        console.log(e)
    })
}


/***
 * 管理员登录
 * @param username
 * @param pwd
 * @returns {Promise<{msg: string, data: string, start: number}>}
 * @constructor
 */
const Adminlogin = function (username, pwd) {
    let sqlselect = `select * from adminuserinfo where username="${username}" and pwd="${pwd}" `
    return mysqld(sqlselect).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        let obj = {
            start: 0,
            msg: "请求错误",
            data: "",
        }
        if (datalistsql.length != 0) {
            obj.start = 1;
            obj.msg = "请求成功";
            obj.data = datalistsql[0]
        }
        return obj;
    })
}


module.exports = {
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
    insertadminminknowledgfun,
    deleteadminminknowledge,
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



}
