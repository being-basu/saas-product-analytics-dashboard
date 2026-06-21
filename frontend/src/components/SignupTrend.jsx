import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './SignupTrend.css';

function SignupTrend({ data }) {
  const formattedData = data.map((item) => ({
  ...item,
  month: new Date(`${item.month}-01`).toLocaleString('en', {
    month: 'short',
  }),
}));
  return (
    <section className="trend-card">
      <div className="trend-card__heading">
        <h2>Signup trend</h2>
        <p>New users joining each month.</p>
      </div>

      <div className="trend-card__canvas">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={38} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="signups"
              name="Signups"
              stroke="#0f766e"
              strokeWidth={3}
              dot={{ r: 3, fill: '#0f766e' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default SignupTrend;
