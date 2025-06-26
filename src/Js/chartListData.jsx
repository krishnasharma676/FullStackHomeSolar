import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ComposedChart,
  ScatterChart,
  Scatter,
} from "recharts"

const COLORS = ["#22c55e", "#eab308", "#f97316", "#ef4444", "#8b5cf6", "#06b6d4"]

// Static data for different charts
const electricityBillData = [
  { name: "Before Solar", cost: 2800, savings: 0 },
  { name: "After Solar", cost: 450, savings: 2350 },
]

const monthlySavingsData = [
  { month: "Jan", savings: 2200, generation: 850 },
  { month: "Feb", savings: 2400, generation: 920 },
  { month: "Mar", savings: 2600, generation: 1050 },
  { month: "Apr", savings: 2800, generation: 1150 },
  { month: "May", savings: 3000, generation: 1250 },
  { month: "Jun", savings: 3200, generation: 1350 },
]


export const getChartList = (resData) => [
  {
    title: `${resData.name}`,
    summary: "Solar homes around you - $2.28",
    description: "Neighborhood solar adoption momentum and pricing trends",
    chart: () => (
      <ScatterChart
        data={[
          { x: 10, y: 20 },
          { x: 30, y: 40 },
          { x: 50, y: 60 },
          { x: 70, y: 30 },
          { x: 90, y: 80 },
          { x: 20, y: 70 },
        ]}
      >
        <XAxis dataKey="x" hide />
        <YAxis dataKey="y" hide />
        <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
        <Scatter dataKey="y" fill="#eab308" />
      </ScatterChart>
    ),
    insights: [
      "Strong neighborhood adoption momentum",
      "Competitive pricing at $2.28 per watt",
      "Growing solar community support",
    ],
  },
  {
    title: "Your Annual Electricity Cost",
    summary: "93% above average - Very high consumption",
    description: "Annual electricity cost analysis and comparison",
    chart: () => (
      <BarChart data={electricityBillData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9ca3af" hide />
        <YAxis stroke="#9ca3af" hide />
        <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
        <Bar dataKey="cost" fill="#eab308" radius={[4, 4, 0, 0]} />
      </BarChart>
    ),
    insights: [
      "93% higher than neighborhood average",
      "Significant potential for solar savings",
      "High consumption indicates good solar ROI",
    ],
  },
  {
    title: "Projected Annual Electricity Cost",
    summary: "Accurate prediction model",
    description: "Future electricity cost projections with solar installation",
    chart: () => (
      <BarChart data={monthlySavingsData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="month" stroke="#9ca3af" hide />
        <YAxis stroke="#9ca3af" hide />
        <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
        <Bar dataKey="generation" fill="#eab308" radius={[4, 4, 0, 0]} />
      </BarChart>
    ),
    insights: [
      "Projected 85% cost reduction with solar",
      "Accurate prediction based on usage patterns",
      "Break-even point within 4 years",
    ],
  },
  {
    title: "OREA ELECTRIC COMPANY",
    summary: "Net metering and credit policies",
    description: "Utility company policies and net metering benefits",
    chart: () => (
      <div className="h-full flex items-center justify-center text-center p-4">
        <div className="space-y-2">
          <div className="text-yellow-400 font-bold text-lg">Net Metering</div>
          <div className="text-sm text-gray-300">1:1 Credit Ratio</div>
          <div className="bg-yellow-400/20 p-2 rounded text-xs">Surplus credits roll over monthly</div>
        </div>
      </div>
    ),
    insights: ["1:1 net metering credit ratio", "Monthly credit rollover policy", "Favorable utility partnership"],
  },
  {
    title: "New High Island Roof Area Comparison",
    summary: "Roof suitability analysis",
    description: "Roof area analysis and solar potential assessment",
    chart: () => (
      <BarChart
        data={[
          { area: "Available", value: 1000 },
          { area: "Suitable", value: 800 },
          { area: "Optimal", value: 600 },
        ]}
        layout="horizontal"
      >
        <XAxis type="number" hide />
        <YAxis dataKey="area" type="category" stroke="#9ca3af" hide />
        <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
        <Bar dataKey="value" fill="#eab308" radius={[0, 4, 4, 0]} />
      </BarChart>
    ),
    insights: ["1000 sq ft total roof area", "800 sq ft suitable for solar", "600 sq ft in optimal position"],
  },
  {
    title: "Very High",
    summary: "76% efficiency rating",
    description: "Overall system performance and efficiency metrics",
    chart: () => (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-yellow-400 rounded-full flex items-center justify-center mb-4">
            <div>
              <div className="text-yellow-400 font-bold text-xl">76%</div>
              <div className="text-gray-400 text-xs">Avg</div>
            </div>
          </div>
          <div className="flex justify-around text-xs">
            <div>
              <div className="text-yellow-400 font-bold">25%</div>
              <div className="text-gray-400">Savings</div>
            </div>
            <div>
              <div className="text-yellow-400 font-bold">25%</div>
              <div className="text-gray-400">Extreme</div>
            </div>
          </div>
        </div>
      </div>
    ),
    insights: [
      "76% average efficiency rating",
      "25% immediate savings potential",
      "High performance system recommended",
    ],
  },
  {
    title: "Energy System In Your Roof",
    summary: "254 ft² optimal placement area",
    description: "Roof analysis and optimal solar panel placement zones",
    chart: () => (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="grid grid-cols-8 gap-1 mb-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full opacity-60" />
            ))}
          </div>
          <div className="text-yellow-400 font-bold text-lg">254 ft²</div>
          <div className="text-gray-400 text-xs">1,203 ft² | 815 ft²</div>
        </div>
      </div>
    ),
    insights: [
      "254 sq ft optimal placement area",
      "Maximum system capacity: 15kW",
      "Excellent roof orientation and tilt",
    ],
  },
  {
    title: "CAN SOLAR WORK FOR 720 Bufferfield Street?",
    summary: "High likelihood of solar success",
    description: "Comprehensive solar viability assessment for your property",
    chart: () => (
      <div className="h-full flex items-center justify-center text-center">
        <div>
          <h2 className="text-white text-lg mb-1">CAN SOLAR WORK FOR</h2>
          <h1 className="text-yellow-400 text-3xl font-bold mb-4">720 Bufferfield Street?</h1>
          <div className="flex items-center justify-center gap-4">
            <span className="text-gray-400 text-xs uppercase">UNLIKELY</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((dot) => (
                <div key={dot} className={`w-3 h-3 rounded-full ${dot <= 3 ? "bg-yellow-400" : "bg-gray-600"}`} />
              ))}
            </div>
            <span className="text-gray-400 text-xs uppercase">LIKELY</span>
          </div>
        </div>
      </div>
    ),
    insights: ["High solar viability score", "Excellent roof conditions", "Strong financial benefits projected"],
  },
  {
    title: "Your Grid Quality Is Good",
    summary: "Stable grid connection",
    description: "Electrical grid quality and stability assessment",
    chart: () => (
      <PieChart>
        <Pie
          data={[
            { name: "Good", value: 75 },
            { name: "Issues", value: 25 },
          ]}
          cx="50%"
          cy="50%"
          outerRadius={40}
          dataKey="value"
        >
          <Cell fill="#22c55e" />
          <Cell fill="#ef4444" />
        </Pie>
        <Tooltip />
      </PieChart>
    ),
    insights: ["75% grid stability rating", "Minimal power quality issues", "Good for solar integration"],
  },
  {
    title: "Decrease in Solar Human",
    summary: "Installation workforce trends",
    description: "Solar installation workforce and capacity trends",
    chart: () => (
      <LineChart
        data={[
          { month: "Jan", workers: 120 },
          { month: "Feb", workers: 115 },
          { month: "Mar", workers: 110 },
          { month: "Apr", workers: 105 },
        ]}
      >
        <XAxis dataKey="month" hide />
        <YAxis hide />
        <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
        <Line type="monotone" dataKey="workers" stroke="#eab308" strokeWidth={2} />
      </LineChart>
    ),
    insights: [
      "Slight decrease in available installers",
      "May affect installation timeline",
      "Book installation early",
    ],
  },
  {
    title: "Your Annual Electricity Bill - Very High",
    summary: "$4,200 annual spend",
    description: "Current annual electricity expenditure analysis",
    chart: () => (
      <div className="h-full flex items-center justify-center text-center">
        <div>
          <div className="text-yellow-400 text-4xl font-bold mb-2">$4,200</div>
          <div className="text-gray-400 text-xs uppercase">WILL SPEND AROUND</div>
          <div className="text-gray-400 text-xs">AS ELECTRICITY THIS YEAR</div>
        </div>
      </div>
    ),
    insights: [
      "$4,200 annual electricity cost",
      "Very high compared to average",
      "Excellent candidate for solar savings",
    ],
  },
  {
    title: "Your Real Grid Deliver Is 48%",
    summary: "Perfectly fine delivery rate",
    description: "Grid delivery efficiency and reliability metrics",
    chart: () => (
      <ComposedChart
        data={[
          { name: "Delivery", value: 48, target: 100 },
          { name: "Reliability", value: 85, target: 100 },
        ]}
      >
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
        <Bar dataKey="value" fill="#eab308" />
        <Line type="monotone" dataKey="target" stroke="#22c55e" strokeDasharray="5 5" />
      </ComposedChart>
    ),
    insights: ["48% grid delivery efficiency", "Within acceptable range", "No impact on solar performance"],
  },
  
  {
    title: "Above Average",
    summary: "1,427 ft² roof area available",
    description: "Roof area analysis compared to neighborhood average",
    chart: () => (
      <div className="h-full flex items-center justify-center text-center">
        <div>
          <div className="grid grid-cols-6 gap-1 mb-4">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full opacity-40" />
            ))}
          </div>
          <div className="text-yellow-400 font-bold text-lg">1,427 ft²</div>
          <div className="text-gray-400 text-xs">$58.97</div>
        </div>
      </div>
    ),
    insights: ["1,427 sq ft total roof area", "Above neighborhood average", "Excellent solar potential"],
  },
  {
    title: "Very High Risk Factors",
    summary: "Weather and natural disaster assessment",
    description: "Comprehensive risk analysis for solar installation",
    chart: () => (
      <div className="h-full flex flex-col justify-center space-y-1">
        {[
          { label: "Lightning", level: "VERY HIGH", color: "text-red-400" },
          { label: "Hurricane", level: "VERY HIGH", color: "text-red-400" },
          { label: "Tornado", level: "MEDIUM", color: "text-yellow-400" },
          { label: "Drought", level: "LOW", color: "text-green-400" },
          { label: "Flooding", level: "MEDIUM", color: "text-yellow-400" },
        ].map((risk, idx) => (
          <div key={idx} className={`text-xs ${risk.color} bg-gray-800 p-1 rounded`}>
            {risk.label} - {risk.level}
          </div>
        ))}
        <div className="text-yellow-400 font-bold text-xs text-center mt-2">HURRICANE MILTON</div>
      </div>
    ),
    insights: [
      "High weather risk factors present",
      "Recommend enhanced mounting system",
      "Insurance considerations important",
    ],
  },
  {
    title: "Climate Change Hours",
    summary: "70% and 85% efficiency ratings",
    description: "Climate impact on solar system performance",
    chart: () => (
      <div className="h-full flex justify-center items-end space-x-4">
        <div className="flex flex-col items-center">
          <div className="w-4 h-16 bg-gray-700 rounded relative">
            <div className="absolute bottom-0 w-full bg-yellow-400 rounded" style={{ height: "70%" }} />
          </div>
          <span className="text-xs text-gray-400 mt-1">70%</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-4 h-16 bg-gray-700 rounded relative">
            <div className="absolute bottom-0 w-full bg-yellow-400 rounded" style={{ height: "85%" }} />
          </div>
          <span className="text-xs text-gray-400 mt-1">85%</span>
        </div>
      </div>
    ),
    insights: [
      "70-85% climate efficiency range",
      "Minimal climate impact on performance",
      "System designed for local conditions",
    ],
  },
  {
    title: "Visibility of Your Roof Structure Is Visible",
    summary: "Clear roof access and visibility",
    description: "Roof accessibility and structural visibility assessment",
    chart: () => (
      <div className="h-full bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded flex items-center justify-center">
        <div className="text-center">
          <div className="text-green-400 font-bold text-lg mb-2">VISIBLE</div>
          <div className="text-gray-400 text-xs">Clear roof structure access</div>
        </div>
      </div>
    ),
    insights: ["Excellent roof visibility", "Easy installation access", "No structural obstructions"],
  },
  {
    title: "Your Sunshine Exposure Is Optimal",
    summary: "1,769 hours of unobstructed sunlight",
    description: "Annual sunshine exposure and solar irradiance analysis",
    chart: () => (
      <div className="h-full flex items-center justify-center text-center">
        <div>
          <div className="text-yellow-400 text-4xl font-bold mb-2">1,769</div>
          <div className="text-gray-400 text-xs">Hours of Unobstructed</div>
          <div className="text-gray-400 text-xs">Sunlight Each Year</div>
          <div className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold mt-2">OPTIMAL</div>
        </div>
      </div>
    ),
    insights: ["1,769 hours annual sunshine", "Optimal exposure rating", "Maximum energy generation potential"],
  },
]
