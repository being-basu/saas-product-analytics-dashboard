import './Funnel.css';

const funnelOrder = [
  'signup',
  'onboarding_started',
  'onboarding_completed',
  'subscription_started',
  'payment_success',
];

const labels = {
  signup: 'Signup',
  onboarding_started: 'Onboarding Started',
  onboarding_completed: 'Onboarding Completed',
  subscription_started: 'Subscription Started',
  payment_success: 'Payment Success',
};

function Funnel({ data }) {
  const orderedData = funnelOrder
    .map((event) => data.find((item) => item.event === event) ?? { event, users: 0 });
  const largestStage = Math.max(...orderedData.map((item) => item.users), 1);

  return (
    <section className="funnel-card">
      <div className="funnel-card__heading">
        <h2>Conversion funnel</h2>
        <p>Distinct users progressing through the customer journey.</p>
      </div>

      <div className="funnel-list">
        {orderedData.map((item) => (
          <div className="funnel-row" key={item.event}>
            <div className="funnel-row__label">
              <span>{labels[item.event]}</span>
              <strong>{Number(item.users).toLocaleString()}</strong>
            </div>
            <div className="funnel-row__track">
              <div
                className="funnel-row__fill"
                style={{ width: `${(item.users / largestStage) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Funnel;

