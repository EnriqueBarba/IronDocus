require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const alertMiddleware = require('./middlewares/alert.middleware')

/**
 * HBS && Mongoose config.
 */
require('./config/hbs.config');
require('./config/db.config');
require('./config/mailer.config');
const session = require('./config/session.config');

/** 
* Express config. 
*/
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);
app.use(alertMiddleware)

// Set local.currentUser with sessionUser
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user
  req.currentUser = req.session.user
  next()
})

/**
 * HBS views engine
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/**
 * Router && routes config
 */
const router = require('./config/routes.js');
app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.error(err)
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

//fin error handler

/** 
 * App port config
 */
const port = normalizePort(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }