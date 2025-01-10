import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
// import { Chart, ArcElement, Tooltip, Legend,} from 'chart.js';
import { Line } from "react-chartjs-2";
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import BusinessIcon from '@mui/icons-material/Business';
import Acceptancechart from './Dashboardcharts/Acceptancechart';
import Bookinggraph from './Dashboardcharts/Bookinggraph';
import Saletypechart from './Dashboardcharts/Saletypechart';
import promotionicon from "../../assets/promotionicon.svg";
import drivericon from "../../assets/drivericon.svg";
import graphicon from "../../assets/cabsgraphicon.svg";
import sosicon from "../../assets/sosicon.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


const Services = () => {


  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);
  const [openZonesDialog, setOpenZonesDialog] = useState(false);
  const [createzone, setcreatezone] = useState(false)

  const handleOpenDialog = () => {
    setOpenZonesDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenZonesDialog(false);
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;

      // Calculate the chart's dimensions for gradient bounds
      const chartArea = chart.chartArea;
      const gradientFill = ctx.createLinearGradient(
        0, // x0
        chartArea.top, // y0
        0, // x1
        chartArea.bottom // y1
      );

      gradientFill.addColorStop(0, "rgba(59, 130, 246, 0.5)"); // Blue with opacity
      gradientFill.addColorStop(0.5, "rgba(59, 130, 246, 0.25)");
      gradientFill.addColorStop(1, "rgba(59, 130, 246, 0)");
      setGradient(gradientFill);
    }
  }, []);

  const zones = [
    { id: 1, name: "Mid-eve", area: "View in-map", vehicles: 622, rate: "€ 1120" },
    { id: 2, name: "Mid-eve", area: "View in-map", vehicles: 622, rate: "€ 1120" },
    { id: 3, name: "Mid-eve", area: "View in-map", vehicles: 622, rate: "€ 1120" },
    { id: 4, name: "Mid-eve", area: "View in-map", vehicles: 622, rate: "€ 1120" },
    { id: 5, name: "Mid-eve", area: "View in-map", vehicles: 622, rate: "€ 1120" },
  ];

  const data = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Last 6 months",
        data: [200000, 250000, 150000, 270000, 230000],
        borderColor: "#3B82F6", // Blue line color
        backgroundColor: gradient || "rgba(59, 130, 246, 0.5)", // Fallback to solid color
        tension: 0.4, // Curved line
        fill: true,
        borderWidth: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false, // This hides the data labels
      },
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide gridlines
        },
        ticks: {
          display: false, // Hide x-axis numbers
        },
      },
      y: {
        grid: {
          display: false, // Hide gridlines
        },
        ticks: {
          display: false, // Hide y-axis numbers
        },
      },
    },
  };

  
  
  return (
   <>
   <div className="">
    <div className="flex justify-between items-center font-redhat text-base font-semibold ">
    <p className="font-redhat font-semibold text-base flex items-center"><span className='text-[#777777] pr-2'>Services</span>{"> Overview"}</p>
      <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
<SearchIcon/>
<input type='text' placeholder='Search anything...' className='bg-transparent outline-none'></input>
      </div>
    </div>
    <div className="flex justify-between pt-8">
      <div className="w-4/6">
        <div className="flex justify-between ">
          <div className="w-[30%] flex flex-col p-4 bg-white rounded-lg border-b border-[#1860C4]" style={{boxShadow: "4px 4px 33px 0px #0000000A"}}>
            <div className="flex justify-between items-center  ">
            <p className="font-redhat font-semibold text-base">Revenue generated</p>
            <button ><MoreHorizIcon className='text-[#777777]'/></button>
            </div>
            <div className="flex gap-2 pt-2 items-center">
              <p className="font-redhat font-bold text-2xl">€ 22.1 M</p>
              <p className="font-redhat font-semibold text-xs text-[#777777]"> <span><TrendingUpIcon className='text-[#18C4B8] pr-2'/></span>2% UP</p>
            </div>
            <div className="mt-4 h-16 flex-grow">
          <Line ref={chartRef} data={data} options={options} />
        </div>
            </div>
          <div className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]" style={{boxShadow: "4px 4px 33px 0px #0000000A"}}>
  <div className="p-2 rounded-lg bg-[#E713FB1F] h-fit">
    <img  src={promotionicon} alt='promotionicon'/>
  </div>
  <div className="">
    <p className="font-redhat font-semibold text-base">Promotions</p>
    <p className="pt-2 font-redhat font-bold text-2xl">3320</p>
    <p className="pt-2 font-redhat text-sm text-[#777777] font-normal">922 tickets in-lined </p>
    <button className='pt-3 font-redhat text-sm font-normal text-[#777777]'>201 tickets sold</button>
  </div>

          </div>
          <div className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]" style={{boxShadow: "4px 4px 33px 0px #0000000A"}}>
  <div className="p-2 rounded-lg bg-[#F6A0171F] h-fit">
    <DirectionsCarFilledIcon fontSize='medium' className='text-[#F6A017]'/>
  </div>
  <div className="">
    <p className="font-redhat font-semibold text-base">Rental vehicles</p>
    <p className="pt-2 font-redhat font-bold text-2xl">221</p>
    <p className="pt-2 font-redhat text-sm text-[#777777]">123K rentals booked last month</p>
  </div>
          </div>
        </div>
        <div className="flex justify-between pt-6 ">
        <div className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]" style={{boxShadow: "4px 4px 33px 0px #0000000A"}}>
  <div className="p-2 rounded-lg bg-[#FE4C8D1F] h-fit">
    <img  src={sosicon} alt='promotionicon'/>
  </div>
  <div className="">
    <p className="font-redhat font-semibold text-base">SoS user Signups</p>
    <p className="pt-2 font-redhat font-bold text-2xl">3320</p>
    <p className="pt-2 font-redhat text-sm text-[#777777] font-normal">922 tickets in-lined </p>
    <button className='pt-3 font-redhat text-sm font-normal text-[#777777]'>201 tickets sold</button>
  </div>

          </div>
          <div className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]" style={{boxShadow: "4px 4px 33px 0px #0000000A"}}>
  <div className="p-2 rounded-lg bg-[#EF931333] h-fit">
  <img  src={drivericon} alt='promotionicon' className=''/>
  </div>
  <div className="">
    <p className="font-redhat font-semibold text-base">3rd party driver Signups</p>
    <p className="pt-2 font-redhat font-bold text-2xl">221</p>
    <p className="pt-2 font-redhat text-sm text-[#777777]">123K rentals booked last month</p>
  </div>
          </div>
          <div className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]" style={{boxShadow: "4px 4px 33px 0px #0000000A"}}>
  <div className="p-2 rounded-lg bg-[#22E4931F] h-fit">
  <img  src={graphicon} alt='promotionicon'/>
  </div>
  <div className="">
    <p className="font-redhat font-semibold text-base">Cabs booked by Ads</p>
    <p className="pt-2 font-redhat font-bold text-2xl">221</p>
    <p className="pt-2 font-redhat text-sm text-[#777777]">123K rentals booked last month</p>
  </div>
          </div>
        </div>
        <Bookinggraph/>
      </div>
      <div className="w-[30%] flex flex-col gap-6">
    
            <Saletypechart/>
            <div className="flex-grow flex flex-col p-4 bg-white rounded-lg ccccccccc" style={{boxShadow: "4px 4px 33px 0px #0000000A"}}>
            <div className="flex justify-between items-center  ">
            <p className="font-redhat font-semibold text-base">BOLD Business</p>
            <button><MoreHorizIcon className='text-[#777777]'/></button>
            </div>
            <div className="flex gap-2 pt-2 items-center">
              <p className="font-redhat font-bold text-2xl">€ 22.1 M</p>
              <p className="font-redhat font-semibold text-xs text-[#777777]"> <span><TrendingUpIcon className='text-[#18C4B8] pr-2'/></span>2% UP</p>
            </div>
            <p className="font-redhat text-base text-[#777777] pt-2">Profits made until now </p>
            <div className="flex justify-between pt-4 gap-6">
              <p className="font-redhat text-base text-[#777777]">210 partners</p>
              <p className="font-redhat text-base text-[#777777]">6.2k trips done until now</p>
            </div>
            <div className="mt-4 h-24 flex-1">
          <Line ref={chartRef} data={data} options={options} />
        </div>
            </div>
      </div>
    </div>
   </div>
   </>
  );
};

export default Services;
