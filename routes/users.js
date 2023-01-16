var express = require('express');
var router = express.Router();
require('bytenode');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/demo', async function(request, response, next){
  var title = "我是从数据库出来的数据"
  response.render("index.html", {
    title: title
  })
});

module.exports = router;
