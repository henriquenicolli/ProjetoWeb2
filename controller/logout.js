var express = require('express');
var router = express.Router();

//////////
// GET
router.get('/', function(req, res) {
  if(!req.session.user){
      res.render('login', {message: "Você não tem permissão para acessar a página!!"});
    }else{
      req.session.destroy();
      res.render('login', {message: null});
    }
});

module.exports = router;