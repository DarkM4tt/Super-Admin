/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import BackArrow from "../../assets/leftArrowBlack.svg";
import AppleIcon from "../../assets/apple.svg";
import SearchIcon from "@mui/icons-material/Search";

const driversData = [
  {
    id: 1,
    name: "Nolan Lipshutz",
    joinedOn: "12 Oct, 2024",
    assignedVehicle: "KP 01M K209",
    totalTrips: 400,
    rating: "4.2/5",
  },
  {
    id: 2,
    name: "John Doe",
    joinedOn: "10 Sep, 2024",
    assignedVehicle: "KP 01M K210",
    totalTrips: 350,
    rating: "4.5/5",
  },
  {
    id: 3,
    name: "Jane Smith",
    joinedOn: "5 Aug, 2024",
    assignedVehicle: "KP 01M K211",
    totalTrips: 290,
    rating: "3.9/5",
  },
  {
    id: 4,
    name: "Robert Brown",
    joinedOn: "2 Jul, 2024",
    assignedVehicle: "KP 01M K212",
    totalTrips: 500,
    rating: "4.8/5",
  },
  {
    id: 5,
    name: "Emily Johnson",
    joinedOn: "18 Jun, 2024",
    assignedVehicle: "KP 01M K213",
    totalTrips: 250,
    rating: "4.1/5",
  },
  {
    id: 6,
    name: "Chris Williams",
    joinedOn: "13 May, 2024",
    assignedVehicle: "KP 01M K214",
    totalTrips: 400,
    rating: "4.0/5",
  },
  {
    id: 7,
    name: "Patricia Davis",
    joinedOn: "30 Apr, 2024",
    assignedVehicle: "KP 01M K215",
    totalTrips: 450,
    rating: "4.3/5",
  },
  {
    id: 8,
    name: "Linda Miller",
    joinedOn: "25 Mar, 2024",
    assignedVehicle: "KP 01M K216",
    totalTrips: 470,
    rating: "4.4/5",
  },
  {
    id: 9,
    name: "James Wilson",
    joinedOn: "12 Feb, 2024",
    assignedVehicle: "KP 01M K217",
    totalTrips: 320,
    rating: "4.6/5",
  },
  {
    id: 10,
    name: "David Moore",
    joinedOn: "22 Jan, 2024",
    assignedVehicle: "KP 01M K218",
    totalTrips: 380,
    rating: "3.7/5",
  },
  {
    id: 11,
    name: "Mary Taylor",
    joinedOn: "17 Dec, 2023",
    assignedVehicle: "KP 01M K219",
    totalTrips: 290,
    rating: "4.0/5",
  },
  {
    id: 12,
    name: "William Anderson",
    joinedOn: "9 Nov, 2023",
    assignedVehicle: "KP 01M K220",
    totalTrips: 460,
    rating: "4.3/5",
  },
  {
    id: 13,
    name: "Elizabeth Thomas",
    joinedOn: "3 Oct, 2023",
    assignedVehicle: "KP 01M K221",
    totalTrips: 410,
    rating: "4.7/5",
  },
  {
    id: 14,
    name: "Charles Jackson",
    joinedOn: "27 Sep, 2023",
    assignedVehicle: "KP 01M K222",
    totalTrips: 350,
    rating: "3.8/5",
  },
  {
    id: 15,
    name: "Margaret White",
    joinedOn: "15 Aug, 2023",
    assignedVehicle: "KP 01M K223",
    totalTrips: 420,
    rating: "4.5/5",
  },
  {
    id: 16,
    name: "Joseph Harris",
    joinedOn: "12 Jul, 2023",
    assignedVehicle: "KP 01M K224",
    totalTrips: 380,
    rating: "4.1/5",
  },
  {
    id: 17,
    name: "Sophia Clark",
    joinedOn: "10 Jun, 2023",
    assignedVehicle: "KP 01M K225",
    totalTrips: 330,
    rating: "4.2/5",
  },
  {
    id: 18,
    name: "Mason Lewis",
    joinedOn: "2 May, 2023",
    assignedVehicle: "KP 01M K226",
    totalTrips: 400,
    rating: "4.0/5",
  },
  {
    id: 19,
    name: "Olivia Robinson",
    joinedOn: "26 Apr, 2023",
    assignedVehicle: "KP 01M K227",
    totalTrips: 350,
    rating: "4.3/5",
  },
  {
    id: 20,
    name: "Ethan Walker",
    joinedOn: "15 Mar, 2023",
    assignedVehicle: "KP 01M K228",
    totalTrips: 290,
    rating: "3.9/5",
  },
];

const Drivers = ({ onDriverClick, setActiveComponent }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      {/* Partners Heading */}
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

      <img
        src={BackArrow}
        alt="BackArrow"
        className="mb-4 cursor-pointer"
        onClick={() => setActiveComponent("PartnerInfo")}
      />

      {/* Manage Heading */}
      <Box sx={{ fontSize: "24px", fontWeight: "500", marginBottom: "20px" }}>
        ABC Company Ltd &gt;&gt; List of drivers
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          borderBottom: "1px solid #d3d3d3",
          width: "fit-content",
          ".MuiTab-root": {
            textTransform: "none",
            fontWeight: 500,
            color: "#9e9e9e",
          },
          ".Mui-selected": { color: "#1976d2", fontWeight: "bold" },
          ".MuiTabs-indicator": { backgroundColor: "#1976d2" },
        }}
      >
        <Tab label="All drivers" />
        <Tab label="Pending drivers" />
        <Tab label="New requests (11)" />
      </Tabs>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box
          sx={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
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
                <TableRow>
                  {[
                    "Name",
                    "Joined on",
                    "Assigned vehicle",
                    "Total trips",
                    "Customer rating",
                    "Options",
                  ].map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody
                sx={{
                  "& .MuiTableCell-root": {
                    fontWeight: "600",
                    fontSize: "16px",
                  },
                }}
              >
                {driversData.map((driver) => (
                  <TableRow
                    key={driver.id}
                    onClick={() => onDriverClick(driver?.id)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img src={AppleIcon} alt="AppleIcon" />
                        {driver.name}
                      </div>
                    </TableCell>
                    <TableCell>{driver.joinedOn}</TableCell>
                    <TableCell>{driver.assignedVehicle}</TableCell>
                    <TableCell>{driver.totalTrips}</TableCell>
                    <TableCell>{driver.rating}</TableCell>
                    <TableCell>
                      <MoreHoriz />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {activeTab === 1 && (
        <Box
          sx={{
            marginTop: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#757575",
            textAlign: "center",
          }}
        >
          Pending organisations
        </Box>
      )}

      {activeTab === 2 && (
        <Box
          sx={{
            marginTop: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#757575",
            textAlign: "center",
          }}
        >
          New requests (11)
        </Box>
      )}
    </>
  );
};

export default Drivers;
