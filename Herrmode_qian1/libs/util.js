

//公共js，主要做表单验证，以及基本方法封装
const utils = {
	// 是否为空
	isNullOrEmpty: function(value) {
		return (value === null || value === '' || value === undefined) ? false : true;
	},
	// 去除空格
	trim: function(value) {
		return value.replace(/(^\s*)|(\s*$)/g, "");
	},
	// 是否为手机号
	isMobile: function(value) {
		return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(value);
	},
	// 金额，只允许保留两位小数
	isFloat: function(value) {
		return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(value);
	},
	// 是否全为数字
	isNum: function(value) {
		return /^[0-9]+$/.test(value);
	},
	// 是否8~20位数字和字母组合
	checkPwd: function(value) {
		return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value);
	},
	/**
	 * 格式化手机号码 
	 * @param {string} num 
	 * @returns 134****2222
	 */ 
	formatNum: function(num) {
		if (utils.isMobile(num)) {
			num = num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
		}
		return num;
	},
	/**
	 * 金额格式化
	 * @param {string | number} money 
	 * @returns { string } "1,255,454.00"
	 */
	rmoney: function(money) {
		return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(
			/\,$/, '').split('').reverse().join('');
	},
	// 使用全局过滤器
	formatDate: function(formatStr, fdate) {
		//日期格式化
		if (fdate) {
			if (~fdate.indexOf('.')) {
				fdate = fdate.substring(0, fdate.indexOf('.'));
			}
			fdate = fdate.toString().replace('T', ' ').replace(/\-/g, '/');
			var fTime, fStr = 'ymdhis';
			if (!formatStr)
				formatStr = "y-m-d h:i:s";
			if (fdate)
				fTime = new Date(fdate);
			else
				fTime = new Date();
			var month = fTime.getMonth() + 1;
			var day = fTime.getDate();
			var hours = fTime.getHours();
			var minu = fTime.getMinutes();
			var second = fTime.getSeconds();
			month = month < 10 ? '0' + month : month;
			day = day < 10 ? '0' + day : day;
			hours = hours < 10 ? ('0' + hours) : hours;
			minu = minu < 10 ? '0' + minu : minu;
			second = second < 10 ? '0' + second : second;
			var formatArr = [
				fTime.getFullYear().toString(),
				month.toString(),
				day.toString(),
				hours.toString(),
				minu.toString(),
				second.toString()
			]
			for (var i = 0; i < formatArr.length; i++) {
				formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
			}
			return formatStr;
		} else {
			return "";
		}
	},
	// 秒级时间戳转标准时间格式 -- 使用全局过滤器
	toFormatDate: function (value) {
		let date = new Date(value*1000);
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
	},
	// 大于1w的数据处理
	numSystemVal: function (val) {
		if(val*1<10000){
			val = (val*1).toFixed(2);
		}else{
			if((val*1)%10000==0){
				val = parseInt((val*1)/10000)+'万'
			}else{
				val = parseInt((val*1)/10000)+'万+'
			}
		}
		return val
	},
	// 大于1w的数据处理--(小于10000不做处理，大于10000:1W+)
	numFormatVal: function (val) {
		if(val*1<10000){
			val = val;
		}else{
			if((val*1)%10000==0){
				val = parseInt((val*1)/10000)+'万'
			}else{
				val = parseInt((val*1)/10000)+'万+'
			}
		}
		return val
	},
	
	/**
	 * author hp
	 * msg 判断是否为微信浏览器 
	 */
	isWeChat: function() {
		// #ifdef H5
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		}
		return false;
		// #endif
	}, 
	/**
	 * 获取省市区
	 * res: Obj
	 * res.address：省市区字符串
	 * res.name： 详细地址
	 * */
	getAddrInfo(res) {
		let regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/
		let REGION_PROVINCE = []
		let addressBean = {
			REGION_PROVINCE: null,
			REGION_COUNTRY: null,
			REGION_CITY: null,
			ADDRESS: null,
		}
		// 方法
		function regexAddressBean(address, addressBean) {
			// regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
			regex = /^(.*?[市]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g
			let addxress = regex.exec(address)
			addressBean.REGION_CITY = addxress[1] //市
			addressBean.REGION_COUNTRY = addxress[2] //区
			addressBean.ADDRESS = addxress[3] + res.name //详细地址
		}
	
		if (!(REGION_PROVINCE = regex.exec(res.address))) {
			regex = /^(.*?(省|自治区))(.*?)$/
			addressBean.REGION_PROVINCE = regex.exec(res.address)[1] //省
			regexAddressBean(regex.exec(res.address)[3], addressBean)
		}
		return addressBean
	},
}
export const isNullOrEmpty = utils.isNullOrEmpty
export const trim = utils.trim
export const isMobile = utils.isMobile
export const isFloat = utils.isFloat
export const isNum = utils.isNum
export const checkPwd = utils.checkPwd
export const formatNum = utils.formatNum
export const rmoney = utils.rmoney
export const formatDate = utils.formatDate
export const numSystemVal = utils.numSystemVal
export const toFormatDate = utils.toFormatDate
export const numFormatVal = utils.numFormatVal
export const isWeChat = utils.isWeChat
export const getTempFile = utils.getTempFile
export const getAddrInfo = utils.getAddrInfo

// #ifdef MP-WEIXIN
// 微信小程序分享
export const wxShare = function(title, path, img, desc) {
	let mall_name = ''
	if (uni.getStorageSync('mall_config')) mall_name = JSON.parse(uni.getStorageSync('mall_config')).mall_setting.setting.name
	let mall_id = uni.getStorageSync("mall_id");
	let token = uni.getStorageSync("token");
	let shareInfo = {
		title: title || mall_name,
		imageUrl: img || '',
	};

	if (path && typeof(path) == "string") {
		shareInfo.path = path;
	} else if (path === undefined) {
		// shareInfo.path = base.share.path;
		shareInfo.path = '/pages/index/index';
	}
	if (shareInfo.path.indexOf("?") >= 0) {
		shareInfo.path += "&mall_id=" + mall_id;
	} else {
		shareInfo.path += "?mall_id=" + mall_id;
	}
	// shareInfo.path += "&mall_id=5";
	if (token) {
		let userInfo = JSON.parse(uni.getStorageSync("userInfo"));
		shareInfo.path += "&pid=" + userInfo.user_id;
	}

	if (desc) {
		shareInfo.desc = desc;
	}
	console.log(shareInfo, 'shareInfo')
	return shareInfo;
}
// #endif

//支付（APP微信支付、APP支付宝支付、微信小程序支付）
export const setPay = function(payInfo, callback, payment_way) {
	let platform = getPlatform();
	// 等接口里面的参数
	let payData = {
		success: function(res) {
			callback && callback({
				success: true,
				data: res
			});
			console.log('success:' + JSON.stringify(res));
		},
		fail: function(err) {
			callback && callback({
				success: false,
				data: err
			});
			console.log('fail:' + JSON.stringify(err));
		}
	};
	if (platform == 'mp-wx') {
		// 小程序
		payData.provider = 'wxpay';
		payData.timeStamp = payInfo.timestamp;
		payData.nonceStr = payInfo.nonceStr;
		payData.package = payInfo.package;
		payData.signType = payInfo.signType;
		payData.paySign = payInfo.paySign;
	} else if (platform == 'wxpay') {
		// app微信
		payData.provider = 'wxpay';
		payData.orderInfo = data;
	} else if (platform == 'alipay') {
		// app 支付宝
		payData.provider = 'alipay';
		payData.orderInfo = data;
	} else if (platform == 'baidu') {
		payData.provider = 'baidu';
		payData.orderInfo = data;
	} else if (platform == 'app') {
		if (payment_way == 'wechat') { // 微信
			payData.provider = 'wxpay';
			payData.orderInfo = JSON.stringify(payInfo);
		} else if (payment_way == 'alipay') { // 支付宝
			payData.provider = 'alipay';
			payData.orderInfo = payInfo;
		}
		
	}

	uni.requestPayment(payData);

}

export const navBack = function() {
	//返回方法
	let routes = getCurrentPages();
	if (routes.length == 1) {
		uni.redirectTo({
			url: '/pages/index/index'
		})
	} else {
		uni.navigateBack();
	}
}

export const globalSet = function(str, val = '重新申请') {
	if (uni.getStorageSync('mall_config')) {
		if (str == 'textCol') { //红色字&红按钮
			return JSON.parse(uni.getStorageSync('mall_config')).global_color.global_text_color;
		} else if (str == 'imgUrl') {
			return JSON.parse(uni.getStorageSync('mall_config')).top_pic_url;
		} else if (str == 'couponImg') { //购物券背景图
			return JSON.parse(uni.getStorageSync('mall_config')).global_color.coupon_pic_url;
		} else if (str == 'navBg') { //tabBar背景色
			return JSON.parse(uni.getStorageSync('mall_config')).navbar.top_background_color;
		} else if (str == 'navCol') { //tabBar颜色
			return JSON.parse(uni.getStorageSync('mall_config')).navbar.top_text_color;
		} else if (str == 'btnCol') {
			var global_text_color = JSON.parse(uni.getStorageSync('mall_config')).global_color.global_text_color;
			return [{
				text: "取消",
				plain: true,
				col: global_text_color,
			}, {
				text: val,
				plain: false,
				col: global_text_color,
			}];
		}
	}

}

export const dateFormat = function(time) {
	var dates = new Date(time * 1000);
	var y = dates.getFullYear(),
		m = dates.getMonth() + 1,
		d = dates.getDate(),
		h = dates.getHours(),
		mm = dates.getMinutes(),
		s = dates.getSeconds();
	return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

let count = 1;
export const get_is_share_mandatory_login = function () {
	let state = -1;
	let data = uni.getStorageSync('mall_config');
	if (data) {
		try {
			let config = JSON.parse(data)
			state = config.mall_setting.setting.is_share_mandatory_login || 0
		} catch (e) {
			state = 0
		}
	}
	return state
}

export const isPidToLogin = function () {
	if (count > 5) {
		uni.clearStorageSync()
		return
	} // 清理全部缓存
	let routes = getCurrentPages() // 获取当前打开过的页面路由数组
	let filterRoute = ["pages/public/login"] // 白名单
	let is_share_mandatory_login = get_is_share_mandatory_login()
	if (!routes.length && is_share_mandatory_login === -1) { // 防止栈溢出 -- 需要限制调用次数
		// 解决异步 -- 请求未加载完成的
		setTimeout(() => {
			isPidToLogin()
		}, 100)
		return false
	} else if (is_share_mandatory_login == 0) { // 没有开启强制
		return false
	}
	let curParam = routes[routes.length - 1].options //获取路由参数
	let route = routes[routes.length - 1].route
	let pid = curParam.pid || uni.getStorageSync("pid") || 0
	let token = uni.getStorageSync("token")

	if (filterRoute.some(url => url === route)) {
		return false
	}
	if (pid && !token) {
		uni.navigateTo({
			url: "/pages/public/login",
		})
	}
}
/**
 * 在需要强制登录地方退出时调用 - login页面卸载调用
 * 部分用户会点返回 - 根据返回是否token-pid-强制登录 - 去处理对应事件
 * @param {number}  tiemr  
 */
export function forceLogin(tiemr = 1000) {
	// 延迟调用，体验好
	setTimeout(() => {
		count++
		isPidToLogin()
	}, tiemr)
}

function add0(val) {
	return val < 10 ? '0' + val : val;
}