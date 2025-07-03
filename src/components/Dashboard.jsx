// "use client"

// import { useState } from "react"
// import { ResponsiveContainer } from "recharts"
// import { getChartList } from "../Js/chartListData"
// import { useLocation } from "react-router-dom"


// const Dashboard = () => {
//   const location = useLocation();
//   const resData = location.state; // iske andr pura response h jo backend ka h iska use kro

//   console.log("Dashboard data:", resData);
//   const chartList = getChartList(resData); 

//   const [activeChart, setActiveChart] = useState(null)

//   const getGridPosition = (idx) => {
//     const positions = {
//   0: "col-start-1 col-end-3 row-start-1 row-end-3",
//   1: "col-start-3 col-end-5 row-start-1 row-end-3",
//   2: "col-start-5 col-end-7 row-start-1 row-end-3",
//   3: "col-start-7 col-end-9 row-start-1 row-end-3",
//   4: "col-start-9 col-end-11 row-start-1 row-end-2",
//   5: "col-start-11 col-end-13 row-start-1 row-end-3",
//   6: "col-start-1 col-end-5 row-start-3 row-end-5",
//   7: "col-start-5 col-end-9 row-start-3 row-end-5",
//   8: "col-start-9 col-end-11 row-start-2 row-end-4",
//   9: "col-start-11 col-end-13 row-start-3 row-end-5",
//   10: "col-start-1 col-end-3 row-start-5 row-end-7",
//   11: "col-start-3 col-end-7 row-start-5 row-end-7",
//   12: "col-start-7 col-end-9 row-start-5 row-end-7", // 🆕 added
//   13: "col-start-9 col-end-11 row-start-5 row-end-7", // 🆕 added
//   14: "col-start-11 col-end-13 row-start-5 row-end-7",
//   15: "col-start-9 col-end-11 row-start-4 row-end-6",
//   16: "col-start-9 col-end-11 row-start-6 row-end-8",
//   17: "col-start-11 col-end-14 row-start-4 row-end-6",
// };

//     return positions[idx] || ""
//   }

//   const isHighlightCard = (idx) => idx === 7

//   return (
//     <div className="min-h-screen bg-bodyColor px-4 pb-8">
//       <div className="max-w-screen-2xl mx-auto">
//         <div className="text-center mb-6 pt-6">
//           <p className="text-gray-300">Comprehensive solar energy performance insights</p>
//         </div>

//         {/* ✅ Large Screen Grid */}
//         <div className="hidden lg:grid grid-cols-12 grid-rows-8 gap-4 h-[900px]">
//           {chartList.map((item, idx) => {
//             if (idx === 13) return null

//             return (
//               <div
//                 key={idx}
//                 onClick={() => setActiveChart(item)}
//                 className={`
//                   cursor-pointer transition-all duration-300 hover:z-10 hover:scale-[1.01]
//                   ${isHighlightCard(idx)
//                     ? "bg-yellow text-black m-2 rounded-xl border-2 border-yellow p-6"
//                     : "bg-gradient-to-br from-yellow/10 to-green/10 hover:from-yellow/20 hover:to-green/20 p-4"}
//                   backdrop-blur-sm hover:shadow-2xl hover:shadow-yellow/20
//                   group relative overflow-hidden rounded-xl
//                   ${getGridPosition(idx)}
//                 `}
//               >
//                 {!isHighlightCard(idx) && (
//                   <>
//                     <div className="absolute right-0 top-0 w-px h-full bg-gray-700/20" />
//                     <div className="absolute bottom-0 left-0 w-full h-px bg-gray-700/20" />
//                   </>
//                 )}

//                 <div className="absolute inset-0 bg-gradient-to-r from-yellow/5 to-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                 <div className="relative z-10 h-full flex flex-col">
//                   {isHighlightCard(idx) ? (
//                     <div className="h-full flex items-center justify-center text-center">
//                       <div>
//                         {/* <h2 className="text-white text-xl font-normal mb-2 tracking-wide">CAN SOLAR WORK FOR</h2> */}
//                         <h1 className="text-black text-heading font-bold mb-8 tracking-wide">TheSolarHome</h1>
//                         <div className="flex items-center justify-center gap-6">
//                           {/* <span className="text-gray text-sm font-medium uppercase tracking-wider">UNLIKELY</span> */}
//                           {/* <div className="flex gap-3">
//                             {[1, 2, 3, 4].map((dot) => (
//                               <div
//                                 key={dot}
//                                 className={`w-4 h-4 rounded-full ${dot <= 3 ? "bg-yellow" : "bg-gray-600"}`}
//                               />
//                             ))}
//                           </div> */}
//                           {/* <span className="text-gray text-sm font-medium uppercase tracking-wider">LIKELY</span> */}
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex items-center justify-between mb-2">
//                         <h2 className="text-xs font-semibold text-yellow group-hover:text-yellow-300 transition-colors uppercase leading-tight">
//                           {item.title}
//                         </h2>
//                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
//                       </div>

//                       <div className="flex-1 mb-2 min-h-[80px] sm:min-h-[120px]">
//                         <ResponsiveContainer width="100%" height="100%">
//                           {item.chart()}
//                         </ResponsiveContainer>
//                       </div>

//                       {item.summary && (
//                         <p className="text-xs text-gray group-hover:text-gray-200 transition-colors leading-tight">
//                           {item.summary}
//                         </p>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             )
//           })}
//         </div>

//         {/* ✅ Mobile Layout */}
//         <div className="grid grid-cols-1 gap-4 lg:hidden mt-4">
//           {chartList.map((item, idx) => (
//             <div
//               key={idx}
//               onClick={() => setActiveChart(item)}
//               className="p-4 bg-gradient-to-br from-yellow/10 to-green/10 rounded-xl backdrop-blur-sm hover:shadow-xl transition-all duration-300"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h2 className="text-xs font-semibold text-yellow uppercase">{item.title}</h2>
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//               </div>
//               <div className="min-h-[120px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   {item.chart()}
//                 </ResponsiveContainer>
//               </div>
//               {item.summary && (
//                 <p className="text-xs text-gray-300 mt-2">{item.summary}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ✅ Chart Modal */}
//       {activeChart && (
//         <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center px-4">
//           <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-yellow/30 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-auto relative shadow-2xl">
//             <button
//               className="absolute top-6 right-8 text-yellow hover:text-yellow-300 text-3xl font-bold transition-colors z-10"
//               onClick={() => setActiveChart(null)}
//             >
//               ✕
//             </button>

//             <div className="mb-8">
//               <h2 className="text-3xl text-yellow mb-2 font-bold">{activeChart.title}</h2>
//               {activeChart.description && <p className="text-gray-300 text-lg">{activeChart.description}</p>}
//             </div>

//             <div className="w-full h-[60vh] mb-8 bg-slate-900/50 rounded-xl p-4">
//               <ResponsiveContainer width="100%" height="100%">
//                 {activeChart.chart()}
//               </ResponsiveContainer>
//             </div>

//             {activeChart.insights?.length > 0 && (
//               <div className="bg-slate-900/50 rounded-xl p-6">
//                 <h3 className="text-yellow text-xl font-bold mb-4 flex items-center">
//                   <span className="w-2 h-2 bg-green rounded-full mr-3"></span>
//                   Key Insights
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {activeChart.insights.map((point, idx) => (
//                     <div key={idx} className="flex items-start space-x-3">
//                       <div className="w-1.5 h-1.5 bg-yellow rounded-full mt-2 flex-shrink-0"></div>
//                       <p className="text-gray-300">{point}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Dashboard


// "use client";

// import { useState } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   LabelList,
// } from "recharts";
// import { useLocation } from "react-router-dom";

// const Dashboard = () => {
//   const location = useLocation();
//   const resData = location.state;

//   const [activeChart, setActiveChart] = useState(null);

//   const renderBarChart = (data) => (
//     <ResponsiveContainer width="100%" height={200}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//         <XAxis dataKey="year" tick={{ fill: "#D1D5DB" }} />
//         <YAxis tick={{ fill: "#D1D5DB" }} />
//         <Tooltip />
//         <Bar dataKey="annualBill" fill="#FBBF24">
//           <LabelList dataKey="annualBill" position="top" />
//         </Bar>
//       </BarChart>
//     </ResponsiveContainer>
//   );

//   const renderAdoptionStars = (score) => {
//     const stars = [];
//     const full = Math.floor(score / 20);
//     const decimal = (score % 20) / 20;

//     for (let i = 0; i < full; i++) stars.push("full");
//     if (decimal >= 0.75) stars.push("full");
//     else if (decimal >= 0.25) stars.push("half");

//     while (stars.length < 5) stars.push("empty");

//     return stars.map((type, i) => (
//       <span key={i} className="text-xl">
//         {type === "full" && <span className="text-yellow">★</span>}
//         {type === "half" && <span className="text-yellow">⯨</span>}
//         {type === "empty" && <span className="text-gray-600">☆</span>}
//       </span>
//     ));
//   };

//   return (
//     <div className="min-h-screen  text-white p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-4 gap-6 auto-rows-auto">
//           <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
//             <h3 className="text-yellow text-sm font-bold mb-4">MOMENTUM</h3>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-yellow mb-2">85%</div>
//               <div className="text-gray text-sm">Solar Ready</div>
//             </div>
//           </div>

//           <div
//             className="col-span-2 bg-[#1e293b] border border-[#334155] rounded-xl p-6 cursor-pointer"
//             onClick={() => setActiveChart({ type: "bar", title: "Last 5 Year Bills", data: resData.LastFiveYearBillChart, insight: ["You’ve seen a steady increase in electricity bills.", "2025 projection is the highest yet."] })}
//           >
//             <h3 className="text-yellow text-sm font-bold mb-4">LAST 5 YEAR BILLS</h3>
//             {renderBarChart(resData.LastFiveYearBillChart)}
//           </div>

//           <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
//             <h3 className="text-yellow text-sm font-bold mb-4">SAVINGS</h3>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-green mb-2">₹8.5L</div>
//               <div className="text-gray text-sm">25 Years</div>
//             </div>
//           </div>

//           <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
//             <h3 className="text-yellow text-sm font-bold mb-4">ENERGY IMPACT</h3>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-yellow mb-2">High</div>
//               <div className="text-gray text-sm mb-4">Roof Potential</div>
//               <div className="grid grid-cols-6 gap-1">
//                 {Array.from({ length: 30 }, (_, i) => (
//                   <div key={i} className={`w-2 h-2 rounded-full ${Math.random() > 0.3 ? "bg-yellow" : "bg-gray-700"}`} />
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="col-span-2 text-heading flex content-center items-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow rounded-xl p-6" style={{display:"flex", justifyContent:"center"}}>
//             <div className="text-center flex content-center items-center">
//               <h2 className="text-heading font-bold text-white mb-4">TheSolarHome</h2>
//               <div className="flex items-center justify-center gap-4">
//               </div>
//             </div>
//           </div>

//           <div
//             className="col-span-2 bg-[#1e293b] border border-[#334155] rounded-xl p-6 cursor-pointer"
//             onClick={() => setActiveChart({ type: "bar", title: "Projected Bills (Next 5 Years)", data: resData.projectedBillNextFiveYears, insight: ["Bill expected to grow ~20% over 5 years.", "Plan solar accordingly."] })}
//           >
//             <h3 className="text-yellow text-sm font-bold mb-4">PROJECTED BILLS (NEXT 5 YEARS)</h3>
//             {renderBarChart(resData.projectedBillNextFiveYears)}
//           </div>

//           <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
//             <h3 className="text-yellow text-sm font-bold mb-4">ADOPTION SCORE</h3>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-yellow mb-2">{resData.adoptionScore}/100</div>
//               <div className="flex justify-center">{renderAdoptionStars(resData.adoptionScore)}</div>
//             </div>
//           </div>
//         </div>

//         {activeChart && (
//           <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
//             <div className="bg-[#1f2937] border border-yellow rounded-xl p-8 max-w-4xl w-full relative">
//               <button
//                 className="absolute top-4 right-6 text-yellow hover:text-yellow-300 text-2xl"
//                 onClick={() => setActiveChart(null)}
//               >
//                 ✕
//               </button>
//               <h2 className="text-2xl text-yellow mb-4">{activeChart.title}</h2>
//               <div className="h-96 mb-6">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={activeChart.data}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                     <XAxis dataKey="year" tick={{ fill: "#D1D5DB" }} />
//                     <YAxis tick={{ fill: "#D1D5DB" }} />
//                     <Tooltip />
//                     <Bar dataKey="annualBill" fill="#FBBF24">
//                       <LabelList dataKey="annualBill" position="top" />
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//               {activeChart.insight && (
//                 <div className="bg-[#0f172a] border border-[#334155] rounded-lg p-4">
//                   <h3 className="text-yellow text-lg font-semibold mb-2">Key Insights</h3>
//                   <ul className="list-disc pl-5 text-gray-300 space-y-1">
//                     {activeChart.insight.map((ins, i) => (
//                       <li key={i}>{ins}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



"use client"

import { useState } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useLocation } from "react-router-dom"
import { Zap, Sun, Home, TrendingUp, Shield, Battery, Gauge, Star, DollarSign, Activity } from "lucide-react"

const Dashboard = () => {
  const location = useLocation()
  const resData = location.state
  const [activeChart, setActiveChart] = useState(null)

  // Static data for missing charts
  const staticSavingsData = [
    { year: "Y1", savings: 12000 },
    { year: "Y2", savings: 28000 },
    { year: "Y3", savings: 42000 },
    { year: "Y4", savings: 58000 },
    { year: "Y5", savings: 75000 },
  ]

  const staticRiskData = [
    { name: "Low Risk", value: 65, color: "#10B981" },
    { name: "Medium Risk", value: 25, color: "#F59E0B" },
    { name: "High Risk", value: 10, color: "#EF4444" },
  ]

  const renderBarChart = (data, color = "#F59E0B") => (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} />
        <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F3F4F6",
          }}
        />
        <Bar dataKey="annualBill" fill={color} radius={[4, 4, 0, 0]}>
          <LabelList dataKey="annualBill" position="top" style={{ fill: "#F3F4F6", fontSize: "10px" }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )

  const renderLineChart = (data) => (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="year" tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} />
        <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F3F4F6",
          }}
        />
        <Line
          type="monotone"
          dataKey="savings"
          stroke="#10B981"
          strokeWidth={3}
          dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )

  const renderPieChart = (data) => (
    <ResponsiveContainer width="100%" height={120}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={25} outerRadius={50} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )

  const renderAdoptionStars = (score) => {
    const stars = []
    const full = Math.floor(score / 20)
    const decimal = (score % 20) / 20

    for (let i = 0; i < full; i++) stars.push("full")
    if (decimal >= 0.75) stars.push("full")
    else if (decimal >= 0.25) stars.push("half")
    while (stars.length < 5) stars.push("empty")

    return stars.map((type, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${type === "full" ? "text-yellow fill-yellow" : type === "half" ? "text-yellow fill-yellow/50" : "text-gray-600"}`}
      />
    ))
  }

  // Calculate momentum percentage based on adoption score
  const getMomentumPercentage = (adoptionScore) => {
    if (adoptionScore >= 80) return 95
    if (adoptionScore >= 60) return 85
    if (adoptionScore >= 40) return 70
    if (adoptionScore >= 20) return 55
    return 35
  }

  const momentumPercentage = getMomentumPercentage(resData?.adoptionScore || 55)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow to-orange-500 bg-clip-text text-transparent mb-2">
            TheSolarHome
          </h1>
          <p className="text-gray">Advanced Solar Analytics Dashboard</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-4 gap-6">
          {/* Row 1 */}
          <div className="group bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-yellow" />
              </div>
              <h3 className="text-yellow font-bold text-sm">MOMENTUM</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow to-orange-500 bg-clip-text text-transparent mb-2">
                {momentumPercentage}%
              </div>
              <div className="text-gray text-sm mb-4">Solar Ready Score</div>
              <div className="flex justify-center mb-3">{renderAdoptionStars(resData?.adoptionScore || 55)}</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-yellow to-orange-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${momentumPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div
            className="col-span-2 group bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20 cursor-pointer"
            onClick={() =>
              setActiveChart({
                type: "bar",
                title: "Last 5 Year Bills",
                data: resData?.LastFiveYearBillChart || [],
                insight: [
                  `Your electricity bills have increased by ${
                    resData?.LastFiveYearBillChart
                      ? Math.round(
                          ((resData.LastFiveYearBillChart[resData.LastFiveYearBillChart.length - 1]?.annualBill -
                            resData.LastFiveYearBillChart[0]?.annualBill) /
                            resData.LastFiveYearBillChart[0]?.annualBill) *
                            100,
                        )
                      : 17
                  }% over 5 years.`,
                  "Solar can reduce these costs by 70-80%.",
                  "Peak consumption shows consistent upward trend.",
                  "Average annual increase of ₹2,000-3,000.",
                ],
              })
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow" />
              </div>
              <h3 className="text-yellow font-bold text-sm">LAST 5 YEAR BILLS (DYNAMIC)</h3>
            </div>
            {resData?.LastFiveYearBillChart && resData.LastFiveYearBillChart.length > 0 ? (
              renderBarChart(resData.LastFiveYearBillChart)
            ) : (
              <div className="h-[180px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No historical data available</p>
                </div>
              </div>
            )}
          </div>

          <div className="group bg-gradient-to-br from-gray-900 to-black border border-green-500/20 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green" />
              </div>
              <h3 className="text-green font-bold text-sm">SAVINGS</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-green to-emerald-500 bg-clip-text text-transparent mb-2">
                ₹8.5L
              </div>
              <div className="text-gray text-sm mb-4">25 Year Savings</div>
              <div className="text-lg font-bold text-green">ROI: 340%</div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="group bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Sun className="w-6 h-6 text-yellow" />
              </div>
              <h3 className="text-yellow font-bold text-sm">ROOF ANALYSIS</h3>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow mb-3">Excellent</div>
              <div className="grid grid-cols-8 gap-1 mb-4">
                {Array.from({ length: 32 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      Math.random() > 0.2 ? "bg-yellow shadow-sm shadow-yellow" : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray">Solar Coverage: 78%</div>
            </div>
          </div>

          <div className="col-span-2 group bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 border-2 border-yellow rounded-2xl p-8 hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300">
            <div className="text-center">
              <div className="mb-4">
                <Home className="w-12 h-12 text-yellow mx-auto mb-2" />
              </div>
              <h1 className="text-heading font-bold bg-gradient-to-r from-yellow to-orange-500 bg-clip-text text-transparent mb-2">
                TheSolarHome
              </h1>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-gray-900 to-black border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Gauge className="w-6 h-6 text-blue" />
              </div>
              <h3 className="text-blue font-bold text-sm">CURRENT BILL</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue mb-2">
                ₹
                {resData?.LastFiveYearBillChart
                  ? Math.round(
                      resData.LastFiveYearBillChart[resData.LastFiveYearBillChart.length - 1]?.annualBill / 1000,
                    ) + "k"
                  : "57k"}
              </div>
              <div className="text-gray text-sm mb-4">Annual Bill (2024)</div>
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-full h-full rounded-full border-4 border-gray-700"></div>
                <div className="absolute inset-0 w-full h-full rounded-full border-4 border-blue border-t-transparent border-r-transparent transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-blue">75%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div
            className="col-span-2 group bg-gradient-to-br from-gray-900 to-black border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer"
            onClick={() =>
              setActiveChart({
                type: "bar",
                title: "Projected Bills (Next 5 Years)",
                data: resData?.projectedBillNextFiveYears || [],
                insight: [
                  `Bills projected to reach ₹${
                    resData?.projectedBillNextFiveYears
                      ? Math.round(
                          resData.projectedBillNextFiveYears[resData.projectedBillNextFiveYears.length - 1]
                            ?.annualBill / 1000,
                        ) + "k"
                      : "73k"
                  } by 2030.`,
                  "Solar installation can prevent this 26% increase.",
                  "Break-even point achievable in 4-5 years.",
                  "Potential savings of ₹2-3L over next decade.",
                ],
              })
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange" />
              </div>
              <h3 className="text-orange font-bold text-sm">PROJECTED BILLS (DYNAMIC)</h3>
            </div>
            {resData?.projectedBillNextFiveYears && resData.projectedBillNextFiveYears.length > 0 ? (
              renderBarChart(resData.projectedBillNextFiveYears, "#F97316")
            ) : (
              <div className="h-[180px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Projection data unavailable</p>
                </div>
              </div>
            )}
          </div>

          <div
            className="group bg-gradient-to-br from-gray-900 to-black border border-red-500/20 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer"
            onClick={() =>
              setActiveChart({
                type: "pie",
                title: "Risk Analysis",
                data: staticRiskData,
                insight: [
                  "Your area has low catastrophic risk.",
                  "Weather patterns are favorable for solar.",
                  "Grid stability is excellent (99.8% uptime).",
                  "Minimal insurance premium impact.",
                ],
              })
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-red" />
              </div>
              <h3 className="text-red font-bold text-sm">RISK ANALYSIS</h3>
            </div>
            {renderPieChart(staticRiskData)}
            <div className="text-center mt-2">
              <div className="text-lg font-bold text-green">Low Risk Zone</div>
            </div>
          </div>

          {/* <div className="group bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Battery className="w-6 h-6 text-purple" />
              </div>
              <h3 className="text-purple font-bold text-sm">PAYBACK</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple to-pink-500 bg-clip-text text-transparent mb-2">
                5.2
              </div>
              <div className="text-gray text-sm mb-4">Years</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple to-pink-500 h-2 rounded-full w-[65%]"></div>
              </div>
            </div>
          </div> */}

          {/* Row 4 */}
          {/* <div
            className="group bg-gradient-to-br from-gray-900 to-black border border-green-500/20 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 cursor-pointer"
            onClick={() =>
              setActiveChart({
                type: "line",
                title: "Projected Savings with Solar",
                data: staticSavingsData,
                insight: [
                  "Cumulative savings grow exponentially after year 2.",
                  "Break-even achieved in year 2-3.",
                  "25-year savings potential: ₹8.5L+",
                  "Average annual savings: ₹35,000 after payback.",
                ],
              })
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green" />
              </div>
              <h3 className="text-green font-bold text-sm">SAVINGS PROJECTION</h3>
            </div>
            {renderLineChart(staticSavingsData)}
          </div> */}

          {/* <div className="group bg-gradient-to-br from-gray-900 to-black border border-green-500/20 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-green" />
              </div>
              <h3 className="text-green font-bold text-sm">GRID QUALITY</h3>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green mb-2">Excellent</div>
              <div className="text-gray text-sm mb-3">99.8% Uptime</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-green h-2 rounded-full w-[98%]"></div>
              </div>
            </div>
          </div> */}

          {/* <div className="group bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Sun className="w-6 h-6 text-yellow" />
              </div>
              <h3 className="text-yellow font-bold text-sm">SUNLIGHT</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow mb-2">1,769</div>
              <div className="text-gray text-sm mb-3">Hours/Year</div>
              <div className="text-lg font-bold text-green">Optimal ☀️</div>
            </div>
          </div> */}

          <div className="group bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Star className="w-6 h-6 text-yellow" />
              </div>
              <h3 className="text-yellow font-bold text-sm">ADOPTION SCORE (DYNAMIC)</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow to-orange-500 bg-clip-text text-transparent mb-2">
                {resData?.adoptionScore || 55}/100
              </div>
              <div className="flex justify-center mb-2">{renderAdoptionStars(resData?.adoptionScore || 55)}</div>
              <div
                className={`text-lg font-bold ${
                  (resData?.adoptionScore || 55) >= 70
                    ? "text-green"
                    : (resData?.adoptionScore || 55) >= 50
                      ? "text-yellow"
                      : "text-orange"
                }`}
              >
                {(resData?.adoptionScore || 55) >= 70
                  ? "EXCELLENT"
                  : (resData?.adoptionScore || 55) >= 50
                    ? "GOOD"
                    : "MODERATE"}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Modal */}
        {activeChart && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-auto relative shadow-2xl shadow-yellow/20">
              <button
                className="absolute top-6 right-8 text-yellow hover:text-yellow-300 text-3xl font-bold transition-colors z-10"
                onClick={() => setActiveChart(null)}
              >
                ✕
              </button>

              <div className="mb-8">
                <h2 className="text-3xl text-yellow mb-2 font-bold">{activeChart.title}</h2>
                <p className="text-gray-300 text-lg">Detailed Analysis & Insights</p>
              </div>

              <div className="w-full h-[60vh] mb-8 bg-gray-900/50 rounded-xl p-6">
                <ResponsiveContainer width="100%" height="100%">
                  {activeChart.type === "bar" && activeChart.data?.length > 0 ? (
                    <BarChart data={activeChart.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" tick={{ fill: "#D1D5DB" }} />
                      <YAxis tick={{ fill: "#D1D5DB" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #F59E0B",
                          borderRadius: "8px",
                          color: "#F3F4F6",
                        }}
                      />
                      <Bar dataKey="annualBill" fill="#F59E0B" radius={[4, 4, 0, 0]}>
                        <LabelList dataKey="annualBill" position="top" style={{ fill: "#F3F4F6" }} />
                      </Bar>
                    </BarChart>
                  ) : activeChart.type === "line" ? (
                    <LineChart data={activeChart.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" tick={{ fill: "#D1D5DB" }} />
                      <YAxis tick={{ fill: "#D1D5DB" }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={4} />
                    </LineChart>
                  ) : activeChart.type === "pie" ? (
                    <PieChart>
                      <Pie data={activeChart.data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} dataKey="value">
                        {activeChart.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-xl">No data available for visualization</p>
                      </div>
                    </div>
                  )}
                </ResponsiveContainer>
              </div>

              {activeChart.insight && (
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-yellow text-xl font-bold mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green rounded-full mr-3"></span>
                    Key Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeChart.insight.map((point, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
