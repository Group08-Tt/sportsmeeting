
/**
 * @param {Object} year 年
 * @param {Object} month 月
 * 返回的是对应的月的天数
 */
function getMonthDay(year, month) {
   let days = new Date(year, month, 0).getDate()
   return days
}

/**
 * @param {Object} nyr 输入年月日  
 * {return} 输出对应的星期天数   2022-2-24
 */

function getdaytime (nyr){
	let date_day = new Date(nyr).getDay();
	return date_day
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
		yesr_time_day:datetime.getFullYear() + "-" + (datetime.getMonth()*1+1) + "-" + datetime.getDate()
	}
	return obj;
} 
/**
 * @param {Object} year 年
 * @param {Object} month 月
 * 
 作用:输入对应的年月 ，
 return 的是对应的增加一个月 和减少一个月的天数
 
 */
function judge(year, month){
	let addmotn = month + 1;
	let rexmoth = month - 1;
	let addmonth = addmotn == 13 ? 31 : getMonthDay(year,addmotn);
	let reduce = rexmoth == 0 ? 31 : getMonthDay(year,rexmoth);
	let obj = {
		addmonth,
		reduce,
	}
	return obj;
}


module.exports = {
	getMonthDay,
	getdaytime,
	gettimeday,
	judge,
	gettimedayretu
}