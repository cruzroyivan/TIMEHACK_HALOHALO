var express = require('express');
//var ViewPersons = require('./controllers/ViewPersons');
var app = express();

//static files
//app.use(express.static('./public'));

//fire controllers
//ViewPersons(app);

//listen to port
app.listen(3000);
console.log('you are listening to port 3000...');
