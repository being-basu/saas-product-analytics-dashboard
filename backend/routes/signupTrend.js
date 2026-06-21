const express = require('express');
const dbPromise = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const signupTrend = await db.all(`
      SELECT
        strftime('%Y-%m', signup_date) AS month,
        COUNT(*) AS signups
      FROM users
      GROUP BY month
      ORDER BY month
    `);

    res.json(signupTrend);
  } catch (error) {
    console.error('Failed to retrieve signup trend:', error);
    res.status(500).json({ error: 'Failed to retrieve signup trend.' });
  }
});

module.exports = router;
