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

module.exports = router;
