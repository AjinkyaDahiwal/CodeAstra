import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import Card from '../ui/Card';

Chart.register(...registerables);

const ApplicationChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      
      // Sample data
      const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Applications',
            data: [65, 78, 90, 81, 95, 110],
            backgroundColor: 'rgba(26, 86, 219, 0.2)',
            borderColor: 'rgba(26, 86, 219, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Interviews',
            data: [28, 35, 40, 45, 50, 55],
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      };
      
      // Chart configuration
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);
  
  return (
    <Card className="h-full">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Application Trends</h3>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </Card>
  );
};

export default ApplicationChart;
