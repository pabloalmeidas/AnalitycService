exports.exec = function(query, callback)
{
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'takki'
	});

	connection.connect();

	connection.query(query, function(err, rows, fields) {
	  	callback(err, rows, fields);
	});

	connection.end();
}



