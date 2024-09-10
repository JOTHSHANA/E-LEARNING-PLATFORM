// const mysql = require("mysql2");
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_NAME:', process.env.DB_NAME);
// console.log('DB_USER:', process.env.DB_USER);
// const db1Connection = mysql.createPool({
//     host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

 
// db1Connection.getConnection((err, conn) => {
//     if (err) {
//         console.error("Error connecting to DB1:", err);
//         console.log("Connection to DB1 Failed");
//     } else {
//         console.log("Connection to DB1 success");
//         conn.release();
//     }
// });

// db1Connection.on('error', err => {
//     console.error("MySQL DB1 Pool Error:", err);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//         console.error("Connection to DB1 Lost! Trying to Reconnect...");
//         db1Connection.getConnection();
//     }
// });


// db1Connection.on("acquire", connection => {
//     console.log("MySQL DB1 Acquired");
// });

// db1Connection.on("release", connection => {
//     console.log("MySQL DB1 Released"); 
// });

// module.exports = { db1Connection };
