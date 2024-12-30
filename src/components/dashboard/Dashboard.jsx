import React, { useRef, useEffect } from 'react';
import 'chart.js/auto';
import { Button, IconButton } from "@mui/material";
import infoIcon from "../../assets/infoIcon.svg";
import PropTypes from "prop-types";
import Euroicon from "../../assets/euroicon.svg";
import Upgraph from "../../assets/upgraph.svg";
import dashboardvehicle from "../../assets/dashboardvehicle.svg";
import CircleIcon from '@mui/icons-material/Circle';
import lowgraph from "../../assets/lowgraphdash.svg";
import moderategraph from "../../assets/moderategrapgdash.svg"
// import { Doughnut } from 'react-chartjs-2';
// import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import CancellationChart from './Dashboardcharts/Cancellationchart';
import PerformanceChart from './Dashboardcharts/Companyperformance';
// import { Chart, ArcElement, Tooltip, Legend,} from 'chart.js';
import { Line } from "react-chartjs-2";
import Dashboardzones from './Dashboardcharts/Dashboardzones';
import Organisationreports from './Dashboardcharts/Organisationreports';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Register required chart.js components
// Chart.register(ArcElement, Tooltip, Legend);

const belowsampledata=[
{
  head:"Intercity",
  count:3312
},
{
  head:"Package",
  count:2293
},
{
  head:"Regular",
  count:3312
},
{
  head:"Rentals",
  count:2293
},
]

const Dashboard = () => {


  const chartRef = useRef(null);
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [21, 22, 23, 21.5, 22.7, 22.9, 23],
        borderColor: "#18C4B8",
        backgroundColor: "rgba(24, 196, 184, 0.2)",
        fill: true,
        tension: 0.4, // Smooth line
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false }, // Hide legend
    },
    scales: {
      x: { display: false }, // Hide x-axis
      y: { display: false }, // Hide y-axis
    },
    maintainAspectRatio: false,
  };

  useEffect(() => {
    // Cleanup old chart instance on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);
  return (
   <>
   <div className="py-8 px-14 bg-[#F8F8F8]">
    <div className="flex justify-between items-center font-redhat text-base font-semibold ">
    {"> Dashboard"}
      <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
<SearchIcon/>
<input type='text' placeholder='Search anything...' className='bg-transparent outline-none'></input>
      </div>
    </div>
    <p className="font-redhat font-semibold text-2xl pt-8">Overview</p>
    <p className="font-redhat font-normal text-sm  text-[#777777] pt-2">This is the overall highlights which includes everything in the BOLD applications. </p>

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4 pt-8">
        <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px]">622 fuel stations signup <span className='pl-2'> <KeyboardDoubleArrowRightIcon/></span> </div>
        <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px]">109 rentals signups <span className='pl-2'> <KeyboardDoubleArrowRightIcon/></span> </div>
        <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px]">221 M new users <span className='pl-2'> <KeyboardDoubleArrowRightIcon/></span>  </div>
      </div>
      <div className="flex items-center gap-6 pt-8">
        <div className="py-3 px-4 text-base font-redhat bg-[#FF935914] rounded-[56px] text-[#FF9359] border border-[#FF9359]">Generate overview report</div>
        <div className="py-3 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px]"><span className='pr-1'> <AddIcon fontSize='small'/></span> Create zone  </div> 
      </div>
    </div>
    <div className="flex gap-6 pt-8">
      <div className="w-4/6">
        <div className="flex justify-between ">
          <div className="flex-1 p-4 bg-white rounded-lg">
            <div className="flex justify-between items-center  ">
            <p className="font-redhat font-semibold text-base">Total revenue</p>
            <button ><MoreHorizIcon className='text-[#777777]'/></button>
            </div>
            <div className="flex gap-2 pt-2 items-center">
              <p className="font-redhat font-bold text-2xl">€ 22.1 M</p>
              <p className="font-redhat font-semibold text-xs text-[#777777]"> <span><TrendingUpIcon className='text-[#18C4B8] pr-2'/></span>2% UP</p>
            </div>
            <div className="mt-4 h-20">
          <Line ref={chartRef} data={data} options={options} />
        </div>
            </div>
          <div className="flex-1">one</div>
          <div className="flex-1">one</div>
        </div>
      </div>
      <div className=""></div>
    </div>
   </div>
   </>
  );
};

export default Dashboard;
