const mysql = require("mysql");
let userArgs = process.argv.slice(2);

if(userArgs.length == 0) {
  console.log('missing arguments');
  console.log('Correct Usage: node verify_schema -u <mysqlusername> -p <mysqlpassword>');
  return;
}

if(userArgs.length != 4) {
  console.log('Bad arguments');
  console.log('Correct Usage: node verify_schema -u <mysqlusername> -p <mysqlpassword>');
  return;
}

if(userArgs[0] != '-u') {
  console.log('username missing');
  return;
}

if(userArgs[2] != '-p') {
  console.log('password missing');
  return;
}

user = userArgs[1];
pass = userArgs[3];

var connection = mysql.createPool({
  host: 'localhost',
  user: user,
  password: pass,
  database: 'fake_so'
});

module.exports = connection;
