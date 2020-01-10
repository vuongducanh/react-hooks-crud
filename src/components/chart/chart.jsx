import React from 'react';
import DemoChart from './../common/test-chart/test-chart';

const options = {
  colors: ["#ffe0b2", "#cac1a0"],
  chart: {
    polar: true,
    type: 'area'
  },

  credits: {
    enabled: false
  },

  title: {
    text: '',
    x: -80
  },

  pane: {
    size: '80%'
  },

  xAxis: {
    categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
      'Information Technology', 'Administration'],
    tickmarkPlacement: 'on',
    lineWidth: 0,
    gridLineColor: 'transparent',
  },

  yAxis: {
    gridLineInterpolation: 'polygon',
    lineWidth: 0,
    min: 0,
    maxPadding: 0.01
  },

  tooltip: {
    shared: true,
    pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
  },

  legend: {
    verticalAlign: 'bottom',
    layout: 'horizontal',
  },

  series: [{
    name: 'Allocated Budget',
    data: [43000, 19000, 60000, 35000, 17000, 10000],
    pointPlacement: 'on',
  }, {
    name: 'Actual Spending',
    data: [50000, 39000, 42000, 31000, 26000, 14000],
    pointPlacement: 'on',
  }],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal'
        },
        pane: {
          size: '70%'
        }
      }
    }]
  }

};

function Chart() {
  return (
    <div className="chart">
      <DemoChart option={options} />
    </div>
  )
}

export default Chart;
