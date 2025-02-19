/* eslint-disable react/prop-types */
import SearchIcon from "@mui/icons-material/Search";
import BackArrow from "../../../assets/leftArrowBlack.svg";
import {
  Box,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CustomDropdown from "../../common/CustomDropdown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";

const AllZones = ({ setActiveComponent }) => {
  const [checked, setChecked] = useState(false);
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
  const dropdownOptions = [
    { title: "Customers", value: "stations" },
    { title: "Drivers", value: "vehicles" },
    { title: "Vehicles", value: "drivers" },
  ];
  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        {"> Dashboard"}
        <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>

      <div className="flex mt-8 gap-4">
        <img
          src={BackArrow}
          alt="BackArrow"
          className="cursor-pointer"
          onClick={() => {
            setActiveComponent("Dashboard");
          }}
        />
        <p className="font-redhat font-semibold text-2xl ">All zones</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="font-sans font-normal text-xl">
          Review your all zones list, fill in the below details and submit.
        </p>
        <div
          className="py-2 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px] flex cursor-pointer"
          onClick={() => setActiveComponent("NewZone")}
        >
          + Create new zone
        </div>
      </div>

      <Box
        sx={{
          paddingInline: "15px",
          paddingBlock: "30px",
          marginTop: "32px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          borderRadius: "8px",
        }}
      >
        <div className="flex justify-between items-center">
          <p className="font-redhat font-semibold text-2xl">
            List of all zones
          </p>
          <CustomDropdown options={dropdownOptions} />
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
                {[
                  "Zone name",
                  "Vehicle around",
                  "Map type",
                  "Created on",
                  "Zones status",
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
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    {org.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    1200
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    Heat map
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    12 January, 2025
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <Switch
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: checked ? "#22cfcf" : "red", // Red when ON, Turquoise when OFF
                          opacity: 1,
                        },
                        "& .Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "#22cfcf",
                          opacity: 1,
                        },
                      }}
                    />
                    {checked ? "On" : "Off"}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
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
    </>
  );
};

export default AllZones;
