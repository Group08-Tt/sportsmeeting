
const {webpakeurl} = require("../interserve/serve");

const exceldataget = async function(){
    //首先第一次是第一页 那么他请求完成之后判断一下，你这个是否有数据
    // 1.有数据  就把对应的数据放到数组里面去
    //2.无数据那么就直接退出 不要再调佣自己了
    // 最后返回数据到接口地点
return  new Promise(async (resolve,reject)=>{
    let datalist = [];
    let page = 1;
    let url = "http://nb.ncha.gov.cn/je/api/load?tableCode=BWG_NBLN&whereSql=AND+NB_ND+%3D+2020+AND+NB_S_NAME+%3D+%27%E8%B4%B5%E5%B7%9E%E7%9C%81%27&orderSql=&page=1&start=0&limit=93";
    // console.log(url)
    await webpakeurl(url,"UTF-8").then((e)=>{
        let dataso =  JSON.parse(e.text).rows
        console.log(dataso)

            for (let i=0;i<dataso.length;i++){
                let obj = {
                    NB_BWGJJ:"",//博物馆介绍
                    NB_BWGMC:"",//博物馆名称
                    NB_BWGXZ_NAME:"",//博物馆性质
                    NB_S_NAME:"",//行政区划
                    NB_FRLX_NAME:"",//法人类型
                    NB_TCLX_NAME:"",//题材类型
                    NB_LSCJ_NAME:"",//隶属层级
                    NB_SLSJ:"",//设立时间
                    NB_KFSJ:"",//全年开放时间
                    NB_MFKF:"",//免费开放
                    NB_GSDZ:"",//馆舍地址
                    NB_NDGZZS:"",//年度观众总数
                    NB_JBCLMJ:"",//馆舍建筑面积
                    NB_KFMJ:"",//库房面积
                    NB_JYKJMJ:"",//教育空间面积
                    NB_LXDH:"",//联系电话
                    NB_SHXYDM:"",//社会信用代码
                    NB_ZLDJ_NAME:"",//质量等级
                    NB_FRDJJG:"",//法人登记机关
                    NB_JBZ:"",//举办者
                    NB_FDDBR:"",//法定代表人
                    NB_KFRQ:"",//首次开放日期
                    NB_QNKFTS:"",//全年开放天数
                    NB_SJHDCC:"",//社教活动场次
                    NB_GSCQXZ:"",//馆舍产权性质
                    NB_ZTMJ:"",//展厅面积
                    NB_SYXFMJ:"",//实验修复面积
                    NB_GGFWMJ:"",//公共服务面积
                    NB_YZBM:"",//邮政编码
                    NB_DZYX:"",//电子邮箱
                    NB_HLWZ:"",//互联网址
                    NB_XMTZH:"",//新媒体帐号

                    NB_CPZS:"",//全部藏品
                    NB_SJWW:"",//馆藏珍贵文物
                }
                obj.NB_BWGJJ = " "+dataso[i].NB_BWGJJ; //博物馆介绍
                obj.NB_BWGMC = " "+dataso[i].NB_BWGMC;//博物馆名称
                obj.NB_BWGXZ_NAME = " "+dataso[i].NB_BWGXZ_NAME;//博物馆性质
                obj.NB_S_NAME = " "+dataso[i].NB_S_NAME + dataso[i].NB_SS_NAME + dataso[i].NB_X_NAME;//行政区划
                obj.NB_FRLX_NAME = " "+dataso[i].NB_FRLX_NAME;//法人类型
                obj.NB_TCLX_NAME = " "+dataso[i].NB_TCLX_NAME;//题材类型
                obj.NB_LSCJ_NAME = " "+dataso[i].NB_LSCJ_NAME;//隶属层级
                obj.NB_SLSJ = " "+dataso[i].NB_SLSJ;//设立时间
                obj.NB_KFSJ = " "+dataso[i].NB_KFSJ;//全年开放时间
                obj.NB_MFKF = " "+dataso[i].NB_MFKF;//免费开放
                obj.NB_GSDZ = " "+dataso[i].NB_GSDZ;//馆舍地址
                obj.NB_NDGZZS = " "+dataso[i].NB_NDGZZS;//年度观众总数
                obj.NB_JBCLMJ = " "+dataso[i].NB_JBCLMJ;//馆舍建筑面积
                obj.NB_KFMJ = " "+dataso[i].NB_KFMJ;//库房面积
                obj.NB_JYKJMJ = " "+dataso[i].NB_JYKJMJ;//教育空间面积
                obj.NB_LXDH = " "+dataso[i].NB_LXDH;//教育空间面积
                obj.NB_SHXYDM = " "+dataso[i].NB_SHXYDM;//社会信用代码
                obj.NB_ZLDJ_NAME = " "+dataso[i].NB_ZLDJ_NAME;//质量等级
                obj.NB_FRDJJG = " "+dataso[i].NB_FRDJJG;//法人登记机关
                obj.NB_JBZ = " "+dataso[i].NB_JBZ; //举办者
                obj.NB_FDDBR = " "+dataso[i].NB_FDDBR;//法定代表人
                obj.NB_KFRQ = " "+dataso[i].NB_KFRQ; //首次开放日期
                obj.NB_QNKFTS = " "+dataso[i].NB_QNKFTS; //全年开放天数
                obj.NB_SJHDCC = " "+dataso[i].NB_SJHDCC;//社教活动场次
                obj.NB_GSCQXZ = " "+dataso[i].NB_GSCQXZ;//馆舍产权性质
                obj.NB_ZTMJ = " "+dataso[i].NB_ZTMJ;//展厅面积
                obj.NB_SYXFMJ = " "+dataso[i].NB_SYXFMJ;//实验修复面积
                obj.NB_GGFWMJ = " "+ dataso[i].NB_GGFWMJ;//公共服务面积
                obj.NB_YZBM = " "+ dataso[i].NB_YZBM;//邮政编码
                obj.NB_DZYX = " "+ dataso[i].NB_DZYX;//电子邮箱
                obj.NB_HLWZ = " "+dataso[i].NB_HLWZ;//互联网址
                obj.NB_XMTZH = " "+dataso[i].NB_XMTZH;//互联网址

                obj.NB_CPZS = " "+dataso[i].NB_CPZS;//全部藏品
                obj.NB_SJWW = " "+dataso[i].NB_SJWW;//馆藏珍贵文物
                datalist.push(obj);
            }
            resolve(datalist); //返回的数据
            // page ++ ;
            // exceldataget()

    })

    })

}



module.exports = {
    exceldataget
}