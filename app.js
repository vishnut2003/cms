var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const session = require('express-session');
const { dbconnect } = require('./config/dbconnection');
const logEvents = require('./logEvents');

var indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin')

var app = express();

// DB Connection
dbconnect((err) => {
  if(err) console.log(err);
  else console.log('DB Connected');
})

// Session config
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'GFHG^%$$^%HJKFGUF^HJGHF%',
  cookie: {maxAge: 60000}
}))

// view engine setup
app.engine('hbs', hbs.engine({
  extname: 'hbs', 
  defaultLayout: 'layout', 
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir  : [
      //  path to your partials
      path.join(__dirname, 'views/partials'),
  ]
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Log Requests
app.use((req, res, next) => {
  logEvents(req.method, req.url, '', 'reqLogs.log')
  next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

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
  res.render('error');
});

module.exports = app;
