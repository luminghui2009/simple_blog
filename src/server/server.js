let express=require("express");
let app=express();
let jwt=require('jsonwebtoken');
let {Articles}=require('../database/article');
let {User}=require('../database/user');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
let mongoose=require("mongoose");
mongoose.createConnection('mongodb://127.0.0.1:27017/luminghuiblog');
let db=mongoose.connection;
db.openUri('mongodb://127.0.0.1:27017/luminghuiblog',function () {
    console.log("connection");
});

//设置跨域请求
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
    res.header('Access-Control-Allow-Method', 'GET,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method == 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});
//获取文章
app.post('/getArts',function (req, res) {
    const {sort}=req.body;
    if(sort=="all"||sort=='undefined'){
        let articles=Articles.find({},function (err,arts) {
            if(err){
                console.log(err);
            }else{
                res.json({"articles":arts});
            }
        });
    }
});
//获取文章详情
app.post('/getArtById',function (req, res) {
    let {_id}=req.body;
    Articles.findOne({_id},function (err, doc) {
        res.json({"article":doc});
    });
});
//发文章
app.post('/post',function (req, res) {
    const {_id,sort,title,content,token,create_time}=req.body;
    try{
        let decoded=jwt.verify(token,'secret');
        if(decoded.name=='host'){
            try{
                let article=Articles.findOne({_id}).exec();
                if(article){
                    article.title=title;
                    article.content=content;
                    article.sort=sort;
                    article.save();
                    res.json({status:1,msg:'更新成功'});
                }else{
                    Articles({title,sort,content,create_time}).save();
                    res.send({status:1,msg:'发布成功'});
                }
            }catch(e){
                Articles({title,sort,content,create_time}).save();
                res.send({status:1,msg:'发布成功'});

            }
        }else{
            res.send({status:0,msg:'你没有该权限'});
        }
    }catch(e){
        res.send({status:0,msg:e.message});
    }
});
//注册
app.post('/register',function (req, res) {
    let {username,password}=req.body;
    let user=User.findOne({username},function (err,doc) {
        if(doc){
            res.send({status:1,msg:'用户已存在'});
        }else{
            User({username,password}).save();
            res.json({status:0,msg:'注册成功'});
        }
    })
});
//登录
app.post('/login',function (req, res) {
    let {username,password}=req.body;
    User.findOne({username,password},function (err,user) {
        if(!user){
            res.json({status:0,msg:'用户名不存在'})
        }else{
            if(user.password!=password){
                res.json({status:0,msg:'密码不正确'})
            }else{
                const token=jwt.sign({name:username},'secret',{ expiresIn: 60 * 60 });
                user.token=token;
                user.save();
                res.json({status:1,msg:'密码正确',token,username});
            }
        }
    });
});
app.listen(3000);