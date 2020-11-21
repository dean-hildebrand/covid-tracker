import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function LineGraph() {
  const [data, setData] = useState({});

  // fetch(
  // ")
  // .then(res => res.json())
  // .then(data => setData(data))

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  //changing the chart data to match chartjs format to be able to display on app
  const buildChartData = (data, casesType="cases") => {
    const chartData = [];
    let lastDatapoint;

    //comparing previous date cases with current date cases to see the increase in cases
    data[casesType].cases.forEach((date) => {
      if (lastDatapoint) {
        const newDataPoint = {
          x: data,
          y: data[casesType][data] - lastDatapoint,
        };
        chartData.push(newDataPoint);
      }
      lastDatapoint = data[casesType][date];
    });
    return chartData;
  };

  return (
    <div className="lineGraph">
      <Line />
    </div>
  );
}

export default LineGraph;
