var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'test',
    user     : 'ivan',
    password : 'password',
    multipleStatements: true
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

function sqlQuery(sqlStmt, values, callback){
  sqlStmt = mysql.format(sqlStmt, values);

  connection.query(sqlStmt, function (error, results, fields) {
    if (error){
        throw error;
    }

    return callback(results);
  });

  connection.end();
};

module.exports = {
  sqlQuery: sqlQuery
}
