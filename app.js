var express = require('express');
var app = express();

//static files
//app.use(express.static('./public'));

app.use('/login', require('./routes/login'));
//app.use('/login', require('./routes/items'));

app.listen(3000);
console.log('you are listening to port 3000...');
