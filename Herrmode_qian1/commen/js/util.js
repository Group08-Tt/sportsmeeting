

//验证邮箱
function checkEmail(email) {
	return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(email);
}
//验证手机号
function checkMobile(mobile){
	return RegExp(/^1[34578]\d{9}$/).test(mobile);
}
//验证两个值是否是相等的
function isequality(a,b){
	let iszt = false ;
	if(a == b && a != "" && b != ""){
		iszt =  true
	}
	return iszt
}

module.exports = {
	checkEmail, //验证对应的邮箱
	checkMobile,//验证手机号
	isequality,//验证是否相等
}
