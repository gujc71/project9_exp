var express = require('express');
var router = express.Router();
var pool = require('./mysqlConn');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('loginForm');
});

router.get('/loginForm', function(req, res, next) {
  res.render('loginForm');
});

router.post('/loginChk', function(req, res, next) {
  pool.getConnection(function (err, connection) {
    var sql = "SELECT USERNO, USERNM, USERROLE"+
               " FROM COM_USER" +
              " WHERE USERID='" + req.body.userid + "' AND USERPW=SHA2('" + req.body.userpw + "', 256)";

    connection.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        connection.release();

        if (rows.length!==1) {
          res.redirect('loginForm');	
          return;
        }
        console.log("rows : " + rows[0].USERNO);
        req.session.userno = rows[0].USERNO;
        req.session.userid = req.body.userid;
        req.session.usernm = rows[0].USERNM;
        req.session.save(function(){
          console.log("rows : " + req.session.userno);
          res.redirect('/index');		
        });  
    });
  });   

});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
      res.redirect('loginForm');
  });
});

module.exports = router;
