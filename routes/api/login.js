var express = require('express');
var router = express.Router();
var md5 = require('md5');
const {random_number} = require('../../res/js/util/Mathshu');
const {emilt} = require('../../res/js/util/e-mail');
var multipart = require('connect-multiparty')();
let wxappid = ""; //微信小程序的appid
let wxsecret = "";//微信小程序 appSecret
let qqappid = ""; //qq小程序的appid
let qqappSecret = ""  //qq小程序的appSecret
var {
    openidlogin,
    wxlopgincode,
    tokenTime,
    accountloginverificationy,
    commonregisterjs,
    commonlogon,
    findcommonpassword,
    passwordvoluntarilyfunc
} = require('../../res/js/routerapi/apilogin');

router.get('/', async function (req, res, next) {
    let md5ce = md5("132456456")
    res.send(md5ce)
});


router.get('/ ', async function (req, res, next) {
    let verificationtoken = await tokenTime("9df6d7b3d383d5b73268ea9b5c3f7ccd");
    res.send("123");
});
//用户协议
router.get('/useragreement', async function (req, res, next) {
    res.send("<div style='color: #0e9a00'>重要提示： 请您仔细阅读以下条款，并确认您已完全理解本协议之规定，尤其是免除及限制责任的条款、知识产权条款、法律适用及争议解决条款。\n" +
        "\n" +
        "如您对本声明或本协议任何条款有异议，请停止注册或使用简书（包括jianshu.com、名称为“简书”的手机端、电脑等设备客户端应用程序，下同）软件及所提供的全部服务\n" +
        "\n" +
        "作者：简书\n" +
        "链接：https://www.jianshu.com/p/c44d171298ce\n" +
        "来源：简书\n" +
        "著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</div>");
});


/***
 * 找回密码
 */

router.post('/commonfindpassword', multipart, async function (request, response, next) {
    let sessioncode = request.session.findmailcode;
    let code = request.body.code;
    let iscodecompare = sessioncode == code ? true : false;
    let userobjx = {
        mail: request.body.mail,
        password: request.body.password,
    }
    if (iscodecompare && sessioncode && code) { //他们的code是相等的那么就返回给成功的登录信息
        await findcommonpassword(userobjx).then((e) => {
            response.json(e);
        })
    } else {
        response.json({
            start: 3,
            msg: "验证码错误",
        })
    }
});


/**
 * 默认登录方式的的账户和密码注册
 * 邮箱 密码 验证码 邀请码
 */
router.post('/commonregister', multipart, async function (request, response, next) {
    let code = request.body.code;
    let sessioncode = request.session.mailcode;
    let iscode = request.body.code === request.session.mailcode ? true : true
    // let invitationcode = request.body.invitationcode; //邀请码
    let usermessage = {
        username: request.body.username,
        gender: request.body.gender== "男"? 1:2,
        email: request.body.email,
        password: request.body.password,
        studentid:request.body.studentid,
        college:request.body.college,
        iphonenumber:request.body.iphonenumber,
    }
    if (true) { //他们的code是相等的那么就返回给成功的登录信息
        //查询邀请码是否正确，正确的话返回上一级的id属性 不正确的话那么就直接返回邀请码不正确 （留着）
        await commonregisterjs(usermessage).then((e) => {
            response.json({
                "start": 1,
                msg: "注册成功",
                userinfo: e
            });
        });
        //正确的话那么就执行注册登录
    } else {
        response.json({
            "start": 0,
            msg: "验证码错误",
        })
    }
});

/**
 * 默认的账户和密码登录
 */
router.post('/commonaccountpassword', multipart, async function (request, response, next) {
    response.statusCode = 201
    let sessioncode = request.session.code;
    let code = request.body.code;
    // let iscodecompare = sessioncode == code ? true : false;
    let userobj = {
        mail: request.body.mail,
        password: request.body.password,
    }
    await commonlogon(userobj).then((e) => {
        response.json(e);
    })
    // if (iscodecompare && sessioncode && code) { //他们的code是相等的那么就返回给成功的登录信息
    //
    // } else {
    //     response.json({
    //         start: 3,
    //         msg: "验证码错误",
    //     })
    // }
});


/**
 * qq小程序的code验证获取对应的加密信息 并向数据库里面去查  | 自动登录
 */
router.get('/qqcodeverification', async function (request, response, next) {
    response.statusCode = 201
    let code = request.query.code;
    let url = `https://api.q.qq.com/sns/jscode2session?appid=${qqappid}&secret=${qqappSecret}&js_code=${code}&grant_type=authorization_code`
    let datalistmode = await wxlopgincode(url);
    response.json(datalistmode);
});
/***
 * qq小程序的登录的
 */
router.get('/qqlogin', async function (request, response, next) {
    response.statusCode = 201
    let userinfo = {}
    userinfo.avatarUrl = request.query.avatarUrl;
    userinfo.gender = request.query.gender;
    userinfo.language = request.query.languageyu;
    userinfo.nickName = request.query.nickName;
    userinfo.region = request.query.region;
    userinfo.wxappid = qqappid;
    userinfo.wxsecret = qqappSecret;
    let code = request.query.code;
    let url = `https://api.q.qq.com/sns/jscode2session?appid=${qqappid}&secret=${qqappSecret}&js_code=${code}&grant_type=authorization_code`
    let datalistto = openidlogin(url, userinfo)
    datalistto.then((e) => {
        response.json(e);
    })
});


//下面是微信的登录的验证的信息

/***
 * 微信的自动登录使用的
 * 微信的自动登录使用的
 */
router.get('/codeverification', async function (request, response, next) {
    response.statusCode = 201
    let code = request.query.code;
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wxappid}&secret=${wxsecret}&js_code=${code}&grant_type=authorization_code`
    let datalistmode = await wxlopgincode(url);
    response.json(datalistmode);
});
/***
 * 微信小程序的登录的
 */
router.get('/wxlogin', async function (request, response, next) {
    response.statusCode = 201
    let userinfo = {}
    userinfo.avatarUrl = request.query.avatarUrl;
    userinfo.gender = request.query.gender;
    userinfo.language = request.query.languageyu;
    userinfo.nickName = request.query.nickName;
    userinfo.wxappid = wxappid;
    userinfo.wxsecret = wxsecret;
    let code = request.query.code;
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wxappid}&secret=${wxsecret}&js_code=${code}&grant_type=authorization_code`
    let datalistto = openidlogin(url, userinfo)
    datalistto.then((e) => {
        response.json(e);
    })
});
//------------------------------------------------------下面是登录各种的util接口-----------------------------------
/**
 * 账号密码自动登录
 * 接收token
 */
router.get('/passwordvoluntarily', async function (request, response, next) {
    let token = request.headers.token;
    await passwordvoluntarilyfunc(token).then((e) => {
        response.json(e)
    });
});


/***
 * 注册的时候验证邮箱
 */
router.post('/verificationmail', multipart, async function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");// 允许请求所有跨域 *
    let fromtouser = request.body.mail;
    let randowdyanz = random_number(6);
    request.session.mailcode = randowdyanz; //给session设置值
    let subjecttile = "验证注册"  //对应的标题
    let mailOptionshtml = "【邮箱验证】 您正在进行注册账户，验证码为" + randowdyanz + "，请勿将验证码泄露于他人，本条验证码有效期为5分钟"  //对应的内容
    await emilt(fromtouser, subjecttile, mailOptionshtml).then((e) => {
        response.json({
            start: 1,
            msg: "发送成功",
            data: e,
        });
    })
});

/***
 * 找回密码发送邮箱
 */
router.post('/verificationmailfindpassword', multipart, async function (request, response, next) {
    let fromtouser = request.body.mail;
    let randowdyanz = random_number(6);
    request.session.findmailcode = randowdyanz; //给session设置值
    let subjecttile = "找回密码"  //对应的标题
    let mailOptionshtml = "【邮箱验证】 您正在进行找回账户密码，验证码为" + randowdyanz + "，请勿将验证码泄露于他人，本条验证码有效期为5分钟"  //对应的内容
    await emilt(fromtouser, subjecttile, mailOptionshtml).then((e) => {
        response.json({
            start: 1,
            msg: "发送成功",
            data: e,
        });
    })
});

/**
 * 登录的时候获取对应的验证码信息
 */
router.get('/accountloginverification', multipart, async function (request, response, next) {
    await accountloginverificationy().then((e) => {
        let randomcode = e.randomcode; //对应的编码，需要存储在session中的数据
        request.session.code = randomcode; //给session设置值
        response.json({
            start: 1,
            msg: "请求成功",
            code: randomcode,
            imgsvg: e.imgsvg,
        })
    });
});


module.exports = router;
