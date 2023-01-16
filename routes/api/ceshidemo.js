const express = require('express');
const router = express.Router();
const redis = require("redis");
const redisurl = "redis://192.168.3.191:6379"
let client =  redis.createClient(redisurl)
router.get('/ceshi', async function (request, response, next) {
    response.send("");
});
module.exports = router;