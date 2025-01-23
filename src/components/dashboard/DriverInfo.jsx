/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BackArrow from "../../assets/leftArrowBlack.svg";
import SubmittedDocumentsCard from "../common/SubmittedDocuments";
import StatusDropdown from "../common/StatusDropdown";
import QuickConnect from "../common/QuickConnect";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import StarIcon from "@mui/icons-material/Star";
import Rentalpartner from "../../assets/Rentalpartner.png";
import partycar from "../../assets/partycar.png";
import CustomDropdown from "../common/CustomDropdown";

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
    const dropdownOptions = [
      { title: "Fuel Stations", value: "stations" },
      { title: "Vehicles", value: "vehicles" },
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
        <div className="flex justify-between items-center">
          <p className="font-redhat font-semibold text-2xl">Ride history</p>
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

      <div className=" p-6 rounded-lg bg-white mt-8">
        <div className="flex justify-between pb-11 border-b border-[#DDDDDD] ">
          <div className="">
            <div className="flex gap-4">
              <div className="">
                <img
                  src={Rentalpartner}
                  alt="any"
                  className="w-20 h-20 rounded-full"
                />
              </div>
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
              </div>
            </div>
          </div>
          <div className="">
            <p className="font-redhat text-xl text-[#777777]">
              Customer rating
            </p>
            <p className="pt-2 font-redhat font-bold text-xl text-[#18C4B8] text-right">
              <span className="text-[#FBDB0B] pr-2">
                <StarIcon />
              </span>
              4.5/5
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-6 items-center pt-4">
          <img src={partycar} alt="partycar" className="w-[15%]" />
          <div className="flex items-center gap-8 flex-grow">
            <div className="">
              <p className="font-redhat text-xl text-[#777777]">
                Registered vehicle
              </p>
              <p className="font-redhat text-xl pt-2 "> KH01MN0019M </p>
            </div>
            <p className="font-redhat font-bold text-xl text-[#344BFD]">82%</p>
            <div className="h-4 rounded-3xl bg-[#EEEEEE] flex-grow relative ">
              <div className="h-4 rounded-3xl bg-[#344BFD] absolute w-[82%]"></div>
            </div>
          </div>
          <p className="font-redhat font-semibold text-xl text-[#777777]">
            Acceptance ratio
          </p>
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
