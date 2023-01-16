const multer = require('multer')
const path = require('path')
var sd = require('silly-datetime');
const mkdirp = require('mkdirp')

/***
 * 可以封装为一个自定义上传文件的一个模板把‘
 * @returns {Multer|undefined}
 */
function fileuploud() {
    const storage = multer.diskStorage({
        destination: async function (req, file, cb) {
            let day = sd.format(new Date(), 'YYYYMMDD'); //格式化日期
            let dir = path.join("./public/images", day) //用join把两个字符串拼接起来
            await mkdirp(dir) //用mkdirp创建对应的目录文件
            cb(null, dir)
        },
        filename: function (req, file, cb) {
            let extname = path.extname(file.originalname)
            let filename = Date.now() + extname
            cb(null, filename)
        }
    })
    const upload = multer({
        storage: storage,
    })
    return upload
}


function ExcelFile() {
    const storage = multer.diskStorage({
        destination: async function (req, file, cb) {
            //let day = sd.format(new Date(), 'YYYYMMDD'); //格式化日期
            let dir = path.join("./public/excelfile","") //用join把两个字符串拼接起来
            console.log("文件的路径：",dir)
            await mkdirp(dir) //用mkdirp创建对应的目录文件
            cb(null, dir)
        },
        filename: function (req, file, cb) {
            let extname = path.extname(file.originalname)
            let filename = "FileExcel" + extname
            cb(null, filename)
        }
    })
    const upload = multer({
        storage: storage,
    })
    return upload
}


module.exports = {
    fileuploud,
    ExcelFile
}
