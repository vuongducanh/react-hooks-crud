import React from 'react';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';
HC_more(Highcharts)

function DemoChart({ option }) {
  return (
    <div className="demo-chart">
      <HighchartsReact
        highcharts={Highcharts}
        options={option}
      />
    </div>
  )
}

export default DemoChart;
