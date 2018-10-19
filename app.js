var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var cadastroRouter = require('./controller/cadastro');
var listaRouter = require('./controller/lista');
var loginRouter = require('./controller/login');
var logoutRouter = require('./controller/logout');
var indexRouter = require('./controller/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "9135d8523ad3da99d8a4eb83afac13d1", resave: false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cadastro', cadastroRouter);
app.use('/lista', listaRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('./views/error');
});

module.exports = app;