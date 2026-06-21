const express = require('express');
const dbPromise = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const metrics = await db.get(`
      WITH kpi_counts AS (
        SELECT
          (SELECT COUNT(*) FROM users) AS totalUsers,
          (
            SELECT COUNT(DISTINCT user_id)
            FROM events
            WHERE event_name = 'onboarding_completed'
          ) AS activatedUsers,
          (
            SELECT COUNT(DISTINCT user_id)
            FROM subscriptions
          ) AS payingUsers,
          (
            SELECT COALESCE(SUM(amount), 0)
            FROM subscriptions
          ) AS mrr
      )
      SELECT
        totalUsers,
        activatedUsers,
        ROUND(
          CASE
            WHEN totalUsers = 0 THEN 0
            ELSE activatedUsers * 100.0 / totalUsers
          END,
          2
        ) AS activationRate,
        payingUsers,
        ROUND(
          CASE
            WHEN totalUsers = 0 THEN 0
            ELSE payingUsers * 100.0 / totalUsers
          END,
          2
        ) AS conversionRate,
        mrr
      FROM kpi_counts
    `);

    res.json(metrics);
  } catch (error) {
    console.error('Failed to retrieve KPI data:', error);
    res.status(500).json({ error: 'Failed to retrieve KPI data.' });
  }
});

module.exports = router;
