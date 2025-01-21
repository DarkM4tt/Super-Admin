import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "../../common/CircularProgress";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Incoming from "../../../assets/Incoming.svg";
import Outgoing from "../../../assets/Outgoing.svg";
import Unanswered from "../../../assets/Unanswered.svg";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";

const Operations = () => {

    const EntityTable = () => {
        const customersData = [
          {
            id: 1,
            name: "Omar Botosh",
            image: "https://via.placeholder.com/40", // Replace with actual image URL
            startDate: "2 Oct, 2024",
            duration: "1 day",
            vehicle: "MK 01MA 220L",
            amountCharged: "€ 1200",
          },
          {
            id: 2,
            name: "Nolan Geidt",
            image: "https://via.placeholder.com/40",
            startDate: "2 Oct, 2024",
            duration: "1 day",
            vehicle: "MK 01MA 220L",
            amountCharged: "€ 1200",
          },
          {
            id: 3,
            name: "Omar Botosh",
            image: "https://via.placeholder.com/40", // Replace with actual image URL
            startDate: "2 Oct, 2024",
            duration: "1 day",
            vehicle: "MK 01MA 220L",
            amountCharged: "€ 1200",
          },
          {
            id: 4,
            name: "Nolan Geidt",
            image: "https://via.placeholder.com/40",
            startDate: "2 Oct, 2024",
            duration: "1 day",
            vehicle: "MK 01MA 220L",
            amountCharged: "€ 1200",
          },
          // Add more data as needed
        ];
      
        return (
          <Box
            sx={{
              marginTop: "24px",
              padding: "16px",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex justify-between">
              <p className="font-redhat font-semibold text-2xl">Current employees in the team</p>
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
                  <TableRow>
                    {["Name", "Email", "Employee ID", "Group", "Working status"].map((header) => (
                      <TableCell key={header}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
      
                {/* Table Body */}
                <TableBody>
                  {customersData.map((customer) => (
                    <TableRow
                      key={customer.id}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <TableCell sx={{fontWeight:600, fontSize:"16px"}}>
                        <div className="flex items-center gap-2">
                          {customer.name}
                        </div>
                      </TableCell>
                      <TableCell sx={{fontWeight:600, fontSize:"16px"}}>{customer.startDate}</TableCell>
                      <TableCell sx={{fontWeight:600, fontSize:"16px"}}>{customer.duration}</TableCell>
                      <TableCell sx={{fontWeight:600, fontSize:"16px"}}>{customer.vehicle}</TableCell>
                      <TableCell sx={{fontWeight:600, fontSize:"16px"}}>{customer.amountCharged}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
           
          </Box>
        );
      };


  return (
    <div>
      <div className="flex justify-between items-center font-redhat text-base font-semibold mb-8">
        <p className="font-redhat font-semibold text-base flex items-center">
          <span className="text-[#777777] pr-2">Internal Team</span>
          {"> Overview"}
        </p>
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
            Add New Employees{" "}
          </div>
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
          <div className="flex flex-col ">
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
      <EntityTable/>
    </div>
  );
};

export default Operations;
