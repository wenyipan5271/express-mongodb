var express = require('express');
var router = express.Router();
var Users = require('../models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});
router.get('/testPage', function (req, res) {
  res.render('yonghu');
});


router.post('/test', function (req, res) {
  console.log(req.body.username)
  Users.findOne({username:req.body.username},function(err,data){
    if (err) throw err;
    if(data === null){
      res.send({returnCode:'200',returnMsg:'滚蛋!没找到!'});
    }
  })
});

module.exports = router;
