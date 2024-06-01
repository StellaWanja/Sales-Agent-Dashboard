import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { SchoolData } from "../interfaces/School";

Chart.register(ArcElement, Tooltip, Legend);

interface ProductData {
  achieved: number;
  target: number;
}

interface PieChartsProps extends SchoolData {
  data: { [key: string]: ProductData };
}

const PieCharts: React.FC<PieChartsProps> = ({ data }) => {
  const renderCharts = () => {
    return Object.keys(data).map((productName, index) => {
      const productData = data[productName];

      const chartData = {
        labels: ["Achieved", "Remaining"],
        datasets: [
          {
            data: [
              productData.achieved,
              productData.target - productData.achieved,
            ],
            backgroundColor: ["#162D43", "#3570FF"],
            hoverBackgroundColor: ["#214464", "#5f8efa"],
          },
        ],
      };

      const options = {
        plugins: {
          tooltip: {
            callbacks: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              label: function (context: any) {
                const label = context.label || "";
                const value = context.raw || 0;
                const total = context.dataset.data.reduce(
                  (sum: number, val: number) => sum + val,
                  0
                );
                const percentage = ((value / total) * 100).toFixed(2);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      };

      return (
        <div key={index} className="w-1/3 mobile:w-full p-10">
          <h3 className="text-center text-[#080808] font-bold text-xl">
            {productName}
          </h3>
          <Pie data={chartData} options={options} />
        </div>
      );
    });
  };

  return (
    <div className=" flex flex-row justify-between mobile:flex-col ">
      {renderCharts()}
    </div>
  );
};

export default PieCharts;
