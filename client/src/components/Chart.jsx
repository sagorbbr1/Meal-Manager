import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ members }) => {
  const options = {
    series: members?.map((user) => user.mealStats.mealCost),
    chart: { type: "pie" },
    labels: members?.map((user) => user.name),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 300 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="pie"
      width="100%"
      height="100%"
    />
  );
};

export default Chart;
