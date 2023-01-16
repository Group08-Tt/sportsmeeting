var express = require('express');
var router = express.Router();
const fs = require('fs');
const {mysqld} = require('../res/js/mysql/mysqld')
const login = require("./api/login");
const eatmeal = require("./laianeveryday/eatmeal");
const ceshidemo = require("./api/ceshidemo");
const Soupindex = require("./api/Soupindex");
router.use('/login', login);
router.use('/eatmeal', eatmeal);
router.use('/ceshidemo',ceshidemo);
router.use('/Soupindex',Soupindex);
router.get('/ceshi', async function (request, res, next) {
    let scanType = request.query.scanType;
    let result = request.query.result;
    let charSet = request.query.charSet;
    let path = request.query.path;
    let sqlinsert = `INSERT INTO smqceshi(scanType,result,charSet,path)
     VALUES ("${scanType}","${result}","${charSet}","${path}")  `
    await mysqld(sqlinsert).then((e) => {
        let datalistsql = JSON.parse(JSON.stringify(e))
        res.json(datalistsql);
    })
});

module.exports = router;
