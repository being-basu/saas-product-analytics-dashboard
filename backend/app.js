const express = require('express');
const cors = require('cors');
const dbPromise = require('./db');
const kpisRouter = require('./routes/kpis');
const revenueRouter = require('./routes/revenue');
const funnelRouter = require('./routes/funnel');
const signupTrendRouter = require('./routes/signupTrend');

const app = express();
const PORT = 3001;

app.use(cors());
app.use('/api/kpis', kpisRouter);
app.use('/api/revenue-by-channel', revenueRouter);
app.use('/api/funnel', funnelRouter);
app.use('/api/signup-trend', signupTrendRouter);

app.get('/health', async (req, res) => {
  try {
    const db = await dbPromise;
    const counts = await db.get(`
      SELECT
        (SELECT COUNT(*) FROM users) AS users,
        (SELECT COUNT(*) FROM events) AS events,
        (SELECT COUNT(*) FROM subscriptions) AS subscriptions,
        (SELECT COUNT(*) FROM feature_usage) AS featureUsage
    `);

    res.json(counts);
  } catch (error) {
    console.error('Failed to retrieve health data:', error);
    res.status(500).json({ error: 'Failed to retrieve health data.' });
  }
});

async function startServer() {
  try {
    await dbPromise;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}.`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exitCode = 1;
  }
}

startServer();
