import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    points: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipformat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridlines: {
          display: false,
        },
        ticks: {
          //Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph() {
  const [data, setData] = useState({});

  //changing the chart data to match chartjs format to be able to display on app
  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDatapoint;

    //comparing previous date cases with current date cases to see the increase in cases
    for (let date in data.cases) {
      if (lastDatapoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDatapoint,
        };
        chartData.push(newDataPoint);
      }
      lastDatapoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((res) => res.json())
      .then((data) => {
        const chartData = buildChartData(data);
        setData(chartData);
      });
  }, []);

  return (
    <div className="lineGraph">
      <Line
        options={options}
        data={{
          datasets: [
            {
              data: data,
            },
          ],
        }}
      />
    </div>
  );
}

export default LineGraph;
