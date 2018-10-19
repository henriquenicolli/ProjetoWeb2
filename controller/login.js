var express = require('express');
var router = express.Router();

//////////
// GET
router.get('/', function(req, res) {
	if(!req.session.user){
      res.render('login', {message: null});
    }else{
      req.session.destroy();
      res.render('login', {message: null});
    }
});

//////////
// POST 
router.post('/', function(req, res) {
    if(req.session.user){
      req.session.destroy();
    }

    var email = req.body.email;
    var password = req.body.password;

    if(email == '' || password == ''){
      res.render('login', {message: "Preencher todos os campos!!"});
    }else{
      var db = require("../model/login");
      var Login = db.Mongoose.model('tbl_login', db.LoginSchema, 'tbl_login');
      
      const user = Login.findOne({email: email, password: password}, function(err, user){
          if (err) {
            res.render('login', {message: "Erro #PL001. Informe o suporte!!"});
            //return err;
          }else if (!user) {
            res.render('login', {message: "Dados de login inválido!!"});
          }else if (user) {
            req.session.user = user;
            res.render('cadastro', {message: null});
          }else{
            res.render('login', {message: "Erro #PL002. Informe o suporte!!"});
          }
      });
    }
});


module.exports = router;