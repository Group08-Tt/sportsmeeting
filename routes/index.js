var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/root', function(req, res, next) {
  var data = "\nLearn Node.js with the help of well built Node.js Tutorial.";
  fs.appendFile('./aa.txt', data, (err) => {

    if (err) {

      console.log(err);

      return;

    }

    console.log('创建成功');

  })
  res.render('index', { title: 'Express' });
});

module.exports = router;
