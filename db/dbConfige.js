const mysql2 = require('mysql2');

const dbConnection = mysql2.createPool({
  host: 'localhost',
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10
});


// dbConnection.execute("select 'test' ", (err, result) => {
//   if(err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });

// Export the Promise-based connection pool
module.exports = dbConnection.promise();