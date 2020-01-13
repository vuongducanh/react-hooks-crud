import React from 'react';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';
HC_more(Highcharts)

function ChartSpiderWeb({ dataChart }) {
  if (!dataChart || !dataChart.categories || !dataChart.tickPositions) return null;
  const consFigChart = {
    chart: {
      polar: true,
      type: 'area',
      margin: 0,
      height: 450,
      width: 500
    },

    credits: {
      enabled: false
    },

    exporting: {
      enabled: false,
      buttons: {
        enabled: false
      }
    },

    title: {
      text: '&nbsp',
      x: -80,
      useHTML: true
    },

    pane: {
      size: '70%'
    },

    xAxis: {
      categories: dataChart.categories,
      tickmarkPlacement: 'on',
      lineWidth: 0,
      labels: {
        align: 'center',
        distance: 40,
        padding: 15,
        autoRotatonLimit: 10
      },
      gridLineColor: 'transparent',
    },

    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0,
      endOnTick: true,
      showLastLabel: true,
      tickPositions: dataChart.tickPositions,
    },

    tooltip: {
      shared: true,
      headerFormat: '<span style="font-size: 12px">{point.key}:</span>&nbsp;&nbsp;<b>{point.y:,.2f}</b>',
      pointFormat: '',
      useHTML: true
    },

    legend: {
      itemDistance: 40,
    },

    series: [{
      name: dataChart.series1.name,
      data: dataChart.series1.data,
      pointPlacement: 'on',
      color: dataChart.series1.color,
      fillOpacity: 0.2,
      marker: {
        enabled: false,
      }
    },
    {
      name: dataChart.series2.name,
      data: dataChart.series2.data,
      pointPlacement: 'on',
      color: dataChart.series2.color,
      fillOpacity: 0.2,
      marker: {
        enabled: false
      }
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

export default ChartSpiderWeb;
