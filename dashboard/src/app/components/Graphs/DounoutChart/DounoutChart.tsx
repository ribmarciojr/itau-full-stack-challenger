"use client"
import React, { useEffect, useState } from 'react';
import './DonutChart.css';

interface DonutChartProps {
  data: number[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    updateDonutChart();
  }, [data]);

  const updateDonutChart = () => {
    const donutChart = document.getElementById('donutChart');
    const donutText = document.getElementById('donutText');

    let totalPercentage = 0;

    for (let i = 0; i < data.length; i++) {
      const segment = document.getElementById(`segment${i + 1}`);
      const percentage = data[i];

     
      if (segment) {
        segment.style.backgroundColor = i % 2 === 0 ? '#3498db' : '#e74c3c';
        segment.style.transform = `rotate(${totalPercentage}deg)`;
      }

      
      totalPercentage += percentage;
    }

    if (donutText) {
      donutText.textContent = `${totalPercentage}%`;
    }
  };

  return (
    <div id="donutChart" className="donut-chart">
      {data.map((percentage, index) => (
        <div
          key={index}
          className="donut-segment"
          id={`segment${index + 1}`}
        />
      ))}
      <div className="donut-text" id="donutText"></div>
    </div>
  );
};

export default DonutChart;
