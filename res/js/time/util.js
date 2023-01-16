function timeDate(){
       let datedata = date.getFullYear() + date.getMonth() + date.getDate();
       return datedata
}
function timeDateall(){
    const  date = new Date();
        let datedataall = date.getFullYear() + "-" + date.getMonth() + "-"
            + date.getDate()  + " "+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return datedataall
}
//获取到当前的时间戳
function gettimetimestamp(){
    const  date = new Date();
    let datatime =  Math.floor(date.getTime()/1000) ;
    return datatime
}
//获取对应的年月日
function gettimeday(){
    let datetime = new Date();
    let obj = {
        getfullyear:datetime.getFullYear(),//年
        getmonth:datetime.getMonth()*1+1,//月
        getdate:datetime.getDate(),//天
        gethours:datetime.getHours(),//小时
        getminutes:datetime.getMinutes(),//分钟
        getseconds:datetime.getSeconds(), //秒
        getmilliseconds:datetime.getMilliseconds(),//毫秒
        yesr_time_day:datetime.getFullYear() + "-" + (datetime.getMonth()*1+1) + "-" + datetime.getDate()
    }
    return obj;
}
//输入时间戳返回对应的年月日
function gettimedayretu(datedayretu){
    let datetime = new Date(datedayretu);
    let obj = {
        getfullyear:datetime.getFullYear(),//年
        getmonth:datetime.getMonth()*1+1,//月
        getdate:datetime.getDate(),//天
        gethours:datetime.getHours(),//小时
        getminutes:datetime.getMinutes(),//分钟
        getseconds:datetime.getSeconds(), //秒
        getmilliseconds:datetime.getMilliseconds(),//毫秒
        yesr_time_day:datetime.getFullYear() + "-" + (datetime.getMonth()*1+1) + "-" + datetime.getDate(),
        all_time:datetime.getFullYear() + "-" + (datetime.getMonth()*1+1) + "-" + datetime.getDate() + " " + datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds(),
    }
    return obj;
}
module.exports = {
    timeDate,
    timeDateall,
    gettimetimestamp,
    gettimedayretu,
    gettimeday
}