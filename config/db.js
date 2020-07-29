const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hotels'
});

connection.connect(
    function(error) {
        if (error) {
            throw error;
        } else {
            console.log('Conexión correcta')
        }
    }
);

module.exports = connection;