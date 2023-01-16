import {
	isWeChat
} from '@/commen/serve/util.js';
import env from '@/commen/serve/env.js'
let api_domain = env.REQUEST_API
const serve = {

	// ----------------------路由----------------------
	//关闭所有页面，跳转到对应的页面
	uni_reLaunch: function(url) {
		uni.reLaunch({
			url
		});
	},
	//跳转到下一个页面，这个页面会被保存，最高9层
	uni_navigateTo: function(url) {
		uni.navigateTo({
			url: url
		});
	},
	//关闭当前页面，跳转到对应的页面
	uni_redirectTo: function(url) {
		uni.redirectTo({
			url: url
		});
	},
	// -*------------------------------服务-----------------------------
	//显示提示对应的信息，两秒后消失
	toast: function(tips) {
		uni.showToast({
			title: tips || "出错啦~",
			icon: 'none',
			duration: 2000
		})
	},
	// 缓存用户的信息
	setStorage_userinfo: function(userinfo) {
		uni.setStorageSync("userinfo", userinfo)
	},
	//获取对应的用户信息
	getStorage_userinfo: function() {
		return uni.getStorageSync("userinfo")
	},
	//设置对应的额token信息
	setToken: function(token) {
		uni.setStorageSync("token", token)
	},
	//获取对应的token
	getToken() {
		return uni.getStorageSync("token")
	},
	//判断是否是登录的状态
	isLogin: function() {
		return uni.getStorageSync("token") ? true : false
	},
	//退出登录
	logout: function() {
		uni.removeStorageSync("token");
		uni.removeStorageSync('userInfo');
		uni.removeStorageSync('pid');
		serve.toast('登出成功')
		uni.reLaunch({
			url: '/pages/index/index'
		})
	},
	// 获取当前环境
	getPlatform() {
		let platform = 'h5';
		// #ifdef H5
		platform = isWeChat() ? 'wechat' : 'h5';
		// #endif
		// #ifdef MP-WEIXIN
		platform = 'mp-wx'
		// #endif
		// #ifdef MP-ALIPAY	
		platform = 'mp-ali'
		// #endif
		// #ifdef MP-BAIDU
		platform = 'mp-bd'
		// #endif
		// #ifdef MP-TOUTIAO
		platform = 'mp-tt'
		// #endif
		// #ifdef APP-PLUS
		platform = 'app'
		// #endif
		return platform;
	},
	// 下面是封装对应的上传文件的操作的
	/***
		this.$http.uploadFileserve({
			
		}).then((res)=>{
			
		})

	**/
	uploadFileserve: function(uploudPath) {
		let ff = {
			url: "http://www.baidu.com",
			tempFilePaths: [], //对应的本地文件
			filename: "", //文件名字。上传到后端是需要的
			formData: {}, //对应字段
		}
		new Promise((resove, reject) => {
			let uploadFile =  uni.uploadFile({
				url: uploudPath.url,
				filePath: uploudPath.tempFilePaths,
				name: uploudPath.filename,
				formData: uploudPath.formData,
				success: (res) => {
					resove(res.data);
				}
			})
		})
	},


	request: function(requestData) {
		let url = requestData.url;
		let postData = requestData.data;
		let method = requestData.method;
		let showLoading = requestData.showLoading;
		let Platform = serve.getPlatform();
		//接口请求
		method = (method === 'post' || method === 'POST') ? 'POST' : 'GET';
		//是否显示对应的加载效果
		if (showLoading) {
			uni.showLoading({
				mask: true,
				title: '请稍候...'
			})
		}
		//获取对应的token数据
		const access_token = serve.getToken() || "";
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				data: postData,
				header: {
					'content-type': 'application/json',
					'token': access_token, //token的值
					'iswhatapp': Platform
				},
				method: method,
				dataType: 'json',
				success: (res) => {
					if (res.statusCode === 500) {
						serve.toast("服务错误~")
						reject(res)
					}
					uni.hideLoading()
					resolve(res.data)
				},
				fail: (res) => {
					// #ifndef APP-PLUS
					serve.toast("网络不给力，请稍后再试~")
					// #endif
					reject(res)
				}
			})
		})
	}
}
module.exports = {
	request: serve.request,
	getPlatform: serve.getPlatform,
	logout: serve.logout,
	isLogin: serve.isLogin,
	getToken: serve.getToken,
	setToken: serve.setToken,
	toast: serve.toast,
	uni_redirectTo: serve.uni_redirectTo,
	uni_navigateTo: serve.uni_navigateTo,
	uni_reLaunch: serve.uni_reLaunch,
	setStorage_userinfo: serve.setStorage_userinfo,
	getStorage_userinfo: serve.getStorage_userinfo,
}
