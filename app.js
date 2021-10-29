var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Keycloak = require('keycloak-connect');
const session = require('express-session');
const modelos = require('./models/index');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const compraRouter = require('./routes/compras');
const productoRouter = require('./routes/producto');
const keycloakOptions = require('./keycloak.json');

var app = express();
const memoryStore = session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore }, keycloakOptions);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
modelos.sequelize.sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch((e) => console.error(e));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/compra', keycloak.protect(), compraRouter);
app.use('/producto', keycloak.protect(), productoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

module.exports = app;
