import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

interface SchoolTypeData {
  primary: number;
  secondary: number;
  igcse: number;
}

interface ProductData {
  [key: string]: SchoolTypeData;
}

interface BarChartsProps {
  data: { [productName: string]: ProductData };
}

Chart.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BarCharts: React.FC<BarChartsProps> = ({ data }) => {
  const renderCharts = () => {
    return Object.keys(data).map((productName, index) => {
      const schoolData = data[productName];

      const chartData = {
        labels: ["Primary", "Secondary", "IGCSE"],
        datasets: [
          {
            label: "Primary",
            data: [schoolData.primary, 0, 0],
            backgroundColor: "#36A2EB",
          },
          {
            label: "Secondary",
            data: [0, schoolData.secondary, 0],
            backgroundColor: "#FF6384",
          },
          {
            label: "IGCSE",
            data: [0, 0, schoolData.igcse],
            backgroundColor: "#FFCE56",
          },
        ],
      };

      const options = {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const label = context.dataset.label || "";
                const value = context.raw || 0;
                return `${label}: ${value}`;
              },
            },
          },
        },
        onClick: (event: any, elements: any) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const datasetIndex = elements[0].datasetIndex;
            const schoolType = chartData.labels[index];
            const productType = chartData.datasets[datasetIndex].label;
            const signups = chartData.datasets[datasetIndex].data[index];

            alert(
              `Product: ${productName}\nSchool Type: ${schoolType}\nSign-ups: ${signups}`
            );
          }
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
      };

      return (
        <div key={index} className="w-full md:w-1/3 p-4">
          <h3 className="text-center mb-2">{productName}</h3>
          <Bar data={chartData} options={options} />
        </div>
      );
    });
  };

  return <div className="flex flex-wrap">{renderCharts()}</div>;
};

export default BarCharts;
