import React, {useState} from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    Select,
    MenuItem,
    Button,
    Card,
    Typography,
    Avatar,
    TextField,
    Box,
    IconButton,
  } from "@mui/material";
  import { Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
  import organisatiologo from "../../assets/organisationlogo.jpeg";
  import twoLeft from "../../assets/twoLeft.svg";
import oneLeft from "../../assets/oneLeft.svg";
import twoRight from "../../assets/twoRight.svg";
import callicon from "../../assets/callicon.svg";
import msgicon from "../../assets/messageicon.svg";
import staricon from "../../assets/staricon.svg";
import online from "../../assets/greenDot.svg";
import Euroicon from "../../assets/roundeuro.svg";
import Upgraph from "../../assets/upgraph.svg";
import dashboardvehicle from "../../assets/dashboardvehicle.svg";
import CircleIcon from "@mui/icons-material/Circle";
import lowgraph from "../../assets/lowgraphdash.svg";
import moderategraph from "../../assets/moderategrapgdash.svg";
import { Doughnut } from "react-chartjs-2";
import CustomSelectDropdown from "../common/CustomSelectDropdown";
import logo from "../../assets/roundlogo.svg";
import pakageicon from "../../assets/pakages.svg";
import { styled } from '@mui/material/styles';


const CustomTab = styled(Tab)(({ theme }) => ({
    fontSize: '20px',
    fontWeight: '400',
    fontFamily: 'Red Hat Display',
    textTransform: 'none', // to avoid the default uppercase
    padding:"10px 16px",
    color:"grey",
   '&.Mui-selected': {
      color: 'black', // Active tab text color
    },
    
  
  }));

const Customerinfo = ({onMenuItemClick}) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const data = {
        labels: ["Complete", "Incomplete"],
        datasets: [
          {
            data: [54, 46], // You can adjust the percentage here
            backgroundColor: ["#2dd4bf", "#f5f5dc"], // Adjust colors to match the design
            borderWidth: 0,
          },
        ],
      };

      const options = {
        cutout: "75%", // Adjust for inner white space (doughnut thickness)
        plugins: {
          legend: {
            display: false, // Disable legend if you don't need it
          },
          datalabels: {
            display: false,
          },
        },
      };

      const appointments = [
        {
          rideID: "#1954",
          status: "Pending", // Added status
          driverName: "Jhon Doe",
          pickup: "Sector 9, Badshahpur road, Gurgaon",
          drop: "DLF phase 3, Cyber hub, Delhi",
          time: "05:00AM",
          price: "€231",
          vehicle: "MK 50 MG 54",
          duration: "28min",
        },
        {
          rideID: "#1953",
          status: "Ongoing", // Added status
          driverName: "Ranjith Ratan",
          pickup: "Sector 9, Badshahpur road, Gurgaon",
          drop: "DLF phase 3, Cyber hub, Delhi",
          time: "05:00AM",
          price: "€231",
          vehicle: "MK 50 MG 54",
          duration: "5hr",
        },
        {
            rideID: "#1954",
            status: "Pending", // Added status
            driverName: "Jhon Doe",
            pickup: "Sector 9, Badshahpur road, Gurgaon",
            drop: "DLF phase 3, Cyber hub, Delhi",
            time: "05:00AM",
            price: "€231",
            vehicle: "MK 50 MG 54",
            duration: "28min",
          },
          {
            rideID: "#1953",
            status: "Ongoing", // Added status
            driverName: "Ranjith Ratan",
            pickup: "Sector 9, Badshahpur road, Gurgaon",
            drop: "DLF phase 3, Cyber hub, Delhi",
            time: "05:00AM",
            price: "€231",
            vehicle: "MK 50 MG 54",
            duration: "5hr",
          },
          {
            rideID: "#1954",
            status: "Pending", // Added status
            driverName: "Jhon Doe",
            pickup: "Sector 9, Badshahpur road, Gurgaon",
            drop: "DLF phase 3, Cyber hub, Delhi",
            time: "05:00AM",
            price: "€231",
            vehicle: "MK 50 MG 54",
            duration: "28min",
          },
          {
            rideID: "#1953",
            status: "Ongoing", // Added status
            driverName: "Ranjith Ratan",
            pickup: "Sector 9, Badshahpur road, Gurgaon",
            drop: "DLF phase 3, Cyber hub, Delhi",
            time: "05:00AM",
            price: "€231",
            vehicle: "MK 50 MG 54",
            duration: "5hr",
          },
        // More rows...
      ];

      const renderTable = () => (
        <TableContainer className="my-4">
          <Table sx={{ borderCollapse: "separate", borderSpacing: "0px 16px" }}>
            <TableHead className="bg-gray-200">
              <TableRow sx={{ borderRadius: "8px", backgroundColor: "#EEEEEE" }}>
                <TableCell sx={{ fontSize: "14px", fontWeight: "700" }}>Ride ID</TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "700" }}>Status</TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "700" }}>Vehicle No.</TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "700" }}>Driver Name</TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "700" }}>Pickup</TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "700" }}>Drop</TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "700" }}>Amount</TableCell>
                <TableCell sx={{ fontSize: "14px", fontWeight: "700" }}>Distance/Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((ride) => (
                <TableRow key={ride.rideID} sx={{ background: "#FAFAFA", paddingX: "24px" }}>
                  <TableCell sx={{ paddingY: "24px" }}>{ride.rideID}</TableCell>
                  <TableCell sx={{ paddingY: "24px", color: getStatusColor(ride.status) }}>
                    {ride.status}
                  </TableCell>
                  <TableCell sx={{ paddingY: "24px" }}>{ride.vehicle}</TableCell>
                  <TableCell sx={{ paddingY: "24px" }}>{ride.driverName}</TableCell>
                  <TableCell sx={{ paddingY: "24px" }}>{ride.pickup}</TableCell>
                  <TableCell sx={{ paddingY: "24px" }}>{ride.drop}</TableCell>
                  <TableCell sx={{ paddingY: "24px" }}>{ride.price}</TableCell>
                  <TableCell sx={{ paddingY: "24px" }}>{ride.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

      const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
      };

      const getStatusColor = (status) => {
        return status === "Pending" ? "red" : status === "Ongoing" ? "green" : "black";
      };
  return (
    <div className='p-6'>
      <div className="mb-10 flex items-center cursor-pointer">
        <ArrowBackIcon
          sx={{ mr: 2 }}
          onClick={() => {
            onMenuItemClick("Customer")
          }}
        />
        <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
          Return to Customers
        </Typography>
      </div>
      <div className="flex justify-between">
        <div className="leftonetop">
          <div className="flex gap-10">
            <div className="flex gap-4 ">
              <img
                src={organisatiologo}
                alt=""
                className="w-[80px] rounded-full"
              />
              <div className="pt-2">
                {" "}
                <p className="font-bold text-2xl ">Cristiano Ronaldo</p>
                <p className="font-semibold text-base text-[#777777] pt-2">
                Lisbon, Portugal
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start pt-2">
              <img
                src={callicon}
                alt="callicon"
                className="cursor-pointer w-8"
              />
              <img
                src={msgicon}
                alt="callicon"
                className="cursor-pointer w-8"
              />
            </div>
          </div>
        </div>
        <div className="rightonetop flex justify-between space-x-16">
          <div>
            <p className="font-semibold text-base font-redhat">User rating</p>
            <div className="flex gap-2 pt-2">
              <img src={staricon} alt="staricon" className="w-6" />
              <p className="font-bold text-base font-redhat">
                4.5<span className="text-[#777777]">/5</span>
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-base font-redhat">
            User PIN
            </p>
            <div className="flex gap-2 pt-2">
              <p className="font-bold text-base font-redhat">2212</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-base font-redhat">
              Registration date
            </p>
            <div className="flex gap-2 pt-2">
              <p className="font-bold text-base font-redhat">12 Jan, 2024</p>
            </div>
          </div>
         
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-12">
        <div className="border border-borderGray rounded-lg flex flex-col justify-between  p-4 pb-5 ">
          <div className="flex gap-4 ">
            <img src={logo} alt="info" className="h-12 " />
            <div>
              <h1 className="text-4xl font-bold">3322</h1>
              <p className="font-redhat text-sm font-semibold">
              Total wallet balance
              </p>
            </div>
          </div>
        </div>
        <div className="border border-borderGray rounded-lg flex flex-col justify-between  p-4 pb-5 ">
          <div className="flex gap-4 ">
            <img src={Euroicon} alt="info" className="h-12 " />
            <div>
              <h1 className="text-4xl font-bold">3322</h1>
              <p className="font-redhat text-sm font-semibold">
              Total spends
              </p>
            </div>
          </div>
        </div>
        <div className="border border-borderGray rounded-lg flex flex-col justify-between  p-4 pb-5 ">
          <div className="flex gap-4 ">
            <img src={dashboardvehicle} alt="info" className="h-12 " />
            <div>
              <h1 className="text-4xl font-bold">3322</h1>
              <p className="font-redhat text-sm font-semibold">
              Total trips
              </p>
            </div>
          </div>
        </div>
        <div className="border border-borderGray rounded-lg flex flex-col justify-between  p-4 pb-5 ">
          <div className="flex gap-4 ">
            <img src={pakageicon} alt="info" className="h-12 " />
            <div>
              <h1 className="text-4xl font-bold">3322</h1>
              <p className="font-redhat text-sm font-semibold">
              Total packages
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-20'>
      <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          className="mb-4"
          TabIndicatorProps={{
            sx: {
              backgroundColor: 'black', // Indicator color for the active tab
              height: '4px',
            },
          }}
        >
          {/* Tab Labels */}
          <CustomTab label="Cabs" />
          <CustomTab label="Intercity" />
          <CustomTab label="Packages" />
          <CustomTab label="Rentals" />
          <CustomTab label="Jump Start" />
        </Tabs>

        {selectedTab === 0 && renderTable()}
        {selectedTab === 1 && renderTable()}
        <div className="flex justify-between items-center">
            <Select
              value="10"
              onChange={() => {}}
              sx={{
                backgroundColor: "white",
                fontWeight: "600",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              <MenuItem value="10">10 lines</MenuItem>
              <MenuItem value="20">20 lines</MenuItem>
              <MenuItem value="50">50 lines</MenuItem>
            </Select>
            <div className="flex gap-4">
              <Button
                sx={{
                  color: "rgba(119, 119, 119, 1)",
                  paddingInline: "20px",
                  paddingBlock: "10px",
                  backgroundColor: "rgba(238, 238, 238, 1)",
                  fontSize: "14px",
                  fontWeight: "500",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(238, 238, 238, 1)",
                  },
                }}
              >
                <img src={twoLeft} alt="twoLeft" className="mr-1" />
                First page
              </Button>
              <Button
                sx={{
                  color: "rgba(119, 119, 119, 1)",
                  paddingInline: "20px",
                  backgroundColor: "rgba(238, 238, 238, 1)",
                  fontSize: "14px",
                  fontWeight: "500",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(238, 238, 238, 1)",
                  },
                }}
              >
                <img src={oneLeft} alt="oneLeft" className="mr-2" />
                Anterior
              </Button>
              <Button
                sx={{
                  color: "rgba(119, 119, 119, 1)",
                  paddingInline: "20px",
                  backgroundColor: "rgba(238, 238, 238, 1)",
                  fontSize: "14px",
                  fontWeight: "500",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(238, 238, 238, 1)",
                  },
                }}
              >
                Following
                <img src={twoRight} alt="twoRight" className="ml-1" />
              </Button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Customerinfo
