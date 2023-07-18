var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
var cors=require("cors");
const dataBase=require("./connect_db");


// Allow cors
app.use(cors());
dataBase.mongoConnect();
// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// app.use("/websites", websitesRouter);

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

const PORT = process.env.PORT || 4044;
app.listen(PORT, (err) => {
  if (err) return console.log("PORT ISSUE", err);
  console.log(`Server running on PORT ${PORT}`);
});

module.exports = app;
