const schedule = require('node-schedule');
const {jishitimed} = require('../util/ceshidemo');
/***
 *  const {Timed_taskrenwu} = require('./res/js/timed_task/timed_task'); //定时任务的文件
 *  下面是直接调用的是对应的函数
 * @constructor
 */
function Timed_taskrenwu(){
    schedule.scheduleJob('1-10 29 15 12 1 *',()=>{//下面是执行的事情
        console.log('scheduleCronstyle:' + new Date());
    });
}

/**
 * 设置对应的兴趣班每天超过时间后就减少对饮给的时间
 * @constructor
 */
function Time_ietr_s(){
    schedule.scheduleJob('0 58 23 * * *',()=>{//下面是执行的事情 执行数据的每天过了之后就数据减少操作
        jishitimed();
    });
}

module.exports = {
    Timed_taskrenwu,
    Time_ietr_s
};