var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sessions = require('express-session');
var mysqlSessions = require('express-mysql-session')(sessions);
var flash = require('express-flash');
var fileupload = require('express-fileupload');
var messageRouter =require('./routes/message');
var handlebars = require("express-handlebars");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');
var ErrorPrint = require('./helpers/debug/debug_printers').ErrorPrint;
var RequestPrint = require('./helpers/debug/debug_printers').RequestPrint;
var GetAllPostCoursePrefix = require('./middleware/post_middleware').GetAllPostCoursePrefix;

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

var mysqlSessionStore=new mysqlSessions({/*using default options */},require('./config/database'));
app.use(sessions({
        key:"csid",
        secret: "secret from csc648",
        store:mysqlSessionStore,
        resave:false,
        saveUninitialized:false
}))

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(fileupload());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));

app.use((req,res,next)=>{
  RequestPrint(req.url);
  next();
});

app.use((req,res,next) =>{
  if(req.session.username){
    res.locals.logged=true;
    res.locals.dashboard_username = req.session.username;
    res.locals.dashboard_first_name = req.session.dashboard_first_name;
    res.locals.dashboard_message_count = req.session.dashboard_message_count;
    res.locals.dashboard_post_count = req.session.dashboard_post_count;
  }
  next();
})

app.use(GetAllPostCoursePrefix);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/message',messageRouter);

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
  ErrorPrint(err);
  res.render('error',{err_message:err});
})
app.use((err,req,res,next) =>{
  res.status(500);
  res.send('something wrong with your db');
})

//stops SQL Injection attacks
app.post("/users", (request, response) => {
  const data = request.body;
  connection.query('SELECT * FROM password where id = ?', [data.id], (err, rows) => {
  if(err) throw err;
  response.json({data:rows});
  });
});
module.exports = app;
