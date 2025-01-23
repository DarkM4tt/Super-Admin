import { useState, useRef, useEffect } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";

// Register required Chart.js components
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

const TimeTracksChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [interval, setInterval] = useState("Week");

  const data = {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Total time worked",
        data: [4, 10, 5, 9, 7, 6, 8],
        backgroundColor: "#344BFD", // Blue color
        barThickness: 10,
      },
      {
        label: "Took break",
        data: [2, 6, 3, 4, 5, 3, 5],
        backgroundColor: "#FF9359", // Orange color
        barThickness: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        align: "start",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${value} hrs`,
        },
        grid: {
          color: "#e8e8e8",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy any existing chart instance to prevent duplication
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data,
      options,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [interval]);

  return (
    <div className="rounded-lg bg-white font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Time tracks</h3>
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-sm bg-gray-50"
        >
          <option value="Week">Week</option>
          <option value="Month">Month</option>
          <option value="Annual">Annual</option>
        </select>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-gray-600 mt-3">
        Total hours worked this month{" "}
        <strong className="text-gray-800">160</strong>
      </p>

      {/* Chart Container */}
      <div className="h-64 mt-4">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default TimeTracksChart;
