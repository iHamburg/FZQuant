var express = require('express');

var logger = require('morgan');

var app = express();

/**
 * API
 * */
app.use('/api/webhook', require('./routes/api/webhook'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('catch 404 to error handler');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
  console.log('handle error');
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
  res.status(err.status || 500);
  res.send('Error hahahah')
});

module.exports = app;
