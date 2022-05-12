require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// passport must be before models and...
const passport = require('passport');
require('./app_api/models/db');
// config must be after models
require('./app_api/config/passport');
require('express-jwt');




//const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');
//const usersRouter = require('./app_server/routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



//https://www.bezkoder.com/docker-compose-nodejs-mongodb/
// const PORT = 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'rubricMaker/build')));


// passport should be initialized in app.js after the static
// routes have been defined and before the routes that are going
// to use authentication
app.use(passport.initialize());


// allow cross-origin requests from angular
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  // res.header('Access-Control-Allow-Origin', 'http://localhost:61977');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  next();
});


app.use('/api', apiRouter);
app.use('/', apiRouter);
//app.use('/users', usersRouter);

// send to all routes, but probably not great for production
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'app_public', 'rubricMaker/build', 'index.html'));
});

// example of a better practice
// app.get(/(\/about)|(\/rubric\/[a-z0-9]{24})/, function(req, res, next) {
//   res.sendFile(path.join(__dirname, 'app_public', 'rubricMaker/build', 'index.html'));
// });







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

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
        .status(401)
        .json({"message" : err.name + ": " + err.message});
  }
});



module.exports = app;
