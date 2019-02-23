var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('loginForm');
});

router.get('/loginForm', function(req, res, next) {
  res.render('loginForm');
});

router.get('/loginChk', function(req, res, next) {
  console.log("aaaa");
  req.session.uid = req.body.uid;
  req.session.save(function(){
    console.log("bbbb");
    res.redirect('index');		
  });  
});

module.exports = router;
