var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var handlebars = require("express-handlebars");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');
var errorPrint = require('./helpers/debug/debugprinters').errorPrint;
var requestPrint=require('./helpers/debug/debugprinters').requestPrint;

var app = express();

app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(__dirname, "../client/views/layouts"),
    partialsDir: path.join(__dirname, "../client/views/partials"),
    extname: ".hbs",
    defaultLayout: "home",
    helpers: {
      emptyObject: (obj) => {
        return !(obj.constructor === Object && Object.keys(obj).length == 0);
    }
    }
  })
)

// view engine setup
app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));

app.use((req,res,next)=>{
  requestPrint(req.url);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use((err,req,res,next)=>{
  errorPrint(err);
  res.render('error',{err_message:err});
})
app.use((err,req,res,next) =>{
  res.status(500);
  res.send('something wrong with your db');
})
module.exports = app;
