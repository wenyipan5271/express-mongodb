var express = require('express');
var router = express.Router();
var Users = require('../models/users');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user)
  if(req.session.user){
    res.redirect('/home');//session存有用户信息跳转首页，
  }else{
    res.redirect('/login');//session没有存储用户信息跳转登录页
  }
});

router.get('/home', function (req, res) {
  if(req.session.user){
    res.render('index');
  }else{
    res.redirect('/login');
  }
});

router.get('/login', function (req, res) {
    res.render('login');
});
router.get('/register', function (req, res) {
    res.render('register');
});


// 这里的业务逻辑将写在 两个post 路由里 
router.post('/login', (req, res) => {
  Users.findOne({username:req.body.username},(err,data) => {
    if (err) throw err;
    if(data === null){
      res.send({returnCode:'100',returnMsg:'用户名或密码错误！'});
    }else{
      if(data.username === req.body.username && data.password === req.body.password){//登录成功跳转路由users页面  
        console.log(data.username)
        req.session.user=data;
        res.send({returnCode:'200',returnMsg:'登录成功！'});
      }else{
        res.send({returnCode:'100',returnMsg:'用户名或者密码错误'});
      }
    }
  })
});
router.post('/register', (req, res) => {//注册接口
  console.log(req.body)
  Users.findOne({username:req.body.username},(err,data) => {
    if (err) throw err;
    if(data === null){
      Users.create(req.body, err => {
        if (err) throw err;
        res.send({returnCode: '200', returnMsg: '添加用户成功！', returnData: req.body});
      })
    }else{
      res.send({returnCode:'100',returnMsg:'该用户名已经存在，请重新输入！'});
    }
  })
});

router.post('/getUserInfo',(req,res) => { //拉取用户信息接口
  if(req.session.user){
    res.send({returnCode: '200', returnMsg: 'success', returnData: req.session.user});
  }else{
    res.send({returnCode: '200', returnMsg: 'fail'});
  }
})

router.post('/getUserList',function(req,res){ //拉取用户列表接口
  Users.find((err,data) => {
    res.send({returnCode: '200', returnMsg: 'success', returnData: {list:data}})
  })
})

router.post('/getImgSrc',function(req,res){
  // 测试图片接口
  res.send({returnCode:'200',returnMsg:'success',returnData: '/images/love.jpg'});
})

router.get('/testApi',function(req,res){
  res.send('调用接口成功!')
})



module.exports = router;
