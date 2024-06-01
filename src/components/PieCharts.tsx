import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface ProductData {
  achieved: number;
  target: number;
}

interface PieChartsProps {
  data: { [key: string]: ProductData };
}

const PieCharts: React.FC<PieChartsProps> = ({ data }) => {
  const renderCharts = () => {
    return Object.keys(data).map((productName, index) => {
      const productData = data[productName];

      const chartData = {
        labels: ['Achieved', 'Remaining'],
        datasets: [
          {
            data: [productData.achieved, productData.target - productData.achieved],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      };

      const options = {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((sum: number, val: number) => sum + val, 0);
                const percentage = ((value / total) * 100).toFixed(2);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      };

      return (
        <div key={index} className='w-1/4'>
          <h3>{productName}</h3>
          <Pie data={chartData} options={options} />
        </div>
      );
    });
  };

  return <div className="flex flex-wrap justify-between">{renderCharts()}</div>;
};

export default PieCharts;
