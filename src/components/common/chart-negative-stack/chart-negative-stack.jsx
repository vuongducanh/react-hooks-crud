import React from 'react';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';
HC_more(Highcharts)

function ChartNegativeStack() {
  let YAxisLabels = ['0', '500', '1000', '1500', '2000', '2500'];
  const consFigChart = {
    chart: {
      type: 'bar'
    },

    credits: {
      enabled: false
    },

    title: {
      text: '&nbsp',
      x: -80,
      useHTML: true
    },

    legend: {
      labelFormatter: function() {
        console.log(this)
      }
    },

    xAxis: [{
      categories: ['2018', '2017', '2016'],
      lineColor: 'transparent'
    }],

    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          if (YAxisLabels[Math.abs(this.value)]) {
            return YAxisLabels[Math.abs(this.value)].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        }
      },
      lineWidth: 1,
      gridLineColor: 'transparent',
    },

    plotOptions: {
      series: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          formatter: function () {
            return Math.abs(this.y * 1000)
          }
        }
      }
    },

    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
          'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y * 1000), 0);
      }
    },

    series: [{
      type: 'bar',
      name: 'Male',
      data: [
        -.3, -2.1, -2.2
      ],
      color: "red",
    }, {
      type: 'bar',
      name: 'Female',
      data: [
        -2.2, -2.1, -2.2
      ],
      color: "blue"
    }, {
      type: 'bar',
      name: 'Male',
      data: [
        -2.1, -2.3, -2.5
      ],
      color: "red"
    },
    {
      type: 'bar',
      name: 'Female',
      data: [
        2.1, 2.0, 2.5
      ],
      color: "blue"
    },
    {
      type: 'bar',
      name: 'Male',
      data: [
        2.1, 2.0, 2.1
      ],
      color: "red"
    },
    {
      type: 'bar',
      name: 'Female',
      data: [
        2.1, 2.0, 2.5
      ],
      color: "blue"
    }]
  }
  return (
    <div className="demo-chart">
      <HighchartsReact
        highcharts={Highcharts}
        options={consFigChart}
      />
    </div>
  )
}

export default ChartNegativeStack;
