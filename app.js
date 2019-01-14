var rekuire = require('rekuire');
var express = require('express');
var bodyParser = require('body-parser');
var app  = express();

require('dotenv').config();

var TimeHackHaloHaloMySQL = rekuire('TimeHackHaloHaloMySQL');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.ok = function(body) {
    res.status(200);
    res.json(body);
  }
  res.error = function(error) {
    res.status(400);
    res.json(error);
  }
  next();
});

app.use('/timehack/halohalo', require('./routes/timeHackHaloHalo'));

if(process.env.SKIP_TIMEHACK_HALOHALO_MYSQL != 'true') {
  console.log('[TimeHackHaloHaloMySQLDB] Connecting to database');
  let mysqlConnect = TimeHackHaloHaloMySQL.connect();
  mysqlConnect.then((connect)=>{
    console.log('[TimeHackHaloHaloMySQLDB] Database connected', connect);
  }).catch((error) => {
    console.log('[TimeHackHaloHaloMySQLDB] Database error in connection', error);
  });  
}

let port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('[App] Now up and running', {port: port});
});

module.exports = app;