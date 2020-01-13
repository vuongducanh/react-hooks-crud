import React, { useState } from 'react';
import ChartSpiderWeb from './../common/chart-spider-web/chart-spider-web';

const dataChart = {
  categories: ["Current Ratio", "Quick Ratio", "Cash Ratio", "Total Liabilities/Owner's Equity", "Debt/Equity"],
  tickPositions: [0, 0.5, 1, 1.5, 2, 2.5],
  series1: {
    name: "Automobile Trading",
    data: [2.1, .6, .5, .6, 1.8],
    color: "#0169a8"
  },
  series2: {
    name: "Real Eslate",
    data: [2.5, 1.8, 1, 0.5, 1.4],
    color: "#fe9901"
  }
}

const dataChart2 = {
  categories: ["ROA(%)", "ROE(%)", "Net Revenue(%)", "Net Profit Growth(%)", "Assets Growth(%)"],
  tickPositions: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450],
  series1: {
    name: "Automobile Trading",
    data: [0, 25, 125, 100, 100],
    color: "#0169a8"
  },
  series2: {
    name: "Real Eslate",
    data: [0, 10, 300, 450, 50],
    color: "#fe9901"
  }
}

const dataChart3 = {
  categories: ["Gross Profit Margin (%)", "Operating Profit Margin(%)", "EBIT Margin (%)", "Net Profit(%)", "CFO/ Net Revenue"],
  tickPositions: [0, 5, 10, 15, 20, 25, 30, 35, 40],
  series1: {
    name: "Automobile Trading",
    data: [14, 5, 5, 5, 0],
    color: "#0169a8"
  },
  series2: {
    name: "Real Eslate",
    data: [33, 40, 20, 30, 0],
    color: "#fe9901"
  }
}

function Chart() {
  return (
    <div className="chart" style={{display: 'grid', gridTemplateColumns: 'auto auto auto'}}>
      <ChartSpiderWeb dataChart={dataChart} />
      <ChartSpiderWeb dataChart={dataChart2} />
      <ChartSpiderWeb dataChart={dataChart3} />
    </div>
  )
}

export default Chart;
