import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function TemperatureChart({ hourlyData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!hourlyData) return;

    const ctx = chartRef.current.getContext("2d");

    const hourlyLabels = hourlyData.map((hour) => hour.time.split(" ")[1]);
    const temperatures = hourlyData.map((hour) => hour.temp_c);

    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: hourlyLabels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatures,
            borderColor: "rgba(255, 165, 0, 1)",
            backgroundColor: "rgba(255, 165, 0, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
            },
          },
          y: {
            title: {
              display: true,
              text: "Temperature (°C)",
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [hourlyData]);

  return <div className="w-full h-96">
    <canvas ref={chartRef} className="w-full h-full" />;
    </div>
}

export default TemperatureChart;
