const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const connection = require('./database/connection');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const Folder = require('./models/Folder');
const File = require('./models/File');
const User = require('./models/User');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
// Body parser

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app

// Database

const connectionDB = async () => {
  try {
    await connection.authenticate();
    
    console.log('Connection has been established successfully.');
  } catch (error) {

    console.error(`Unable to connect to the database:${error}`);
  }
}

connectionDB();

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
  res.render('error', {title: 'Error'});
});

module.exports = app;
