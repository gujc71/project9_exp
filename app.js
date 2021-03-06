var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');
var session = require('express-session');
const passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set('trust proxy', 1)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
//app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const helmet = require('helmet');
app.use(helmet());
app.disable('x-powered-by');

require('./passport')(passport);
app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지

app.use(session({
	secret: '123456789',
	resave: false,
	saveUninitialized: true,
}));

// Interceptor
var exceptList = "/users/loginForm,/users/loginChk,/users/joinForm,/users/joinFormSave";
app.use(function(req, res, next) {
  let url = req.url.split('?')[0];
  console.log(url);
  if (url.indexOf("/common") >-1 || url.indexOf("/auth") >-1) {
    next();
    return;
  }

  if ((exceptList.indexOf(url)===-1 || url==="/") & !req.session.userno) {
    res.redirect('/users/loginForm'); 
    return; 
  }
  if (url.substring(1,3)==="ad" & req.session.userrole!=="A") {
    res.redirect('/users/loginForm'); 
    return; 
  }
  res.locals.userrole = req.session.userrole;
  res.locals.userno = req.session.userno;
  res.locals.usernm = req.session.usernm;
  next();
});

app.use('/', indexRouter);
app.use('/auth', require('./routes/auth'));
app.use('/common', require('./routes/common'));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/board', require('./routes/board'));
app.use('/samples', require('./routes/samples'));
app.use('/adusers', require('./routes/adUsers'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("error", err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('common/error');
});

module.exports = app;
