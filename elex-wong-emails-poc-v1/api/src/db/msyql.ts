const mysql = require('mysql2');

export const dbpool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:"KSnwA8NWPqlISLDKEWQAxaA9R26",//"ZAQ!xsw2",
    database: 'vmail',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

export const promisePool = dbpool.promise();