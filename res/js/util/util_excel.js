const excelPort = require("excel-export");
const fs = require("fs");
/***
 * 功能: 把对应的数据拿过来就可以生成对应的表格文件  信息
 * @param json   json数据的信息   就是内容
 * @param headers   是对应的头文件    他可以设置对应的函数的信息就是把数据进行从新整理
 *
 * 使用:  就是对相应的 数据进行整理    json下面的名称就是herder下面的key
 *
 var json = [
 {
            name: "liu",
            createTime: 1597382897409,
            ceshi: "徐",
        },
 {
            name: "liu",
            createTime: 1597382897409,
            ceshi: "徐123456",
        }
 ]

 var headers = [
        {
            title: "买家名称",
            key: "name",
        },
 {
            title: "注册时间",
            key: "createTime",
            r: (val) => {
                var date = new Date(val);
                return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
            },
        },
 {
            title: "买家名称测试",
            key: "ceshi",
        },
 ];
 */

const  excel_sheng = function (json,headers) {
    return new Promise((reject,resolve)=>{
        const excelConf = {
            cols: [], // 表头
            rows: [], // 内容
        };
        // 表头
        excelConf.cols = headers.map((item) => {
                return { caption: item.title, type: "String" };
        });
        // 内容 这里的逻辑是 拿到 对应的数据后就
        excelConf.rows = json.map((item) => {
            var arr = [];
            headers.map((h_item) => {
                var a = item[h_item.key]; //拿到每一项的值  就是一个数组下面的
                var val = h_item.r ? h_item.r(a) : a; //这里的话就是重复的去看这个数组下面的这个是否有r函数 有的话就把这个参数传给他 不然就是原来的数据
                arr.push(val);
            });
            return arr;
        });
        console.log(excelConf)
        // 调用excelPort的方法，生成最终的数据
        const result = excelPort.execute(excelConf);
        // 写入文件 ， 没有追加这一回事了,如果后期可以的话可以写一个追加的功能
        //如果拓展的话有对应的文件目录的话那么就需要在下面创建目录。
        fs.writeFile("./public/excelfile/goods.xlsx", result, "binary", (err) => {
            if (!err) {
                console.log("生成成功！");
                reject(1);
            }
        });
    })
}




module.exports  = {
    excel_sheng
}
