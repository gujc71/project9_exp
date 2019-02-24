var express = require('express');
var router = express.Router();
var pool = require('./mysqlConn');

router.get('/', function(req, res, next) {
    res.redirect('/board/list');
});

router.get('/list', function(req,res,next){
    pool.getConnection(function (err, connection) {
        var sql = "SELECT BRDNO, BRDTITLE, USERNM BRDWRITER, DATE_FORMAT(BRDDATE,'%Y-%m-%d') BRDDATE" +
                   " FROM TBL_BOARD TB " +
                   "INNER JOIN COM_USER CU ON CU.USERNO=TB.USERNO " + 
                   "ORDER BY TB.BRDNO DESC";
        
        connection.query(sql, function (err, rows) {
            if (err) console.error("err : " + err);
//            console.log("rows : " + JSON.stringify(rows));

            res.render('board/list', {rows: rows});
            connection.release();
        });
    }); 
});

router.get('/read', function(req,res,next){
    pool.getConnection(function (err, connection) {
        var sql = "SELECT BRDNO, BRDTITLE, BRDMEMO, USERNM BRDWRITER, DATE_FORMAT(BRDDATE,'%Y-%m-%d') BRDDATE"+
                  "  FROM TBL_BOARD TB " +
                  " INNER JOIN COM_USER CU ON CU.USERNO=TB.USERNO" +
                  " WHERE BRDNO=" + req.query.brdno;
            console.log("rows : " + sql);
        connection.query(sql, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));

            res.render('board/read', {row: rows[0]});
            connection.release();
        });
    }); 
});

router.get('/form', function(req,res,next){
    if (!req.query.brdno) {
        res.render('board/form', {row: ""});
        return;
    }
    pool.getConnection(function (err, connection) {
        var sql = "SELECT BRDNO, BRDTITLE, BRDMEMO, USERNM BRDWRITER, DATE_FORMAT(BRDDATE,'%Y-%m-%d') BRDDATE" + 
                  "  FROM TBL_BOARD TB " +
                  " INNER JOIN COM_USER CU ON CU.USERNO=TB.USERNO" +
                  " WHERE BRDNO=" + req.query.brdno;
        connection.query(sql, function (err, rows) {
            if (err) console.error("err : " + err);

            res.render('board/form', {row: rows[0]});
            connection.release();
        });
    }); 
});

router.post('/save', function(req,res,next){
    var data = [req.body.brdtitle, req.body.brdmemo, req.session.userno, req.body.brdno];
    console.log("rows : " + data);

    pool.getConnection(function (err, connection) {
        var sql = "";
        if (req.body.brdno) {
            sql = "UPDATE TBL_BOARD" +
                    " SET BRDTITLE=?, BRDMEMO=?, USERNO=?" +
                  " WHERE BRDNO=?";
        } else {
            sql = "INSERT INTO TBL_BOARD(BRDTITLE, BRDMEMO, USERNO, BRDDATE) VALUES(?,?,?, NOW())";
        }
        connection.query(sql, data, function (err, rows) {
            if (err) console.error("err : " + err);

            res.redirect('/board/list');
            connection.release();
        }); 
    }); 
});

router.get('/delete', function(req,res,next){
    pool.getConnection(function (err, connection) {
        var sql = "DELETE FROM TBL_BOARD" +
                  " WHERE BRDNO=" + req.query.brdno;
        connection.query(sql, function (err, rows) {
            if (err) console.error("err : " + err);

            res.redirect('/board/list');
            connection.release();
        });
    }); 
});

module.exports = router;
