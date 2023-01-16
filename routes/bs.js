/***
 * 这个文件是对应的bs的映射接口信息
 *
 *
 **/
const express = require('express');
const router = express.Router();
const fs = require('fs');
const {mysqld} = require('../res/js/mysql/mysqld')
const Bsgwyy = require("./bsfilemode/bsgwyy");
router.use('/bsgwyy',Bsgwyy);
router.get('/ceshi', async function (request, res, next) {
    let scanType = request.query.scanType;
    let result = request.query.result;
    let charSet = request.query.charSet;
    let path = request.query.path;
    let sqlinsert = `INSERT INTO smqceshi(scanType,result,charSet,path)
     VALUES ("${scanType}","${result}","${charSet}","${path}")`
    await mysqld(sqlinsert).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        res.json(datalistsql);
    })
});

module.exports = router;
