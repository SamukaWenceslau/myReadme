const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');
const configAuth = require('./config/Auth');

configAuth(passport);

const dotenv = require('dotenv');

dotenv.config();

// connection database

const connection = require('./database/connection');

// Routes 

const userRoutes = require('./routes/user');
const folderRoutes = require('./routes/folder');
const fileRoutes = require('./routes/file');

// Models

const User = require('./models/User');
const Folder = require('./models/Folder');
const File = require('./models/File');

const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session, Cookies, Flash

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {maxAge: 30000000},
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// middlewares

app.use((req, res, next) => {
  res.locals.success = req.flash("success")
  res.locals.err = req.flash("err")
  res.locals.user = req.user || null;
  next();
})

// Static

app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// Body parser

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Using routes

app.use('/', fileRoutes);
app.use('/', folderRoutes);
app.use('/', userRoutes);


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
