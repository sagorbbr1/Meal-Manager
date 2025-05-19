import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart = () => {
  const options = {
    series: [50, 40, 13, 4, 22],
    chart: { type: "pie" },
    labels: ["Team AS", "Team BS", "Team CS", "Team DS", "Team ES"],
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
