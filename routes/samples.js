var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');

const uploadPath = require('./util').uploadPath;

var multer = require('multer');
var upload = multer({ dest: uploadPath})

router.get('/', function(req, res, next) {
  res.redirect('/samples/sample1');
});

router.get('/sample1', function(req, res, next) {
  let startdate = req.query.startdate;
  if (!startdate) {
      startdate = new Date();
      startdate.setDate(startdate.getDate() - 6);
      startdate = dateFormat(startdate, "yyyy-mm-dd");
  }

  let enddate = req.query.enddate;
  if (!enddate) enddate = dateFormat(new Date(), "yyyy-mm-dd");

  res.render('samples/sample1', {startdate:startdate, enddate: enddate});
});

router.get('/sample2', function(req, res, next) {
  res.render('samples/sample2', {CMDESC: "<b>test</b>"});
});

module.exports = router;
