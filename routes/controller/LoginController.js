// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({extended: false});
const express = require('express');
const router = express.Router();
var path = require('path');
var DbOps = require(path.resolve('services/DbOps'));
var sqlStmt = "select * from users";
var values = [];
//var data;

var execute = DbOps.sqlQuery(sqlStmt, values, function(results){
  console.log(JSON.stringify(results));
  // data = results;
  return results;
});

module.exports.execute;
