const fs = require('fs/promises');
const path = require('path');
const dbPromise = require('../db');

const databaseDirectory = path.join(__dirname, '..', '..', 'database');

async function initializeDatabase() {
  let db;

  try {
    const schema = await fs.readFile(
      path.join(databaseDirectory, 'schema.sql'),
      'utf8'
    );
    const seed = await fs.readFile(
      path.join(databaseDirectory, 'seed.sql'),
      'utf8'
    );

    db = await dbPromise;

    await db.exec(schema);
    console.log('Schema created successfully.');

    await db.exec(seed);
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exitCode = 1;
  } finally {
    if (db) {
      try {
        await db.close();
      } catch (error) {
        console.error('Failed to close SQLite database:', error);
        process.exitCode = 1;
      }
    }
  }
}

initializeDatabase();
