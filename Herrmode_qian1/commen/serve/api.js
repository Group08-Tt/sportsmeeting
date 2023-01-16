import env from "./env.js"

const api_root = env.REQUEST_API; //对应的域名信息
const api = {
	api_root:api_root, //全局的域名地址
	api_image:api_root,
	//账户的 登录,注册，找回
	account_login_register_find:{
		Email_verification:api_root + '', //对应的验证码登录
		Email_login:api_root + '/api/login/commonaccountpassword' ,//邮箱密码登录
		Email_login_avgverification:api_root + '/api/login/accountloginverification',//登录的时候获取对应的验证码信息
		Email_register:api_root + '/api/login/commonregister', //对应的邮箱注册
		Email_register_emverrigin:api_root + '/api/login/verificationmail', //注册时候的邮箱验证
		Email_register_agreement:api_root + '/api/login/useragreement', //注册时候的用户协议
		Email_find:api_root + '/api/login/commonfindpassword' ,//找回密码
		Email_find_emverrigin:api_root + '/api/login/verificationmailfindpassword', //找回密码的验证
		Email_login_voluntarily:api_root + '/api/login/passwordvoluntarily', //自动邮箱验证自动登录
	},
	uploudfile:{
		fileindex: api_root + "/ceshidemo/uolouddemo" //设置对应的数据
	},
	indexall:{
		all_index_datalist:api_root + "/api/Soupindex/allindexdatalist",//主页的渲染数据
	},
	Tabbletwo:{
		datalistleft:"https://api.weitao.galaxy-x.cn/api/Category/list",
		datarequright:"https://api.weitao.galaxy-x.cn/api/Category/detail"
	},
	tabberdata:{
		navdata: api_root + "/bs/bsgwyy/datatabbernav", //扫航兰的信息
		datatabber: api_root + "/bs/bsgwyy/datatabber", //导航栏下面的数据的信息
		getdatapai: api_root + "/bs/bsgwyy/rankings", //排名
		accomplishlsitapi: api_root + "/bs/bsgwyy/accomplishlsit",
		selectminknowledgeapi : api_root + "/bs/bsgwyy/selectminknowledge",
		saishiapi: api_root + "/bs/bsgwyy/competition",
		signin: api_root + "/bs/bsgwyy/signlogin",
		getonedata: api_root + "/bs/bsgwyy/oneminknowledge", //获取一条数据
		modificationpassword: api_root + "/bs/bsgwyy/modificationpassword", //修改密码
	}
}

module.exports = {
	api:api,
	api_root:api_root
}





