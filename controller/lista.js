var express = require('express');
var router = express.Router();

//////////
// GET
router.get('/', function(req, res) {
  	if(!req.session.user){
    	res.render('login', {message: "Você não tem permissão para acessar a página!!"});
  	}else{
    	var db = require("../model/orientacao");
    	var Orientacoes = db.Mongoose.model('tbl_orientacao', db.OrientacaoSchema, 'tbl_orientacao');

    	Orientacoes.find({}).lean().exec(function (e, docs) {
        	res.render('lista', { "lista": docs });
    	});
  	}
});

module.exports = router;