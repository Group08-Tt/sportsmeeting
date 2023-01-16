const express = require('express');
const ejs = require('ejs');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session') //session 的包引入
const bodyParser = require('body-parser')
const app = express();
const {readnomodel} = require("./res/js/fs/fs");
const {Time_ietr_s} = require("./res/js/timed_task/timed_task");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const img_api = require('./routes/imgapi');
// const excel_ce = require('./routes/excel');
const api = require('./routes/api');
// const ceshidemo = require('./routes/ceshidemo');
const bs = require("./routes/bs");

//配置ejs模板引擎
app.engine('html', ejs.__express);
app.set("view engine", "html");
//配置session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*5,//多少秒过期
        secure: false
    },
    rolling:false,//就是如果是否开启这个session在未开启就被时间重置
}))
//配置bodyParser
Time_ietr_s(); //执行定时器

//拦截器

// app.all('/bs/*',function (request,response,next) {
//
// console.log("我进入了拦截器")
//
//
// })




app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //这是放静态资源文件
app.use('/',express.static(path.join(__dirname+'/staticwabpage','static')))
app.use('/ceshi',express.static(path.join(__dirname+'/staticwabpage','dist')))
// app.use('/onnew',express.static(path.join(__dirname+'/staticwabpage','onnew')))
app.use('/',indexRouter);
// app.use("/imgapi",img_api);
// app.use("/excel",excel_ce);
app.use("/api",api)
app.use('/users', usersRouter);
// app.use("/ceshidemo",ceshidemo);
app.use("/bs",bs)
// catch 404 and forward to error handler   这个 是文件他为404的话那么他就会被跳转到下面这个函数里面执行
app.use(async function(req, res, next) {
    //这里的原理就是先读取对应的文件的信息然后的话就是send到前端显示
    let Stringne = await readnomodel('./views/error.html');
    res.send(Stringne);
});

module.exports = app;
