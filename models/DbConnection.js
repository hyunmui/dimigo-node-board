const mysql = require('mysql2/promise');

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dimigo_board',
});
