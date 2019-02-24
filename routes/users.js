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
  req.session.uid = req.body.uid;
  req.session.save(function(){
    res.redirect('../index');		
  });  
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
      res.redirect('/');
  });
});

module.exports = router;
