/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import BusinessIcon from "@mui/icons-material/Business";
import Acceptancechart from "./Dashboardcharts/Acceptancechart";
import Saletypechart from "./Dashboardcharts/Saletypechart";
import BackArrow from "../../assets/leftArrowBlack.svg";
import SubmittedDocumentsCard from "../common/SubmittedDocuments";
import StatusDropdown from "../common/StatusDropdown";
import QuickConnect from "../common/QuickConnect";

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

const DriverInfo = ({ setSelectedDriverId, setActiveComponent }) => {
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
          paddingInline: "15px",
          paddingBlock: "30px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          borderRadius: "8px",
        }}
      >
        <div className="flex justify-between">
          <p className="font-redhat font-semibold text-2xl">Ride history</p>
          <p>drivers</p>
        </div>
        <TableContainer>
          <Table>
            {/* Table Header */}
            <TableHead
              sx={{
                "& .MuiTableCell-root": {
                  backgroundColor: "#EEEEEE",
                  fontWeight: "400",
                  fontSize: "16px",
                  borderBottom: "none",
                },
                "& .MuiTableCell-root:first-of-type": {
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                },
                "& .MuiTableCell-root:last-of-type": {
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                },
              }}
            >
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
                    fontWeight: "600",
                    fontSize: "16px",
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
        <div>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: "black",
              color: "black",
              borderRadius: "10px",
              fontSize: "20px",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                borderColor: "black",
              },
            }}
          >
            View ride history &gt;&gt;
          </Button>
        </div>
      </Box>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold mb-8">
        {"> Partners"}
        <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={BackArrow}
            alt="BackArrow"
            className="mb-4 cursor-pointer"
            onClick={() => {
              setSelectedDriverId(null);
              setActiveComponent("Drivers");
            }}
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="py-3 px-4 text-base font-redhat bg-[#FF935914] rounded-[56px] text-[#FF9359] border border-[#FF9359] cursor-pointer">
            Generate report
          </div>
          <StatusDropdown />
        </div>
      </div>

      {/* Cards */}
      <div className="flex justify-between pt-8">
        <div className="w-4/6">
          <EntityTable />
        </div>

        {/* Right Cards */}
        <div className="w-[30%] flex flex-col gap-8">
          <SubmittedDocumentsCard />
          <QuickConnect />
        </div>
      </div>
    </>
  );
};

export default DriverInfo;
