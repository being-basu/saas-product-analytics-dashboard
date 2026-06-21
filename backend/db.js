const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const db = open({
  filename: path.join(__dirname, '..', 'database', 'analytics.db'),
  driver: sqlite3.Database,
})
  .then((connection) => {
    console.log('Connected to SQLite database.');
    return connection;
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });

module.exports = db;
