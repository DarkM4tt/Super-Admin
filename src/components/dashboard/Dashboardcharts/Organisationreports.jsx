import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-plugin-datalabels';
import organisationsimg from "../../../assets/superadminorganisations.svg"

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Organisationreports = () => {
  const total = 3312;
  const rejected = 327;
  const pending = 327;
  const approved = 1120;

  // Calculate percentages for each stage
  const rejectedPercentage = (rejected / total) * 100;
  const pendingPercentage = (pending / total) * 100;
  const approvedPercentage = (approved / total) * 100;
  const remainingPercentage = 100 - (rejectedPercentage + pendingPercentage + approvedPercentage);

  // Chart data and configuration
  const data = {
    labels: ['Progress'],
    datasets: [
      {
        label: 'Rejected',
        data: [rejectedPercentage],
        backgroundColor: '#ef4444', // Tailwind red-500
        barPercentage: 1.0,
        categoryPercentage: 0.5,
        borderSkipped: "middle",
        borderRadius: "20px",
        // borderRadius: {
        //     topLeft: 10,
        //     bottomLeft: 10,
        //     topRight: 10,
        //     bottomRight: 10,
        //   },
      },
      {
        label: 'Pending',
        data: [pendingPercentage],
        backgroundColor: '#f59e0b', // Tailwind orange-500
        barPercentage: 1.0,
        categoryPercentage: 0.5,
        borderSkipped: "end",
        // borderSkipped: "middle",
        borderRadius: {
            topRight: 10,
            bottomRight: 10,

          },
      },
      {
        label: 'Approved',
        data: [approvedPercentage],
        backgroundColor: '#22c55e', // Tailwind green-500
        barPercentage: 1.0,
        categoryPercentage: 0.5,
        borderSkipped: "end",
        borderRadius: {
            topRight: 10,
            bottomRight: 10,

          },
        // borderSkipped: false,
      },
      {
        label: 'Total',
        data: [remainingPercentage],
        backgroundColor: '#e5e7eb', // Tailwind gray-300 for the remaining empty bar
        barPercentage: 1.0,
        categoryPercentage: 0.5,
        borderSkipped: false,

        borderRadius: {
            topRight: 10,
            bottomRight: 10,
          },
      },
    ],
  };

  const options = {
    responsive: true,
    grouped:true,
    // borderRadius: 30,
    // elements: {
    //     bar: {
    //       borderRadius: 30, // Adjust the radius as needed
    //     },
    //   },
    indexAxis: 'y', // Horizontal bar chart
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        display: false, // Disable data labels on the bars
      },
    },
    scales: {
      x: {
        stacked: true, // Stack the bars together
        display: false, // Hide the x-axis
      },
      y: {
        stacked: true,
        display: false, // Hide the y-axis
      },
    },
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full h-full">
        <CardContent className='h-full'>
          {/* Icon and company name */}
          <div className='flex flex-col justify-between h-full'>
          <div className="flex items-center">
            <div className="bg-yellow-200 mr-4 flex justify-center p-3 rounded-full w-[48px] h-[48px]">
              <img src={organisationsimg} alt="org" className='w-[90%]' />
            </div >
            <div>
            <h1 className="text-4xl font-bold">3322</h1>
            <p className="font-redhat text-sm font-semibold">Total listed organisations</p>
            </div>
          </div>

          {/* Labels for each stage */}
          <div>
          <div className="flex justify-between">
            <div>
              <Typography variant="subtitle2" className='font-redhat  text-[#777777]'>Rejected</Typography>
              <Typography variant="body2" className='font-redhat  text-[#777777]'>{rejected}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className='font-redhat  text-[#777777]'>Pending</Typography>
              <Typography variant="body2" className='font-redhat  text-[#777777]'>{pending}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className='font-redhat  text-[#777777]'>Approved</Typography>
              <Typography variant="body2" className='font-redhat  text-[#777777]'>{approved}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className='font-redhat  text-[#777777]'>Total</Typography>
              <Typography variant="body2" className='font-redhat  text-[#777777]'>{total}</Typography>
            </div>
          </div>

          {/* Render the progress bar */}

          <Bar data={data} options={options} height={16} />
          </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Organisationreports;
