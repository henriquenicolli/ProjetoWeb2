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

router.get('/login', function(req, res) {
	if(!req.session.user){
      res.render('login', {message: null});
    }else{
      req.session.destroy();
      res.render('login', {message: null});
    }
});

router.get('/logout', function(req, res) {
  if(!req.session.user){
      res.render('login', {message: "Você não tem permissão para acessar a página!!"});
    }else{
      req.session.destroy();
      res.render('login', {message: null});
    }
});

router.get('/cadastro', function(req, res) {
	if(!req.session.user){
    	res.render('login', {message: "Você não tem permissão para acessar a página!!"});
  	}else{
    	res.render('cadastro', {message: null});
  	}
});

router.get('/lista', function(req, res) {
  	if(!req.session.user){
    	res.render('login', {message: "Você não tem permissão para acessar a página!!"});
  	}else{
    	var db = require("../database/db");
    	var Orientacoes = db.Mongoose.model('tbl_orientacao', db.OrientacaoSchema, 'tbl_orientacao');

    	Orientacoes.find({}).lean().exec(function (e, docs) {
        	res.render('lista', { "lista": docs });
    	});
  	}
});

//////////
// POST 
router.post('/login', function(req, res) {
    if(req.session.user){
      req.session.destroy();
    }

  	var email = req.body.email;
  	var password = req.body.password;

  	if(email == '' || password == ''){
    	res.render('login', {message: "Preencher todos os campos!!"});
  	}else{
  		var db = require("../database/db");
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

router.post('/cadastro', function(req, res) {
  	if(!req.session.user){
    	res.render('login', {message: "Você não tem permissão para acessar a página!!"});
  	}else{
	    var nome_orientador = req.body.nome_orientador;
	    var sala_orientador = req.body.sala_orientador;
	    var email_orientador = req.body.email_orientador;
	    var nome_orientado = req.body.nome_orientado;
	    var ra_orientado = req.body.ra_orientado;
	    var email_orientado = req.body.email_orientado;
	    var curso_orientado = req.body.curso_orientado;
	    var tema = req.body.tema;
	    var descricao = req.body.descricao;

	    if(nome_orientador == '' || sala_orientador == '' || email_orientador == '' || nome_orientado == '' || ra_orientado == '' || email_orientado == '' || curso_orientado == '' || tema == '' || descricao == ''){
	      	res.render('cadastro', {message: "Preencher todos os campos!!"});
	    }else{
	    	var db = require("../database/db");
	      	var Orientacoes = db.Mongoose.model('tbl_orientacao', db.OrientacaoSchema, 'tbl_orientacao');
	      	var orientacao = new Orientacoes({nome_orientador: nome_orientador, sala_orientador: sala_orientador, email_orientador: email_orientador, nome_orientado: nome_orientado, ra_orientado: ra_orientado, email_orientado: email_orientado, curso_orientado: curso_orientado, tema: tema, descricao: descricao});
	      
	      	orientacao.save(function (err) {
	        	if (err) {
                req.session.destroy();
                res.render('login', {message: "Erro #PC003. Informe o suporte!!"});
	          		//return err;
	        	}else {
	          		res.redirect("lista");
	        	}
	      	});
	   	}
	}
});

module.exports = router;