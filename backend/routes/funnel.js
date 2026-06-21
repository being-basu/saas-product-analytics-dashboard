const express = require('express');
const dbPromise = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const funnel = await db.all(`
      SELECT
        event_name AS event,
        COUNT(DISTINCT user_id) AS users
      FROM events
      WHERE event_name IN (
        'signup',
        'onboarding_started',
        'onboarding_completed',
        'subscription_started',
        'payment_success'
      )
      GROUP BY event_name
    `);

    res.json(funnel);
  } catch (error) {
    console.error('Failed to retrieve funnel data:', error);
    res.status(500).json({ error: 'Failed to retrieve funnel data.' });
  }
});

module.exports = router;
