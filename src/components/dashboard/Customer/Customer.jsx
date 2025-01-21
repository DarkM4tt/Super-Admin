import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import StatusDropdown from "../../common/StatusDropdown";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import Rentalpartner from "../../../assets/Rentalpartner.png";
import StarIcon from "@mui/icons-material/Star";
import PlaceIcon from "@mui/icons-material/Place";
import Incoming from "../../../assets/Incoming.svg";
import Outgoing from "../../../assets/Outgoing.svg";
import Unanswered from "../../../assets/Unanswered.svg";
import CircularProgress from "../../common/CircularProgress";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";

const Customer = ({handleCustomerClick}) => {
  const ridesData = [
    {
      id: 1,
      vehicle: "JHA011092",
      rideType: "Package",
      bookedOn: "12 Jan, 2024 | 4PM",
      status: "Success",
      totalSpends: 221.1,
    },
    {
      id: 2,
      vehicle: "JHA011092",
      rideType: "Package",
      bookedOn: "12 Jan, 2024 | 4PM",
      status: "Success",
      totalSpends: 221.1,
    },
    {
      id: 3,
      vehicle: "JHA011092",
      rideType: "Package",
      bookedOn: "12 Jan, 2024 | 4PM",
      status: "Cancelled",
      totalSpends: 221.1,
    },
    {
      id: 4,
      vehicle: "JHA011092",
      rideType: "Package",
      bookedOn: "12 Jan, 2024 | 4PM",
      status: "Success",
      totalSpends: 221.1,
    },
    {
      id: 5,
      vehicle: "JHA011092",
      rideType: "Package",
      bookedOn: "12 Jan, 2024 | 4PM",
      status: "Success",
      totalSpends: 221.1,
    },
    {
      id: 6,
      vehicle: "JHA011092",
      rideType: "Package",
      bookedOn: "12 Jan, 2024 | 4PM",
      status: "Cancelled",
      totalSpends: 221.1,
    },
    {
      id: 7,
      vehicle: "JHA011092",
      rideType: "Package",
      bookedOn: "12 Jan, 2024 | 4PM",
      status: "Success",
      totalSpends: 221.1,
    },
    {
      id: 8,
      vehicle: "JHA011092",
      rideType: "Package",
      bookedOn: "12 Jan, 2024 | 4PM",
      status: "Success",
      totalSpends: 221.1,
    },
    {
      id: 9,
      vehicle: "JHA011092",
      rideType: "Package",
      bookedOn: "12 Jan, 2024 | 4PM",
      status: "Cancelled",
      totalSpends: 221.1,
    },
    {
      id: 10,
      vehicle: "JHA011092",
      rideType: "Package",
      bookedOn: "12 Jan, 2024 | 4PM",
      status: "Success",
      totalSpends: 221.1,
    },
    {
      id: 11,
      vehicle: "JHA011092",
      rideType: "Package",
      bookedOn: "12 Jan, 2024 | 4PM",
      status: "Success",
      totalSpends: 221.1,
    },
    {
      id: 12,
      vehicle: "JHA011092",
      rideType: "Package",
      bookedOn: "12 Jan, 2024 | 4PM",
      status: "Cancelled",
      totalSpends: 221.1,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <p className="font-redhat font-semibold text-base flex items-center">
          <span className="text-[#777777] pr-2">Dashboard</span>
          {"> Ann Baptista"}
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
      <div className="flex items-center justify-end gap-6 pt-8 ">
        <div className="py-3 px-4 text-base font-redhat bg-[#FF935914] rounded-[56px] text-[#FF9359] border border-[#FF9359] cursor-pointer">
          Generate report
        </div>
        <StatusDropdown />
      </div>
      <div className="flex justify-between rounded-lg pb-11 mt-6 bg-white p-6 ">
        <div className="">
          <div className="flex gap-4">
            <div className="">
              <img
                src={Rentalpartner}
                alt="any"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex items-center gap-16">
              <div className="">
                <p className="font-sans text-2xl font-semibold flex items-center">
                  Ann Baptista{" "}
                  <span className=" pl-4 text-base text-[#777777] underline font-sans">
                    ABC Company Ltd &gt;&gt;
                  </span>
                </p>
                <div className="pt-2 flex gap-4">
                  <p className="font-sans text-base text-[#777777] flex gap-2 items-center">
                    <span>
                      <EmailIcon fontSize="small" />
                    </span>
                    annbaptista16@gmail.com
                  </p>
                  <p className="font-sans text-base text-[#777777] flex gap-2 items-center underline">
                    <span>
                      <CallIcon fontSize="small" />
                    </span>
                    +91-9440192122
                  </p>
                </div>
                <p className="font-sans pt-2 text-base text-[#777777] flex gap-2 items-center">
                  <span>
                    <PlaceIcon fontSize="small" />
                  </span>
                  House number 622, Mall Road, Aveiro, Portugal
                </p>
              </div>
              <div className="">
                <p className="font-sans text-base text-[#777777] flex gap-2 items-center">
                  User ID : @annbaptista98_1
                </p>
                <p className="font-sans text-base text-[#777777] flex gap-2 items-center">
                  Password : ******
                  <span>
                    {" "}
                    <EmailIcon fontSize="small" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <p className="font-redhat text-xl text-[#777777]">Customer rating</p>
          <p className="pt-2 font-redhat font-bold text-xl text-[#18C4B8] text-right">
            <span className="text-[#FBDB0B] pr-2">
              <StarIcon />
            </span>
            4.5/5
          </p>
        </div>
      </div>

      <div className="flex gap-8 mt-8">
        <div
          className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
          style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
        >
          <div className="p-2 rounded-lg bg-[#006AFF21] h-fit">
            <img src={Incoming} alt="Incoming" />
          </div>
          <div className="">
            <p className="font-redhat font-semibold text-base">
              Total call received
            </p>
            <p className="pt-2 font-redhat font-bold text-2xl">2210</p>
            <p className="pt-2 text-sm text-[#777777]">
              Last updated 2 min ago
            </p>
            <p className="pt-2 text-sm text-[#777777]">vs 290 prev 7 days</p>
          </div>
        </div>
        <div
          className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
          style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
        >
          <div className="p-2 rounded-lg bg-[#00FFC321] h-fit">
            <img src={Outgoing} alt="Outgoing" />
          </div>
          <div className="">
            <p className="font-redhat font-semibold text-base">
              Answered Queries
            </p>
            <p className="pt-2 font-redhat font-bold text-2xl">221</p>
            <p className="pt-2 text-sm text-[#777777]">
              Last updated 5 min ago
            </p>
            <p className="pt-2 text-sm text-[#777777]">vs 210 prev 5 days</p>
          </div>
        </div>
        <div
          className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
          style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
        >
          <div className="p-2 rounded-lg bg-[#FFFF0021] h-fit">
            <img src={Unanswered} alt="Unanswered" />
          </div>
          <div className="">
            <p className="font-redhat font-semibold text-base">
              Unanswered Queries
            </p>
            <p className="pt-2 font-redhat font-bold text-2xl">2210</p>
            <p className="pt-2 text-sm text-[#777777]">
              Last updated 13 min ago
            </p>
            <p className="pt-2 text-sm text-[#777777]">vs 150 prev 17 days</p>
          </div>
        </div>
        <div
          className="w-[30%] flex items-center gap-4 p-4 bg-white rounded-lg border-b border-[#1860C4]"
          style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
        >
          <div className="flex flex-col">
            <p className="font-redhat text-md font-semibold">Performance</p>
            <p className="font-redhat text-xs font-normal">
              0 negative rating received by customers
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <p className="font-redhat text-xs">
                <span className="pr-2">
                  <FiberManualRecordIcon
                    fontSize="6px"
                    className="text-[#EEEEEE]"
                  />
                </span>
                Total calls
              </p>
              <p className="font-redhat text-xs">
                <span className="pr-2">
                  <FiberManualRecordIcon
                    fontSize="6px"
                    className="text-[#15D356]"
                  />
                </span>
                Responded calls
              </p>
            </div>
          </div>
          <CircularProgress
            value={82}
            primaryColor="#15D356"
            secondaryColor="#EEEEEE"
          />
        </div>
      </div>

      <Box
        sx={{
          marginTop: "30px",
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
                  "Vehicle",
                  "Ride type",
                  "Booked on",
                  "Status",
                  "Total spends",
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
              {ridesData.map((ride) => (
                <TableRow key={ride.id} onClick={() => handleCustomerClick(ride?.id)} >
                  <TableCell>{ride.vehicle}</TableCell>
                  <TableCell>{ride.rideType}</TableCell>
                  <TableCell>{ride.bookedOn}</TableCell>
                  <TableCell>{ride.status}</TableCell>
                  <TableCell>€ {ride.totalSpends}</TableCell>
                  <TableCell>
                    <div>
                      <MoreHoriz />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Customer;
