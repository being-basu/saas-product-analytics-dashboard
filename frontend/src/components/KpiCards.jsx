import './KpiCards.css';

function KpiCards({ data }) {
  const cards = [
    {
      label: 'Total Users',
      value: Number(data.totalUsers ?? 0).toLocaleString(),
    },
    {
      label: 'Activation Rate',
      value: `${Number(data.activationRate ?? 0).toFixed(2)}%`,
    },
    {
      label: 'Paying Users',
      value: Number(data.payingUsers ?? 0).toLocaleString(),
    },
    {
      label: 'MRR',
      value: `\u20B9${Number(data.mrr ?? 0).toLocaleString('en-IN')}`,
    },
  ];

  return (
    <section className="kpi-grid" aria-label="Key performance indicators">
      {cards.map((card) => (
        <article className="kpi-card" key={card.label}>
          <p>{card.label}</p>
          <strong>{card.value}</strong>
        </article>
      ))}
    </section>
  );
}

export default KpiCards;
