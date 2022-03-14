const mysql = require('mysql');


// const mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Kush007_tej',
//     database: 'nodejs_login_system',
//     multipleStatements: true
// });

const mysqlConnection = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12386553',
    password: 'bxEPaZwjRP',
    database: 'sql12386553',
    multipleStatements: true
});

module.exports = mysqlConnection