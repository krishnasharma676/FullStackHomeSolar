import { useLocation } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  LineChart, Line, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
  CartesianGrid, ComposedChart, ScatterChart, Scatter
} from 'recharts';
import { useState } from 'react';

const COLORS = ['#20b024', '#FFDD02', '#ff6a00'];

const Dashboard = () => {
  const { state } = useLocation();
  const [activeChart, setActiveChart] = useState(null);

  const user = state?.name || "User";
  const bill = Number(state?.bill) || 2500;
  const units = Number(state?.units) || 200;
  const systemSize = Number(state?.systemSizeKW) || 2.5;
  const costBefore = bill;
  const costAfter = Number(state?.reducedBill) || bill * 0.2;
  const savings = costBefore - costAfter;
  const roi = state?.roi || 25;
  const payback = state?.paybackPeriod || 5;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

  const barData = [
    { name: 'Before Solar', cost: costBefore },
    { name: 'After Solar', cost: costAfter },
  ];

  const pieData = [
    { name: 'Savings', value: Math.round((savings / costBefore) * 100) },
    { name: 'Remaining Cost', value: Math.round((costAfter / costBefore) * 100) },
  ];

  const lineData = months.map((m, i) => ({ name: m, kWh: units / months.length + i * 5 }));

  const areaData = months.map((m, i) => ({
    name: m,
    before: costBefore - i * 100,
    after: costAfter + i * 30,
  }));

  const radarData = [
    { subject: 'Efficiency', A: 100, B: 130 },
    { subject: 'Cost Savings', A: 80, B: 120 },
    { subject: 'ROI (%)', A: roi, B: roi + 20 },
    { subject: 'Payback (Yrs)', A: 10, B: payback },
  ];

  const composedData = months.map((m, i) => ({
    name: m,
    energy: (units / 5) + i * 10,
    cost: costBefore - i * 200,
  }));

  const scatterData = months.map((m, i) => ({ x: i * 10, y: units / 5 + i * 8 }));

  const chartList = [
    {
      title: 'Electricity Bill Comparison',
      chart: (
        <BarChart data={barData}>
          <XAxis dataKey="name" /><YAxis /><Tooltip />
          <Bar dataKey="cost" fill="#20b024" barSize={40} />
        </BarChart>
      ),
      insights: [
        `Your monthly bill before solar was ₹${costBefore}.`,
        `After switching to solar, it dropped to ₹${costAfter}.`,
        `Yearly savings: ₹${savings * 12}. Over 5 years: ₹${savings * 12 * 5}.`
      ]
    },
    {
      title: 'Estimated Savings %',
      chart: (
        <PieChart>
          <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} label>
            {pieData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      ),
      insights: [
        `Your estimated monthly savings are ${pieData[0].value}%.`,
        `Only ${pieData[1].value}% of your original bill remains.`,
        `Consistent savings projected over the next 5 years.`
      ]
    },
    {
      title: 'Monthly Solar Production (kWh)',
      chart: (
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" /><YAxis /><Tooltip />
          <Line type="monotone" dataKey="kWh" stroke="#20b024" strokeWidth={2} />
        </LineChart>
      ),
      insights: [
        `Your solar system generates approx. ${units} units monthly.`,
        `This varies slightly across months based on sunlight.`,
        `Reliable performance expected across the year.`
      ]
    },
    {
      title: 'Usage Cost: Before vs After',
      chart: (
        <AreaChart data={areaData}>
          <defs>
            <linearGradient id="before" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff6a00" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ff6a00" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="after" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#20b024" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#20b024" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" /><YAxis /><Tooltip />
          <Area type="monotone" dataKey="before" stroke="#ff6a00" fillOpacity={1} fill="url(#before)" />
          <Area type="monotone" dataKey="after" stroke="#20b024" fillOpacity={1} fill="url(#after)" />
        </AreaChart>
      ),
      insights: [
        `Your monthly cost before solar was ₹${costBefore}.`,
        `It reduced by ₹${savings} monthly after solar.`,
        `This pattern is stable and predictable year-round.`
      ]
    },
    {
      title: 'System ROI & Performance',
      chart: (
        <RadarChart data={radarData} outerRadius={90}>
          <PolarGrid /><PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar name="Previous" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Radar name="Current" dataKey="B" stroke="#20b024" fill="#20b024" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      ),
      insights: [
        `Your ROI is ${roi}% and payback in approx. ${payback} years.`,
        `Efficiency and savings are significantly improved post-installation.`,
        `Performance parameters improved across all metrics.`
      ]
    },
    {
      title: 'Energy Generation & Cost',
      chart: (
        <ComposedChart data={composedData}>
          <XAxis dataKey="name" /><YAxis /><Tooltip />
          <Bar dataKey="energy" barSize={20} fill="#FFDD02" />
          <Line type="monotone" dataKey="cost" stroke="#20b024" />
        </ComposedChart>
      ),
      insights: [
        `Your system generates ${units}–${units + 50} units monthly.`,
        `Cost reduces over time while energy remains constant.`,
        `Strong return for each unit generated.`
      ]
    },
    {
      title: 'Production Scatter View',
      chart: (
        <ScatterChart>
          <XAxis dataKey="x" name="Time" /><YAxis dataKey="y" name="kWh" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Solar Output" data={scatterData} fill="#20b024" />
        </ScatterChart>
      ),
      insights: [
        `Consistent unit generation over months.`,
        `Occasional fluctuations due to seasonal changes.`,
        `Expected to stabilize over 5-year lifecycle.`
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-bodyColor text-white px-4 md:px-10 py-8 font-poppins">
      <h1 className="text-3xl md:text-4xl font-bold text-yellow mb-8">
        Welcome, <span className="text-green">{user}</span> 👋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {chartList.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveChart(item)}
            className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-yellow shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <h2 className="text-lg mb-2 text-yellow font-semibold">{item.title}</h2>
            <div className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                {item.chart}
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {activeChart && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4">
          <div className="bg-[#111] border border-yellow rounded-xl p-8 w-full h-full overflow-auto">
            <button
              className="text-yellow text-3xl font-bold float-right mb-4"
              onClick={() => setActiveChart(null)}
            >✕</button>
            <h2 className="text-3xl text-yellow mb-6 font-semibold">
              {activeChart.title}
            </h2>
            <div className="w-full h-[70vh]">
              <ResponsiveContainer width="100%" height="100%">
                {activeChart.chart}
              </ResponsiveContainer>
            </div>

            {/* Insights Section */}
            <div className="mt-6">
              <h3 className="text-xl text-yellow font-semibold mb-2">Insights</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 text-base leading-relaxed">
                {activeChart.insights?.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
