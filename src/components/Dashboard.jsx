"use client"

import { useState } from "react"
import { ResponsiveContainer } from "recharts"
import { getChartList } from "../Js/chartListData"
import { useLocation } from "react-router-dom"


const Dashboard = () => {
  const location = useLocation();
  const resData = location.state; // iske andr pura response h jo backend ka h iska use kro

  console.log("Dashboard data:", resData);
  const chartList = getChartList(resData); 

  const [activeChart, setActiveChart] = useState(null)

  const getGridPosition = (idx) => {
    const positions = {
  0: "col-start-1 col-end-3 row-start-1 row-end-3",
  1: "col-start-3 col-end-5 row-start-1 row-end-3",
  2: "col-start-5 col-end-7 row-start-1 row-end-3",
  3: "col-start-7 col-end-9 row-start-1 row-end-3",
  4: "col-start-9 col-end-11 row-start-1 row-end-2",
  5: "col-start-11 col-end-13 row-start-1 row-end-3",
  6: "col-start-1 col-end-5 row-start-3 row-end-5",
  7: "col-start-5 col-end-9 row-start-3 row-end-5",
  8: "col-start-9 col-end-11 row-start-2 row-end-4",
  9: "col-start-11 col-end-13 row-start-3 row-end-5",
  10: "col-start-1 col-end-3 row-start-5 row-end-7",
  11: "col-start-3 col-end-7 row-start-5 row-end-7",
  12: "col-start-7 col-end-9 row-start-5 row-end-7", // 🆕 added
  13: "col-start-9 col-end-11 row-start-5 row-end-7", // 🆕 added
  14: "col-start-11 col-end-13 row-start-5 row-end-7",
  15: "col-start-9 col-end-11 row-start-4 row-end-6",
  16: "col-start-9 col-end-11 row-start-6 row-end-8",
  17: "col-start-11 col-end-14 row-start-4 row-end-6",
};

    return positions[idx] || ""
  }

  const isHighlightCard = (idx) => idx === 7

  return (
    <div className="min-h-screen bg-bodyColor px-4 pb-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-6 pt-6">
          <p className="text-gray-300">Comprehensive solar energy performance insights</p>
        </div>

        {/* ✅ Large Screen Grid */}
        <div className="hidden lg:grid grid-cols-12 grid-rows-8 gap-4 h-[900px]">
          {chartList.map((item, idx) => {
            if (idx === 13) return null

            return (
              <div
                key={idx}
                onClick={() => setActiveChart(item)}
                className={`
                  cursor-pointer transition-all duration-300 hover:z-10 hover:scale-[1.01]
                  ${isHighlightCard(idx)
                    ? "bg-yellow text-black m-2 rounded-xl border-2 border-yellow p-6"
                    : "bg-gradient-to-br from-yellow/10 to-green/10 hover:from-yellow/20 hover:to-green/20 p-4"}
                  backdrop-blur-sm hover:shadow-2xl hover:shadow-yellow/20
                  group relative overflow-hidden rounded-xl
                  ${getGridPosition(idx)}
                `}
              >
                {!isHighlightCard(idx) && (
                  <>
                    <div className="absolute right-0 top-0 w-px h-full bg-gray-700/20" />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gray-700/20" />
                  </>
                )}

                <div className="absolute inset-0 bg-gradient-to-r from-yellow/5 to-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 h-full flex flex-col">
                  {isHighlightCard(idx) ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <div>
                        {/* <h2 className="text-white text-xl font-normal mb-2 tracking-wide">CAN SOLAR WORK FOR</h2> */}
                        <h1 className="text-black text-heading font-bold mb-8 tracking-wide">TheSolarHome</h1>
                        <div className="flex items-center justify-center gap-6">
                          {/* <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">UNLIKELY</span> */}
                          {/* <div className="flex gap-3">
                            {[1, 2, 3, 4].map((dot) => (
                              <div
                                key={dot}
                                className={`w-4 h-4 rounded-full ${dot <= 3 ? "bg-yellow" : "bg-gray-600"}`}
                              />
                            ))}
                          </div> */}
                          {/* <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">LIKELY</span> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xs font-semibold text-yellow group-hover:text-yellow-300 transition-colors uppercase leading-tight">
                          {item.title}
                        </h2>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                      </div>

                      <div className="flex-1 mb-2 min-h-[80px] sm:min-h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          {item.chart()}
                        </ResponsiveContainer>
                      </div>

                      {item.summary && (
                        <p className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors leading-tight">
                          {item.summary}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ✅ Mobile Layout */}
        <div className="grid grid-cols-1 gap-4 lg:hidden mt-4">
          {chartList.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveChart(item)}
              className="p-4 bg-gradient-to-br from-yellow/10 to-green/10 rounded-xl backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold text-yellow uppercase">{item.title}</h2>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="min-h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  {item.chart()}
                </ResponsiveContainer>
              </div>
              {item.summary && (
                <p className="text-xs text-gray-300 mt-2">{item.summary}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Chart Modal */}
      {activeChart && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-yellow/30 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-auto relative shadow-2xl">
            <button
              className="absolute top-6 right-8 text-yellow hover:text-yellow-300 text-3xl font-bold transition-colors z-10"
              onClick={() => setActiveChart(null)}
            >
              ✕
            </button>

            <div className="mb-8">
              <h2 className="text-3xl text-yellow mb-2 font-bold">{activeChart.title}</h2>
              {activeChart.description && <p className="text-gray-300 text-lg">{activeChart.description}</p>}
            </div>

            <div className="w-full h-[60vh] mb-8 bg-slate-900/50 rounded-xl p-4">
              <ResponsiveContainer width="100%" height="100%">
                {activeChart.chart()}
              </ResponsiveContainer>
            </div>

            {activeChart.insights?.length > 0 && (
              <div className="bg-slate-900/50 rounded-xl p-6">
                <h3 className="text-yellow text-xl font-bold mb-4 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Key Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeChart.insights.map((point, idx) => (
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
  )
}

export default Dashboard
