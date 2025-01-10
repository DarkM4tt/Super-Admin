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
import SearchIcon from "@mui/icons-material/Search";

const vehiclesData = [
  {
    id: 1,
    brand: "Ford Mustang GT 440",
    color: "Red",
    vehicleNumber: "KP 01M K210",
    servicesCovered: "08/12",
    fuelCard: "Gasoline 50",
  },
  {
    id: 2,
    brand: "Chevrolet Camaro",
    color: "Blue",
    vehicleNumber: "KA 02N K345",
    servicesCovered: "07/12",
    fuelCard: "Gasoline 45",
  },
  {
    id: 3,
    brand: "Dodge Challenger",
    color: "Black",
    vehicleNumber: "MH 03Q L567",
    servicesCovered: "06/12",
    fuelCard: "Diesel 30",
  },
  {
    id: 4,
    brand: "Ford Mustang GT 440",
    color: "Yellow",
    vehicleNumber: "DL 04R M876",
    servicesCovered: "08/11",
    fuelCard: "Gasoline 48",
  },
  {
    id: 5,
    brand: "Chevrolet Camaro",
    color: "Grey",
    vehicleNumber: "AP 05S N789",
    servicesCovered: "05/12",
    fuelCard: "Diesel 35",
  },
  {
    id: 6,
    brand: "Dodge Charger",
    color: "Red",
    vehicleNumber: "TN 06T P908",
    servicesCovered: "07/11",
    fuelCard: "Gasoline 40",
  },
  {
    id: 7,
    brand: "Tesla Model S",
    color: "White",
    vehicleNumber: "KA 07U R123",
    servicesCovered: "06/10",
    fuelCard: "Electric 10",
  },
  {
    id: 8,
    brand: "Ford Mustang GT 440",
    color: "Blue",
    vehicleNumber: "MH 08V K234",
    servicesCovered: "08/12",
    fuelCard: "Gasoline 50",
  },
  {
    id: 9,
    brand: "Chevrolet Camaro",
    color: "Black",
    vehicleNumber: "DL 09W L345",
    servicesCovered: "07/12",
    fuelCard: "Gasoline 47",
  },
  {
    id: 10,
    brand: "Dodge Challenger",
    color: "Red",
    vehicleNumber: "KA 10X M456",
    servicesCovered: "06/12",
    fuelCard: "Diesel 32",
  },
  {
    id: 11,
    brand: "Ford Mustang GT 440",
    color: "Grey",
    vehicleNumber: "AP 11Y N567",
    servicesCovered: "08/11",
    fuelCard: "Gasoline 46",
  },
  {
    id: 12,
    brand: "Chevrolet Camaro",
    color: "Yellow",
    vehicleNumber: "TN 12Z P678",
    servicesCovered: "05/12",
    fuelCard: "Diesel 40",
  },
  {
    id: 13,
    brand: "Dodge Charger",
    color: "Red",
    vehicleNumber: "MH 13A R789",
    servicesCovered: "07/11",
    fuelCard: "Gasoline 43",
  },
  {
    id: 14,
    brand: "Tesla Model 3",
    color: "White",
    vehicleNumber: "KA 14B K890",
    servicesCovered: "06/10",
    fuelCard: "Electric 15",
  },
  {
    id: 15,
    brand: "Ford Mustang GT 440",
    color: "Blue",
    vehicleNumber: "DL 15C L901",
    servicesCovered: "08/12",
    fuelCard: "Gasoline 49",
  },
  {
    id: 16,
    brand: "Chevrolet Camaro",
    color: "Black",
    vehicleNumber: "AP 16D M123",
    servicesCovered: "07/12",
    fuelCard: "Gasoline 44",
  },
  {
    id: 17,
    brand: "Dodge Challenger",
    color: "Yellow",
    vehicleNumber: "TN 17E N234",
    servicesCovered: "06/12",
    fuelCard: "Diesel 31",
  },
  {
    id: 18,
    brand: "Ford Mustang GT 440",
    color: "Red",
    vehicleNumber: "MH 18F P345",
    servicesCovered: "08/11",
    fuelCard: "Gasoline 42",
  },
  {
    id: 19,
    brand: "Chevrolet Camaro",
    color: "Grey",
    vehicleNumber: "KA 19G R456",
    servicesCovered: "05/12",
    fuelCard: "Diesel 37",
  },
  {
    id: 20,
    brand: "Tesla Model X",
    color: "White",
    vehicleNumber: "DL 20H K567",
    servicesCovered: "06/10",
    fuelCard: "Electric 12",
  },
];

const Vehicles = ({ onVehicleClick, setActiveComponent }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="py-8 px-14 bg-backGround">
      {/* Vehicles Heading */}
      <div className="flex justify-between items-center font-redhat text-base font-semibold mb-8">
        {"> Vehicles"}
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
        ABC Company Ltd &gt;&gt; List of vehicles
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
        <Tab label="All vehicles" />
        <Tab label="Pending vehicles" />
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
                    "Vehicle brand",
                    "Colour",
                    "Vehicle number",
                    "Services covered",
                    "Fuel card",
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
                {vehiclesData.map((vehicle) => (
                  <TableRow
                    key={vehicle?.id}
                    onClick={() => onVehicleClick(vehicle?.id)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>{vehicle.brand}</TableCell>
                    <TableCell>{vehicle.color}</TableCell>
                    <TableCell>{vehicle.vehicleNumber}</TableCell>
                    <TableCell>{vehicle.servicesCovered}</TableCell>
                    <TableCell>{vehicle.fuelCard}</TableCell>
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
    </div>
  );
};

export default Vehicles;
