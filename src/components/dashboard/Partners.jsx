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
import SearchIcon from "@mui/icons-material/Search";
import AppleIcon from "../../assets/apple.svg";

const organizationsData = [
  {
    id: 1,
    name: "Oceanic Ventures",
    operatingSince: "01 Jan, 2021",
    totalDrivers: 150,
    totalVehicles: 250,
    listingDrivers: 100,
    issuesQueries: 5,
  },
  {
    id: 2,
    name: "Summit Transport",
    operatingSince: "15 Feb, 2019",
    totalDrivers: 320,
    totalVehicles: 450,
    listingDrivers: 200,
    issuesQueries: 15,
  },
  {
    id: 3,
    name: "Redwood Logistics",
    operatingSince: "10 Mar, 2020",
    totalDrivers: 275,
    totalVehicles: 300,
    listingDrivers: 180,
    issuesQueries: 25,
  },
  {
    id: 4,
    name: "Swift Cargo Movers",
    operatingSince: "05 Apr, 2018",
    totalDrivers: 140,
    totalVehicles: 220,
    listingDrivers: 110,
    issuesQueries: 8,
  },
  {
    id: 5,
    name: "Velocity Rides",
    operatingSince: "20 May, 2022",
    totalDrivers: 380,
    totalVehicles: 480,
    listingDrivers: 240,
    issuesQueries: 12,
  },
  {
    id: 6,
    name: "Metro Transport Co.",
    operatingSince: "12 Jun, 2020",
    totalDrivers: 500,
    totalVehicles: 600,
    listingDrivers: 450,
    issuesQueries: 20,
  },
  {
    id: 7,
    name: "Evergreen Riders",
    operatingSince: "15 Jul, 2016",
    totalDrivers: 220,
    totalVehicles: 310,
    listingDrivers: 190,
    issuesQueries: 10,
  },
  {
    id: 8,
    name: "Pacific Transports",
    operatingSince: "01 Aug, 2023",
    totalDrivers: 120,
    totalVehicles: 200,
    listingDrivers: 80,
    issuesQueries: 2,
  },
  {
    id: 9,
    name: "Northern Fleet",
    operatingSince: "18 Sep, 2017",
    totalDrivers: 300,
    totalVehicles: 400,
    listingDrivers: 280,
    issuesQueries: 30,
  },
  {
    id: 10,
    name: "Global Express",
    operatingSince: "25 Oct, 2015",
    totalDrivers: 180,
    totalVehicles: 250,
    listingDrivers: 140,
    issuesQueries: 5,
  },
  {
    id: 11,
    name: "Royal Lineage Logistics",
    operatingSince: "12 Dec, 2023",
    totalDrivers: 200,
    totalVehicles: 300,
    listingDrivers: 150,
    issuesQueries: 7,
  },
  {
    id: 12,
    name: "Trailblazer Transport",
    operatingSince: "11 Nov, 2022",
    totalDrivers: 210,
    totalVehicles: 360,
    listingDrivers: 200,
    issuesQueries: 11,
  },
  {
    id: 13,
    name: "Silver Wave Logistics",
    operatingSince: "14 Mar, 2023",
    totalDrivers: 410,
    totalVehicles: 500,
    listingDrivers: 300,
    issuesQueries: 15,
  },
  {
    id: 14,
    name: "Future Transit",
    operatingSince: "05 Oct, 2014",
    totalDrivers: 340,
    totalVehicles: 450,
    listingDrivers: 320,
    issuesQueries: 25,
  },
  {
    id: 15,
    name: "Alpha Freight Movers",
    operatingSince: "09 Jan, 2019",
    totalDrivers: 130,
    totalVehicles: 220,
    listingDrivers: 110,
    issuesQueries: 0,
  },
  {
    id: 16,
    name: "Summit Logistics Hub",
    operatingSince: "02 Apr, 2016",
    totalDrivers: 250,
    totalVehicles: 330,
    listingDrivers: 230,
    issuesQueries: 19,
  },
  {
    id: 17,
    name: "Nova Ride Solutions",
    operatingSince: "22 May, 2021",
    totalDrivers: 370,
    totalVehicles: 470,
    listingDrivers: 400,
    issuesQueries: 12,
  },
  {
    id: 18,
    name: "Quantum Fleets",
    operatingSince: "13 Jun, 2018",
    totalDrivers: 190,
    totalVehicles: 260,
    listingDrivers: 130,
    issuesQueries: 7,
  },
  {
    id: 19,
    name: "Urban Haul Transport",
    operatingSince: "17 Aug, 2017",
    totalDrivers: 300,
    totalVehicles: 380,
    listingDrivers: 250,
    issuesQueries: 15,
  },
  {
    id: 20,
    name: "Zenith Logistics",
    operatingSince: "09 Sep, 2023",
    totalDrivers: 160,
    totalVehicles: 210,
    listingDrivers: 120,
    issuesQueries: 10,
  },
];

const Partners = ({ onPartnerClick }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
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

      {/* Manage Heading */}
      <Box sx={{ fontSize: "24px", fontWeight: "500", marginBottom: "20px" }}>
        Manage & find organisation
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
        <Tab label="All organisations" />
        <Tab label="Pending organisations" />
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
                    "ID",
                    "Name",
                    "Operating since",
                    "Total drivers",
                    "Total vehicles",
                    "Listing drivers",
                    "Issues/queries",
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
                {organizationsData.map((org) => (
                  <TableRow
                    key={org.id}
                    onClick={() => onPartnerClick(org?.id)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>{org.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img src={AppleIcon} alt="AppleIcon" />
                        {org.name}
                      </div>
                    </TableCell>
                    <TableCell>{org.operatingSince}</TableCell>
                    <TableCell>{org.totalDrivers}</TableCell>
                    <TableCell>{org.totalVehicles}</TableCell>
                    <TableCell>{org.listingDrivers}</TableCell>
                    <TableCell>{org.issuesQueries}</TableCell>
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
    </Box>
  );
};

export default Partners;
