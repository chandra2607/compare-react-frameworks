"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function LargeChart() {
  // Generate 10,000 data points (expensive computation)
  const { data, options } = useMemo(() => {
    const labels = Array.from({ length: 10000 }, (_, i) => i);
    const values = labels.map(() => Math.random() * 100);

    return {
      data: {
        labels,
        datasets: [
          {
            label: "Random Series (10K Points)",
            data: values,
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
            pointRadius: 0,
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        animation: false,
        elements: { line: { tension: 0.1 } },
        plugins: {
          legend: { display: true },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
    };
  }, []);

  return (
    <div>
      <h3>Large Chart (10,000 points)</h3>
      <Line data={data} options={options} />
    </div>
  );
}
