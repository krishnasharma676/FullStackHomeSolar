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
} from "recharts";

const COLORS = [
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

// Static data for different charts
const electricityBillData = [
  { name: "Before Solar", cost: 2800, savings: 0 },
  { name: "After Solar", cost: 450, savings: 2350 },
];

const monthlySavingsData = [
  { month: "Jan", savings: 2200, generation: 850 },
  { month: "Feb", savings: 2400, generation: 920 },
  { month: "Mar", savings: 2600, generation: 1050 },
  { month: "Apr", savings: 2800, generation: 1150 },
  { month: "May", savings: 3000, generation: 1250 },
  { month: "Jun", savings: 3200, generation: 1350 },
];

export const getChartList = (resData) => [
  {
    title: `${resData.charts.adoptionScore.label}`,
    summary: "High Adoption Zone Score is 82",
    description: "Neighborhood solar adoption momentum and pricing trends",
    chart: () => (
      <div className="h-full flex items-center justify-center text-center">
        <div>
          <div className="text-yellow-400 text-5xl font-bold mb-2">
            {resData.charts.adoptionScore.score}
          </div>
          <div className="text-gray-400 text-sm">Adoption Score</div>
        </div>
      </div>
    ),
    insights: ["High Adoption Zone Score is 82"],
  },
  {
    title: `Your Monthly Bill: ₹${resData.charts.billComparison.userBill}`,
    summary: `${Math.round(
      ((resData.charts.billComparison.userBill -
        resData.charts.billComparison.areaAvg) /
        resData.charts.billComparison.areaAvg) *
        100
    )}% above area avg of ₹${resData.charts.billComparison.areaAvg}`,
    description: "Comparison of your electricity bill with area average",
    chart: () => (
      <BarChart
        data={[
          { name: "You", cost: resData.charts.billComparison.userBill },
          { name: "Area Avg", cost: resData.charts.billComparison.areaAvg },
        ]}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="cost" fill="#eab308" radius={[4, 4, 0, 0]} />
      </BarChart>
    ),
    insights: [
      `Your bill is ₹${resData.charts.billComparison.userBill}`,
      `Area average is ₹${resData.charts.billComparison.areaAvg}`,
      `This is approximately ${Math.round(
        ((resData.charts.billComparison.userBill -
          resData.charts.billComparison.areaAvg) /
          resData.charts.billComparison.areaAvg) *
          100
      )}% higher than your neighborhood average`,
      "Potential to save by switching to solar",
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
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
        />
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
    title: `Bill Projection (2025–2029)`,
    summary: `Starts from ₹${resData.charts.billProjection5Yr[0].projected.toLocaleString()} in ${
      resData.charts.billProjection5Yr[0].year
    }`,
    description: "Future electricity cost projections based on current trends",
    chart: () => (
      <BarChart data={resData.charts.billProjection5Yr}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
          formatter={(value) => `₹${value.toLocaleString()}`}
        />
        <Bar dataKey="projected" fill="#eab308" radius={[4, 4, 0, 0]} />
      </BarChart>
    ),
    insights: [
      `Year ${
        resData.charts.billProjection5Yr[0].year
      }: ₹${resData.charts.billProjection5Yr[0].projected.toLocaleString()}`,
      `Year ${
        resData.charts.billProjection5Yr[4].year
      }: ₹${resData.charts.billProjection5Yr[4].projected.toLocaleString()}`,
      "Install solar now to cut this cost in half over 5 years",
    ],
  },
  {
    title: "Cumulative CO₂ Savings Over 5 Years",
    summary: `${
      resData.charts.co2Cumulative.at(-1).totalCO2
    } kg total CO₂ saved`,
    description: "Total carbon dioxide emissions offset year over year",
    chart: () => (
      <LineChart data={resData.charts.co2Cumulative}>
        <XAxis dataKey="year" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          formatter={(value) => `${value} kg`}
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
        />
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <Line
          type="monotone"
          dataKey="totalCO2"
          stroke="#eab308"
          strokeWidth={2}
        />
      </LineChart>
    ),
    insights: [
      `Year 1 CO₂ savings: ${resData.charts.co2Cumulative[0].totalCO2} kg`,
      `Final Year CO₂ savings: ${
        resData.charts.co2Cumulative.at(-1).totalCO2
      } kg`,
      "Positive environmental impact over 5 years",
    ],
  },

  {
    title: "Your CO₂ Offset Potential",
    summary: `${resData.charts.co2Offset.co2SavedKg} kg CO₂ saved | ${resData.charts.co2Offset.treesEquivalent} trees`,
    description: "Impact of your solar system on the environment",
    chart: () => (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-yellow-400 rounded-full flex items-center justify-center mb-4">
            <div>
              <div className="text-yellow-400 font-bold text-xl">
                {resData.charts.co2Offset.co2SavedKg}
              </div>
              <div className="text-gray-400 text-xs">kg CO₂</div>
            </div>
          </div>
          <div className="flex justify-around text-xs">
            <div>
              <div className="text-yellow-400 font-bold">
                {resData.charts.co2Offset.treesEquivalent}
              </div>
              <div className="text-gray-400">Trees Equivalent</div>
            </div>
          </div>
        </div>
      </div>
    ),
    insights: [
      `${resData.charts.co2Offset.co2SavedKg} kg of carbon dioxide saved`,
      `Equals planting ${resData.charts.co2Offset.treesEquivalent} trees`,
      "Major environmental contribution through solar energy",
    ],
  },
  {
    title: "Cost Comparison Before & After Solar",
    summary: "Savings over 5 years through solar adoption",
    description:
      "Compare electricity cost before and after installing solar panels",
    chart: () => (
      <BarChart data={resData.charts.costComparison}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="beforeCost" fill="#ef4444" name="Before Solar" />
        <Bar dataKey="afterCost" fill="#22c55e" name="After Solar" />
      </BarChart>
    ),
    insights: [
      `Initial Year Cost Without Solar: ₹${resData.charts.costComparison[0].beforeCost}`,
      `Final Year Cost With Solar: ₹${resData.charts.costComparison[4].afterCost}`,
      `Total Savings: ₹${resData.charts.costComparison[4].savings}`,
    ],
  },
  {
    title: "ROI From Solar Investment",
    summary: `₹${resData.charts.investmentROI.lifetimeSavings} lifetime savings, ROI: ${resData.charts.investmentROI.roi}x`,
    description: "Expected return on investment from your solar panel system",
    chart: () => (
      <div className="h-full flex items-center justify-center text-center">
        <div>
          <h2 className="text-white text-lg mb-1">SOLAR ROI</h2>
          <h1 className="text-yellow-400 text-3xl font-bold mb-4">
            {resData.charts.investmentROI.roi}x RETURN
          </h1>
          <div className="flex items-center justify-center gap-4">
            <span className="text-gray-400 text-xs uppercase">LOW</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((dot) => (
                <div
                  key={dot}
                  className={`w-3 h-3 rounded-full ${
                    dot <= resData.charts.investmentROI.roi
                      ? "bg-yellow-400"
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400 text-xs uppercase">HIGH</span>
          </div>
        </div>
      </div>
    ),
    insights: [
      `System Cost: ₹${resData.charts.investmentROI.systemCost}`,
      `Estimated Lifetime Savings: ₹${resData.charts.investmentROI.lifetimeSavings}`,
      `Return on Investment: ${resData.charts.investmentROI.roi}x`,
    ],
  },
  {
    title: "Maintenance Cost Over Years",
    summary: "Consistent yearly maintenance cost for solar system",
    description:
      "Breakdown of annual maintenance expenses to keep your solar system running efficiently",
    chart: () => (
      <BarChart data={resData.charts.maintenanceOverYears}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="cost" fill="#eab308" radius={[4, 4, 0, 0]} />
      </BarChart>
    ),
    insights: [
      `₹${resData.charts.maintenanceOverYears[0].cost} annual maintenance cost`,
      "Flat yearly cost — no increase over time",
      "Ensures reliable performance with low upkeep",
    ],
  },
  {
    title: "Your Past 5-Year Electricity Bill Trend",
    summary: "Historical electricity expenses in your home",
    description:
      "Visual representation of your past electricity bill over 5 years",
    chart: () => (
      <LineChart data={resData.charts.pastBillTrend}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#eab308"
          strokeWidth={2}
        />
      </LineChart>
    ),
    insights: [
      `In 2020, your bill was ₹${
        resData.charts.pastBillTrend.find((x) => x.year === 2020)?.amount || 0
      }`,
      `In 2024, it reduced to ₹${
        resData.charts.pastBillTrend.find((x) => x.year === 2024)?.amount || 0
      }`,
      "Steady decline indicates potential energy saving patterns",
    ],
  },
  {
    title: "SIP vs FD Returns Over 5 Years",
    summary: "Compare returns between SIP and Fixed Deposit",
    description:
      "Financial comparison of SIP investment vs traditional FD returns over 5 years",
    chart: () => (
      <ComposedChart
        data={resData.charts.sipVsFdReturns.SIP.map((sipItem, index) => ({
          year: sipItem.year,
          SIP: sipItem.value,
          FD: resData.charts.sipVsFdReturns.FD[index]?.value || 0,
        }))}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="SIP" fill="#eab308" />
        <Bar dataKey="FD" fill="#06b6d4" />
      </ComposedChart>
    ),
    insights: [
      `After 5 years, SIP value: ₹${
        resData.charts.sipVsFdReturns.SIP[4]?.value || 0
      }`,
      `FD value: ₹${resData.charts.sipVsFdReturns.FD[4]?.value || 0}`,
      "SIP offers higher long-term returns compared to FD",
    ],
  },
  {
    title: "Solar Production Over 5 Years",
    summary: `Annual production trend for your 3kW system`,
    description:
      "Estimated annual solar energy production and year-over-year performance decline",
    chart: () => (
      <LineChart
        data={resData.charts.solarProduction.map((item) => ({
          year: item.year,
          production: item.production,
        }))}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
        />
        <Line
          type="monotone"
          dataKey="production"
          stroke="#eab308"
          strokeWidth={2}
        />
      </LineChart>
    ),
    insights: [
      `Year 1 production: ${resData.charts.solarProduction[0]?.production} kWh`,
      `Year 5 production: ${resData.charts.solarProduction[4]?.production} kWh`,
      "Standard performance degradation of 1%–2% annually",
    ],
  },
  {
    title: "Tariff, Bill & Units Over Years",
    summary: `Latest bill: ₹${resData.charts.tariffVsBillVsUnits[4]?.bill}`,
    description:
      "Analysis of electricity tariff, units consumed, and resulting bill over the next 5 years",
    chart: () => (
      <ComposedChart
        data={resData.charts.tariffVsBillVsUnits.map((item) => ({
          year: item.year,
          tariff: item.tariff,
          units: item.units,
          bill: item.bill,
        }))}
      >
        <XAxis dataKey="year" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="bill" fill="#eab308" />
        <Line
          type="monotone"
          dataKey="tariff"
          stroke="#22c55e"
          strokeWidth={2}
        />
      </ComposedChart>
    ),
    insights: [
      `Bill grew from ₹${resData.charts.tariffVsBillVsUnits[0].bill} to ₹${resData.charts.tariffVsBillVsUnits[4].bill}`,
      "Steady 3x tariff increase every year",
      "Units remain constant while cost explodes",
    ],
  },
  {
    title: `Your Monthly Bill After Solar: ₹${resData.summary.afterBill}`,
    summary: "Post-installation electricity bill",
    description: "Projected monthly electricity cost after switching to solar",
    chart: () => (
      <div className="h-full flex flex-col justify-center items-center text-center">
        <div className="text-yellow-400 font-bold text-4xl mb-2">
          ₹{resData.summary.afterBill}
        </div>
        <div className="text-gray-400 text-xs uppercase">
          PER MONTH AFTER INSTALLATION
        </div>
        <div className="text-gray-400 text-xs">
          Substantial reduction from ₹{resData.user.bill}
        </div>
      </div>
    ),
    insights: [
      `Monthly bill reduced from ₹${resData.user.bill} to ₹${resData.summary.afterBill}`,
      "80%+ savings on electricity cost",
      "Efficient solar performance expected",
    ],
  },
  {
    title: `CO₂ Saved: ${resData.summary.co2SavedKg.toLocaleString()} Kg`,
    summary: `${resData.summary.treesEquivalent.toLocaleString()} Trees Equivalent`,
    description:
      "Environmental impact and carbon savings from solar installation",
    chart: () => (
      <div className="h-full flex justify-center items-end space-x-4">
        <div className="flex flex-col items-center">
          <div className="w-4 h-16 bg-gray-700 rounded relative">
            <div
              className="absolute bottom-0 w-full bg-yellow-400 rounded"
              style={{ height: "70%" }}
            />
          </div>
          <span className="text-xs text-gray-400 mt-1">70%</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-4 h-16 bg-gray-700 rounded relative">
            <div
              className="absolute bottom-0 w-full bg-yellow-400 rounded"
              style={{ height: "85%" }}
            />
          </div>
          <span className="text-xs text-gray-400 mt-1">85%</span>
        </div>
      </div>
    ),
    insights: [
      `${resData.summary.co2SavedKg.toLocaleString()} Kg of CO₂ offset`,
      `Equal to planting ${resData.summary.treesEquivalent.toLocaleString()} trees`,
      "Significant positive climate contribution",
    ],
  },
  {
    title: `Lifetime Savings: ₹${resData.summary.lifetimeSavings.toLocaleString()}`,
    summary: "Clear roof access and visibility",
    description: "Roof accessibility and structural visibility assessment",
    chart: () => (
      <div className="h-full bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded flex items-center justify-center">
        <div className="text-center">
          <div className="text-green-400 font-bold text-lg mb-2">VISIBLE</div>
          <div className="text-gray-400 text-xs">
            Clear roof structure access
          </div>
        </div>
      </div>
    ),
    insights: [
      `₹${resData.summary.lifetimeSavings.toLocaleString()} total savings projected`,
      "Excellent roof visibility",
      "No structural obstructions, easy install",
    ],
  },
  {
    title: `Monthly Savings: ₹${resData.summary.monthlySavings.toLocaleString()}`,
    summary: "1,769 hours of unobstructed sunlight",
    description: "Annual sunshine exposure and solar irradiance analysis",
    chart: () => (
      <div className="h-full flex items-center justify-center text-center">
        <div>
          <div className="text-yellow-400 text-4xl font-bold mb-2">1,769</div>
          <div className="text-gray-400 text-xs">Hours of Unobstructed</div>
          <div className="text-gray-400 text-xs">Sunlight Each Year</div>
          <div className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold mt-2">
            OPTIMAL
          </div>
        </div>
      </div>
    ),
    insights: [
      `₹${resData.summary.monthlySavings.toLocaleString()} saved monthly`,
      "1,769 hours annual sunshine",
      "Maximum energy generation potential",
    ],
  },
  
  // {
  //   title: `Payback Period: ${resData.summary.paybackYears} Years`,
  //   summary: "Solar ROI timeline",
  //   description: "Years required to recover your solar investment",
  //   chart: () => (
  //     <div className="h-full flex items-center justify-center text-center">
  //       <div>
  //         <div className="text-yellow-400 text-4xl font-bold mb-2">
  //           {resData.summary.paybackYears} Yrs
  //         </div>
  //         <div className="text-gray-400 text-xs">To Recover Cost</div>
  //       </div>
  //     </div>
  //   ),
  //   insights: [
  //     `${resData.summary.paybackYears}-year payback period`,
  //     "Fast return on investment",
  //     "Significant long-term savings",
  //   ],
  // },
  // {
  //   title: `Return on Investment: ${resData.summary.roi}x`,
  //   summary: "Solar return analysis",
  //   description: "Total ROI from your solar system over its lifespan",
  //   chart: () => (
  //     <div className="h-full flex items-center justify-center text-center">
  //       <div>
  //         <div className="text-yellow-400 text-4xl font-bold mb-2">
  //           {resData.summary.roi}x
  //         </div>
  //         <div className="text-gray-400 text-xs">Total ROI Achieved</div>
  //       </div>
  //     </div>
  //   ),
  //   insights: [
  //     `${resData.summary.roi}x return on investment`,
  //     "High financial efficiency",
  //     "Excellent long-term benefits",
  //   ],
  // },
  // {
  //   title: `Solar Size: ${resData.summary.solarSizeKW} kW`,
  //   summary: "Recommended system capacity",
  //   description: "Optimal solar system size based on your usage",
  //   chart: () => (
  //     <div className="h-full flex items-center justify-center text-center">
  //       <div>
  //         <div className="text-yellow-400 text-4xl font-bold mb-2">
  //           {resData.summary.solarSizeKW} kW
  //         </div>
  //         <div className="text-gray-400 text-xs">Optimal System Size</div>
  //       </div>
  //     </div>
  //   ),
  //   insights: [
  //     `${resData.summary.solarSizeKW} kW recommended capacity`,
  //     "Enough to power your home",
  //     "Designed for max efficiency",
  //   ],
  // },
  // {
  //   title: `System Cost: ₹${resData.summary.systemCost.toLocaleString()}`,
  //   summary: "Total cost of your solar setup",
  //   description: "Includes installation, panels, inverter & wiring",
  //   chart: () => (
  //     <div className="h-full flex items-center justify-center text-center">
  //       <div>
  //         <div className="text-yellow-400 text-2xl font-bold mb-2">
  //           ₹{resData.summary.systemCost.toLocaleString()}
  //         </div>
  //         <div className="text-gray-400 text-xs">Total Solar System Cost</div>
  //       </div>
  //     </div>
  //   ),
  //   insights: [
  //     `₹${resData.summary.systemCost.toLocaleString()} system investment`,
  //     "One-time cost including installation",
  //     "Recoverable within few years",
  //   ],
  // },
  // {
  //   title: `Total Savings: ₹${resData.summary.totalSavings.toLocaleString()}`,
  //   summary: "Lifetime solar savings estimate",
  //   description: "Projected savings over 25 years of solar usage",
  //   chart: () => (
  //     <div className="h-full flex items-center justify-center text-center">
  //       <div>
  //         <div className="text-yellow-400 text-2xl font-bold mb-2">
  //           ₹{resData.summary.totalSavings.toLocaleString()}
  //         </div>
  //         <div className="text-gray-400 text-xs">Over Solar Lifetime</div>
  //       </div>
  //     </div>
  //   ),
  //   insights: [
  //     `₹${resData.summary.totalSavings.toLocaleString()} in savings`,
  //     "Massive cost reduction over 25 years",
  //     "Zero electricity bills possible",
  //   ],
  // },
  // {
  //   title: `Environmental Impact: ${resData.summary.treesEquivalent} Trees`,
  //   summary: "Your carbon offset contribution",
  //   description: "Equivalent number of trees saved by going solar",
  //   chart: () => (
  //     <div className="h-full flex flex-col items-center justify-center text-center">
  //       <div className="text-green-400 text-4xl font-bold mb-2">
  //         {resData.summary.treesEquivalent}
  //       </div>
  //       <div className="text-gray-400 text-xs">Trees Saved</div>
  //     </div>
  //   ),
  //   insights: [
  //     `${resData.summary.treesEquivalent} trees saved`,
  //     "Massive CO2 offset contribution",
  //     "Great for the environment",
  //   ],
  // },
];
