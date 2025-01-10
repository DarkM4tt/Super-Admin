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
import CircularProgressBar from "../common/CircularProgressBar";

const FuelCard = ({ selectedOrgId, setActiveComponent, setSelectedOrgId }) => {
  const EntityTable = () => {
    const driversData = [
      {
        id: 1,
        name: "ABC Company ltd",
        assignedVehicle: "MX 019MMA9",
        cardType: "Gasoline 85",
      },
      {
        id: 2,
        name: "ABC Company ltd",
        assignedVehicle: "MX 019MMA9",
        cardType: "Gasoline 85",
      },
      {
        id: 3,
        name: "ABC Company ltd",
        assignedVehicle: "MX 019MMA9",
        cardType: "Gasoline 85",
      },
      {
        id: 4,
        name: "ABC Company ltd",
        assignedVehicle: "MX 019MMA9",
        cardType: "Gasoline 85",
      },
      {
        id: 5,
        name: "ABC Company ltd",
        assignedVehicle: "MX 019MMA9",
        cardType: "Gasoline 85",
      },
      {
        id: 6,
        name: "ABC Company ltd",
        assignedVehicle: "MX 019MMA9",
        cardType: "Gasoline 85",
      },
      {
        id: 7,
        name: "ABC Company ltd",
        assignedVehicle: "MX 019MMA9",
        cardType: "Gasoline 85",
      },
      {
        id: 8,
        name: "ABC Company ltd",
        assignedVehicle: "MX 019MMA9",
        cardType: "Gasoline 85",
      },
      {
        id: 9,
        name: "ABC Company ltd",
        assignedVehicle: "MX 019MMA9",
        cardType: "Gasoline 85",
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
            Assigned fuel cards
          </p>
        </div>
        <TableContainer>
          <Table>
            {/* Table Header */}
            <TableHead
              sx={{
                "& .MuiTableCell-root": {
                  backgroundColor: "#EEEEEE",
                  fontWeight: "600",
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
                {[
                  "Organisation",
                  "Assigned vehicle",
                  "Card type",
                  "Options",
                ].map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
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
                  <TableCell>{org.cardType}</TableCell>
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
    <div className="py-8 px-14 bg-backGround">
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <div className="flex gap-2 text-gray">{"> Fuel Card"}</div>
        <div className="flex gap-4">
          <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none"
            ></input>
          </div>
          <div className="py-3 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px] cursor-pointer">
            <span className="pr-1">
              {" "}
              <AddIcon fontSize="small" />
            </span>{" "}
            Create new fuel card{" "}
          </div>
        </div>
      </div>

      <p className="font-redhat font-semibold text-2xl pt-8">Overview</p>

      {/* Buttons */}
      <div className="flex items-center gap-4 pt-8">
        <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px] cursor-pointer">
          12 Fuel stations payment pending{" "}
          <span className="pl-2">
            {" "}
            <KeyboardDoubleArrowRightIcon />
          </span>{" "}
        </div>
        <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px] cursor-pointer">
          130 new fuel card requests{" "}
          <span className="pl-2">
            {" "}
            <KeyboardDoubleArrowRightIcon />
          </span>{" "}
        </div>
      </div>

      {/* Cards */}
      <div className="flex justify-between pt-8">
        {/* Left Cards */}
        <div className="w-4/6">
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
                  Total fuel stations
                </p>
                <p className="pt-2 font-redhat font-bold text-2xl">22 k</p>
                <p className="pt-2 text-sm text-[#777777]">
                  including all fuel stations
                </p>
                <button
                  className="pt-3 font-redhat text-sm font-light border-b-[2px]"
                  onClick={() => setActiveComponent("Vehicles")}
                >
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
                  Assigned fuel cards
                </p>
                <p className="pt-2 font-redhat font-bold text-2xl">2210</p>
                <p className="pt-2 text-sm text-[#777777]">
                  including all vehicles
                </p>
                <button
                  className="pt-3 font-redhat text-sm font-light border-b-[2px]"
                  onClick={() => setActiveComponent("Drivers")}
                >
                  View list
                </button>
              </div>
            </div>
            <div
              className="w-[30%] flex p-4 bg-white rounded-lg border-b border-[#1860C4]"
              style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
            >
              <CircularProgressBar />
            </div>
          </div>

          {/* Table */}
          <EntityTable />
        </div>

        {/* Right Cards */}
        <div className="w-[30%] flex flex-col">
          <SubmittedDocumentsCard />
          <Saletypechart />
        </div>
      </div>
    </div>
  );
};

export default FuelCard;
