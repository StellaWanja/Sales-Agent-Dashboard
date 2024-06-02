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

type ProductData = Record<string, SchoolTypeData>;

interface BarChartsProps {
  data: ProductData;
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
            backgroundColor: "#162D43",
          },
          {
            label: "Secondary",
            data: [0, schoolData.secondary, 0],
            backgroundColor: "#3570FF",
          },
          {
            label: "IGCSE",
            data: [0, 0, schoolData.igcse],
            backgroundColor: "#214464",
          },
        ],
      };

      const options = {
        plugins: {
          tooltip: {
            callbacks: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              label: function (context: any) {
                const label = context.dataset.label || "";
                const value = context.raw || 0;
                return `${label}: ${value}`;
              },
            },
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick: ( elements: any) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const datasetIndex = elements[0].datasetIndex;
            const schoolType = chartData.labels[index];
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
        <div key={index} className="w-1/3 mobile:w-full p-10">
          <h3 className="text-center text-[#080808] font-bold text-xl">{productName}</h3>
          <Bar data={chartData} options={options} />
        </div>
      );
    });
  };

  return <div className=" flex flex-row justify-between gap-4 mobile:flex-col ">{renderCharts()}</div>;
};

export default BarCharts;
