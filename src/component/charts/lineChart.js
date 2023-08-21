import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { COLORS } from '../../utils/color';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales Statistics',
    },
  },
  scales: {
    y: {
      ticks: {
        beginAtZero: true,
        stepSize: 2,
      },
    },
    x: {
      ticks: {
        autoSkip: false,
        maxRotation: 90,
        minRotation: 90,
      },
    },
  },
};


function LineChart({ statistics }) {
  const labels = Object.keys(statistics);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total',
        data: labels.map((month) => statistics[month].total),
        backgroundColor: COLORS.primary,
        borderWidth: 2,
        borderColor:COLORS.primary
      },
      {
        label: 'Active',
        data: labels.map((month) => statistics[month].active),
        backgroundColor: COLORS.primaryDark01,
        borderWidth: 2,
        borderColor: COLORS.primaryDark01,
      },
      {
        label: 'Pending',
        data: labels.map((month) => statistics[month].pending),
        backgroundColor: COLORS.primaryDark03,
        borderWidth: 2,
        borderColor:COLORS.primaryDark03,
      },
      {
        label: 'Cancelled',
        data: labels.map((month) => statistics[month].cancelled),
        backgroundColor: COLORS.primaryLight03,
        borderWidth: 2,
        borderColor:COLORS.primaryLight03,
      },
      {
        label: 'Completed',
        data: labels.map((month) => statistics[month].completed),
        backgroundColor: COLORS.primaryDark09,
        borderWidth: 2,
        borderColor:COLORS.primaryLight09,
      },
      {
        label: 'Closed',
        data: labels.map((month) => statistics[month].closed),
        backgroundColor: COLORS.primaryLight05,
        borderWidth: 2,
        borderColor:COLORS.primaryLight05,
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default LineChart;
