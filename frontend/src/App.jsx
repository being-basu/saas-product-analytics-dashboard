import { useEffect, useState } from 'react';
import KpiCards from './components/KpiCards';
import RevenueChart from './components/RevenueChart';
import SignupTrend from './components/SignupTrend';
import Funnel from './components/Funnel';
import './App.css';

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDashboardData() {
      const endpoints = [
        '/api/kpis',
        '/api/revenue-by-channel',
        '/api/signup-trend',
        '/api/funnel',
      ];

      try {
        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(endpoint, { signal: controller.signal }),
          ),
        );

        if (responses.some((response) => !response.ok)) {
          throw new Error('One or more dashboard requests failed.');
        }

        const [kpis, revenue, signupTrend, funnel] = await Promise.all(
          responses.map((response) => response.json()),
        );

        setDashboardData({ kpis, revenue, signupTrend, funnel });
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          console.error(requestError);
          setError('Unable to load dashboard data. Please try again.');
        }
      }
    }

    fetchDashboardData();

    return () => controller.abort();
  }, []);

  if (error) {
    return <div className="status-message status-message--error">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="status-message">Loading dashboard…</div>;
  }

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <p className="eyebrow">Product overview</p>
        <h1>SaaS Analytics Dashboard</h1>
        <p>Acquisition, activation, revenue, and product growth at a glance.</p>
      </header>

      <KpiCards data={dashboardData.kpis} />

      <div className="dashboard__grid">
        <RevenueChart data={dashboardData.revenue} />
        <SignupTrend data={dashboardData.signupTrend} />
      </div>

      <Funnel data={dashboardData.funnel} />
    </main>
  );
}

export default App;
