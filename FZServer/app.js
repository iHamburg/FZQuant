var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

/**
 * Vue-Router History 模式
 */
// var history = require('connect-history-api-fallback');
// app.use(history());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// view template handelbars
var handlebars = require('express-handlebars')
    .create({
      defaultLayout: 'chl',
        // extname: '.hbs'
    }); //一定要在views/layouts/main.landlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/**
 Gzip 压缩
  */
app.use(require('compression')());
``
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * API
 * */
app.use('/api/tests', require('./routes/api/tests'));
app.use('/api/users', require('/routes/api/user'))
app.use('/api/webhook', require('./routes/api/webhook'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//
//
//
// console.log('------------------ Node_env ', process.env.NODE_ENV);

module.exports = app;
