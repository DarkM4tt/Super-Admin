/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef, useEffect } from "react";
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
import { Line } from "react-chartjs-2";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import BusinessIcon from "@mui/icons-material/Business";
import Acceptancechart from "./Dashboardcharts/Acceptancechart";
import Bookinggraph from "./Dashboardcharts/Bookinggraph";
import Saletypechart from "./Dashboardcharts/Saletypechart";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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

const PartnerInfo = ({ orgId, setActiveComponent }) => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

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

  const EntityTable = () => {
    const driversData = [
      {
        id: 1,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        totalRides: 789,
      },
      {
        id: 2,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        totalRides: 789,
      },
      {
        id: 3,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        totalRides: 789,
      },
      {
        id: 4,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        totalRides: 789,
      },
      {
        id: 5,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        totalRides: 789,
      },
      {
        id: 6,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        totalRides: 789,
      },
      {
        id: 7,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        totalRides: 789,
      },
      {
        id: 8,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        totalRides: 789,
      },
      {
        id: 9,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        totalRides: 789,
      },
    ];

    return (
      <Box
        sx={{
          marginTop: "20px",
          paddingInline: "15px",
          paddingBlock: "30px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex justify-between">
          <p className="font-redhat font-semibold text-2xl">
            List of approved vehicles/drivers
          </p>
          <p>drivers</p>
        </div>
        <TableContainer>
          <Table>
            {/* Table Header */}
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "10px",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                {["Name", "Assigned vehicle", "Total rides", "Options"].map(
                  (header) => (
                    <TableCell key={header}>{header}</TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {driversData.map((org) => (
                <TableRow
                  key={org.id}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <TableCell>{org.name}</TableCell>
                  <TableCell>{org.assignedVehicle}</TableCell>
                  <TableCell>{org.totalRides}</TableCell>
                  <TableCell>
                    <button>
                      <MoreHorizIcon className="text-[#777777]" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <div className="py-8 px-14 bg-[#F8F8F8]">
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        {"> Partners"}
        <div className="flex gap-4">
          <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none"
            ></input>
          </div>
          <div className="py-3 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px]">
            <span className="pr-1">
              {" "}
              <AddIcon fontSize="small" />
            </span>{" "}
            Add New Employees{" "}
          </div>
        </div>
      </div>

      <p className="font-redhat font-semibold text-2xl pt-8">ABC Company Ltd</p>
      <p className="font-redhat font-normal text-sm  text-[#777777] pt-2">
        Please note that the status change will hinder the organisation
        operations & any vehicle in the organisation may not receive the ride
        request from BOLD app.{" "}
      </p>

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 pt-8">
          <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px] cursor-pointer">
            List of submitted documents{" "}
            <span className="pl-2">
              {" "}
              <KeyboardDoubleArrowRightIcon />
            </span>{" "}
          </div>
          <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px] cursor-pointer">
            List of submitted drivers/vehicle documents{" "}
            <span className="pl-2">
              {" "}
              <KeyboardDoubleArrowRightIcon />
            </span>{" "}
          </div>
        </div>
        <div className="flex items-center gap-6 pt-8">
          <div className="py-3 px-4 text-base font-redhat bg-[#FF935914] rounded-[56px] text-[#FF9359] border border-[#FF9359] cursor-pointer">
            Generate overview report
          </div>
          <div className="py-3 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px]">
            <span className="pr-1">
              {" "}
              <AddIcon fontSize="small" />
            </span>{" "}
            Create zone{" "}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="flex justify-between pt-8">
        {/* Left Cards */}
        <div className="w-4/6">
          {/* Top Three Cards */}
          <div className="flex justify-between">
            <div
              className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
              style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
            >
              <div className="p-2 rounded-lg bg-[#F6A0171F] h-fit">
                <DirectionsCarFilledIcon
                  fontSize="medium"
                  className="text-[#F6A017]"
                />
              </div>
              <div className="">
                <p className="font-redhat font-semibold text-base">
                  Total vehicles
                </p>
                <p className="pt-2 font-redhat font-bold text-2xl">22 k</p>
                <p className="pt-2 text-sm text-[#777777]">
                  18 k+ currently <span className="text-[#18C4B8]">active</span>
                </p>
                <button className="pt-3 font-redhat text-sm font-light border-b-[2px]">
                  View list
                </button>
              </div>
            </div>
            <div
              className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
              style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
            >
              <div className="p-2 rounded-lg bg-[#006AFF21] h-fit">
                <BusinessIcon fontSize="medium" className="text-[#006AFF]" />
              </div>
              <div className="">
                <p className="font-redhat font-semibold text-base">
                  Total drivers
                </p>
                <p className="pt-2 font-redhat font-bold text-2xl">2210</p>
                <p className="pt-2 text-sm text-[#777777]">
                  including 320 rental org.
                </p>
                <button className="pt-3 font-redhat text-sm font-light border-b-[2px]">
                  View list
                </button>
              </div>
            </div>
            <div
              className="w-[30%] p-4 bg-white rounded-lg border-b border-[#1860C4]"
              style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
            >
              <div className="flex justify-between items-center  ">
                <p className="font-redhat font-semibold text-base">
                  Total revenue
                </p>
                <button>
                  <MoreHorizIcon className="text-[#777777]" />
                </button>
              </div>
              <div className="flex gap-2 pt-2 items-center">
                <p className="font-redhat font-bold text-2xl">€ 22.1 M</p>
                <p className="font-redhat font-semibold text-xs text-[#777777]">
                  {" "}
                  <span>
                    <TrendingUpIcon className="text-[#18C4B8] pr-2" />
                  </span>
                  2% UP
                </p>
              </div>
              <div className="mt-4 h-16">
                <Line ref={chartRef} data={data} options={options} />
              </div>
            </div>
          </div>

          {/* Bottom Three Cards */}
          <div className="flex justify-between pt-6 ">
            <div
              className="w-[30%] flex p-4 bg-white rounded-lg border-b border-[#1860C4]"
              style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
            >
              <Acceptancechart />
            </div>
            <div
              className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
              style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
            >
              <div className="p-2 rounded-lg bg-[#F6A0171F] h-fit">
                <DirectionsCarFilledIcon
                  fontSize="medium"
                  className="text-[#F6A017]"
                />
              </div>
              <div className="">
                <p className="font-redhat font-semibold text-base">
                  Total vehicles
                </p>
                <p className="pt-2 font-redhat font-bold text-2xl">22 k</p>
                <p className="pt-2 text-sm text-[#777777]">
                  18 k+ currently <span className="text-[#18C4B8]">active</span>
                </p>
                <button className="pt-3 font-redhat text-sm font-light border-b-[2px]">
                  View list
                </button>
              </div>
            </div>
            <div
              className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
              style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
            >
              <div className="p-2 rounded-lg bg-[#006AFF21] h-fit">
                <BusinessIcon fontSize="medium" className="text-[#006AFF]" />
              </div>
              <div className="">
                <p className="font-redhat font-semibold text-base">
                  Total users
                </p>
                <p className="pt-2 font-redhat font-bold text-2xl">2210</p>
                <p className="pt-2 text-sm text-[#777777]">
                  including 320 rental org.
                </p>
                <button className="pt-3 font-redhat text-sm font-light underline">
                  View list
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <EntityTable />
        </div>

        {/* Right Cards */}
        <div className="w-[30%] flex flex-col">
          <div
            className=" p-4 bg-white rounded-lg "
            style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
          >
            <div className="flex justify-between items-center  ">
              <p className="font-redhat font-semibold text-base">
                Total revenue
              </p>
              <button>
                <MoreHorizIcon className="text-[#777777]" />
              </button>
            </div>
            <div className="flex gap-2 pt-2 items-center">
              <p className="font-redhat font-bold text-2xl">€ 22.1 M</p>
              <p className="font-redhat font-semibold text-xs text-[#777777]">
                {" "}
                <span>
                  <TrendingUpIcon className="text-[#18C4B8] pr-2" />
                </span>
                2% UP
              </p>
            </div>
            <p className="font-redhat text-base text-[#777777] pt-2">
              Including all sectors on BOLD app{" "}
            </p>
            <div className="mt-4 h-24">
              <Line ref={chartRef} data={data} options={options} />
            </div>
          </div>
          <Saletypechart />
        </div>
      </div>
    </div>
  );
};

export default PartnerInfo;
