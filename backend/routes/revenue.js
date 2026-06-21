const express = require('express');
const dbPromise = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const revenueByChannel = await db.all(`
      SELECT
        u.acquisition_channel AS acquisitionChannel,
        SUM(s.amount) AS revenue
      FROM users u
      JOIN subscriptions s
        ON u.user_id = s.user_id
      GROUP BY u.acquisition_channel
      ORDER BY revenue DESC
    `);

    res.json(revenueByChannel);
  } catch (error) {
    console.error('Failed to retrieve revenue by channel:', error);
    res.status(500).json({ error: 'Failed to retrieve revenue by channel.' });
  }
});

module.exports = router;
