/* eslint-disable react/prop-types */
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
  import { useState } from "react";
  
  const rentalPartnersData = [
    {
      id: 1,
      name: "Your rental partners",
      totalVehicle: "Aviero",
      totalBookings: 129,
      revenueGenerated: "€120,192",
      pendingPayouts: "None",
    },
    {
      id: 2,
      name: "Your rental partners",
      totalVehicle: "Aviero",
      totalBookings: 129,
      revenueGenerated: "€120,192",
      pendingPayouts: "€120,192",
    },
    {
      id: 3,
      name: "Your rental partners",
      totalVehicle: "Aviero",
      totalBookings: 129,
      revenueGenerated: "€120,192",
      pendingPayouts: "None",
    },
    {
      id: 4,
      name: "Your rental partners",
      totalVehicle: "Aviero",
      totalBookings: 129,
      revenueGenerated: "€120,192",
      pendingPayouts: "None",
    },
    {
      id: 5,
      name: "Your rental partners",
      totalVehicle: "Aviero",
      totalBookings: 129,
      revenueGenerated: "€120,192",
      pendingPayouts: "€120,192",
    },
    {
      id: 6,
      name: "Your rental partners",
      totalVehicle: "Aviero",
      totalBookings: 129,
      revenueGenerated: "€120,192",
      pendingPayouts: "€120,192",
    },
  ];
  
  const Rentals = ({ onPartnerClick }) => {
    const [activeTab, setActiveTab] = useState(0);
  
    const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
    };
  
    return (
      <Box>
        {/* Partners Heading */}
        <div className="flex justify-between items-center font-redhat text-base font-semibold ">
          <p className="font-redhat font-semibold text-base flex items-center">
            <span className="text-[#777777] pr-2">Services</span>
            {"> Overview"}
          </p>
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
        <p className="font-redhat font-semibold text-2xl py-8">
          Manage & find organisation
        </p>
  
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: "1px solid #d3d3d3",
            ".MuiTab-root": {
              textTransform: "none",
              fontWeight: 400,
              fontSize: "16px",
              color: "#9e9e9e",
              paddingY: "8px",
            },
            ".Mui-selected": {
              color: "#1860C4",
              fontWeight: "600",
              fontSize: "16px",
              paddingY: "8px",
            },
            ".MuiTabs-indicator": { backgroundColor: "#1976d2" },
          }}
        >
          <Tab label="All rental partners" />
          <Tab label="Pending requests" />
          <Tab label="New requests" />
        </Tabs>
  
        {/* Tab Content */}
        {activeTab === 0 && (
          <Box
            sx={{
              marginTop: "32px",
              padding: "8px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TableContainer>
              <Table>
                {/* Table Header */}
                <TableHead>
                  <TableRow style={{ borderRadius: "8px" }}>
                    {[
                      "Name",
                      "Total vehicle",
                      "Total bookings made",
                      "Revenue generated",
                      "Pending payouts",
                      "Options",
                    ].map((header) => (
                      <TableCell
                        key={header}
                        sx={{
                          backgroundColor: "#EEEEEE",
                          fontWeight: "600",
                          fontSize: "16px",
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
  
                {/* Table Body */}
                <TableBody>
                  {rentalPartnersData.map((partner) => (
                    <TableRow
                      key={partner.id}
                      onClick={() => onPartnerClick(partner?.id)}
                      sx={{ cursor: "pointer"}}
                    >
                      <TableCell sx={{fontSize:"16px" , fontWeight:"600"}}>{partner.name}</TableCell>
                      <TableCell sx={{fontSize:"16px" , fontWeight:"600", textAlign:"center"}}>{partner.totalVehicle}</TableCell>
                      <TableCell sx={{fontSize:"16px" , fontWeight:"600 ", textAlign:"center"}}>{partner.totalBookings}</TableCell>
                      <TableCell sx={{fontSize:"16px" , fontWeight:"600",textAlign:"center"}}>{partner.revenueGenerated}</TableCell>
                      <TableCell sx={{fontSize:"16px" , fontWeight:"600",textAlign:"center"}}>{partner.pendingPayouts}</TableCell>
                      <TableCell sx={{fontSize:"16px" , fontWeight:"600", textAlign:"center"}}>...</TableCell>
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
            New requests
          </Box>
        )}
      </Box>
    );
  };
  
  export default Rentals;
  