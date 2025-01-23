/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SearchIcon from "@mui/icons-material/Search";
import StatusDropdown from "../common/StatusDropdown";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import BackArrow from "../../assets/leftArrowBlack.svg";
import Incoming from "../../assets/Incoming.svg";
import Outgoing from "../../assets/Outgoing.svg";
import Unanswered from "../../assets/Unanswered.svg";
import CircularProgress from "./../common/CircularProgress";
import CustomerCard from "../common/CustomerCard";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const issues = [
  { name: "Service problems", percentage: 43.5, color: "#FBDB0B" },
  { name: "Technical issues", percentage: 38.1, color: "#18C4B8" },
  { name: "Payment issues", percentage: 30.9, color: "#6FA4EE" },
  { name: "Signup issues", percentage: 25.5, color: "#19E051" },
];

const IssuesRelatedTo = () => {
  const [timeframe, setTimeframe] = useState("month");

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Issues related to
        </Typography>
        <Select
          value={timeframe}
          onChange={handleTimeframeChange}
          size="small"
          sx={{
            fontSize: "0.875rem",
            backgroundColor: "#F3F4F6",
            border: "1px solid #D1D5DB",
            borderRadius: 1,
          }}
        >
          <MenuItem value="month">Month</MenuItem>
          <MenuItem value="year">Year</MenuItem>
        </Select>
      </Box>

      {issues.map((issue, index) => (
        <Box key={index} sx={{ mt: 3 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: "medium", color: "#374151" }}
          >
            {issue.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={issue.percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                flexGrow: 1,
                backgroundColor: "#E5E7EB",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: issue.color,
                },
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: "#6B7280" }}>
            {issue.percentage}%
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const handleSave = () => {
  console.log("hoi");
};

const EmployeeInfo = ({ setActiveComponent, setSelectedEmployeeId }) => {
  const [currentTeam, setCurrentTeam] = useState("");
  const [currentGroup, setCurrentGroup] = useState("");

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <p>
          <span className="text-gray">{"All Employees >"}</span> Nolan Lipshutz
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
              setSelectedEmployeeId(null);
              setActiveComponent("Employees");
            }}
          />
        </div>
        <div className="flex items-center gap-6 pt-8">
          <div className="py-3 px-4 text-base font-redhat bg-[#FF935914] rounded-[56px] text-[#FF9359] border border-[#FF9359] cursor-pointer">
            Generate report
          </div>
          <StatusDropdown />
        </div>
      </div>

      <div className="mt-8">
        <CustomerCard />
      </div>

      {/* Cards */}
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

      <div className="flex justify-between mt-8 gap-6">
        <div className="w-[50%] min-h-72 bg-white rounded-[8px]"></div>
        <div className="w-[25%] bg-white rounded-[8px]">
          <IssuesRelatedTo />
        </div>
        <div className="w-[25%] bg-white rounded-[8px] px-4 py-6 flex flex-col gap-6">
          {/* Title and Save Button */}
          <div className="flex justify-between items-center">
            <p className="font-semibold font-redhat text-base">
              Services covered
            </p>
            <Button
              variant="contained"
              style={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                fontSize: "14px",
              }}
              onClick={handleSave}
            >
              Save changes
            </Button>
          </div>

          {/* Current team */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-stations"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Current team
            </label>
            <TextField
              id="fuel-stations"
              select
              placeholder="Customer support team"
              variant="outlined"
              size="small"
              value={currentTeam}
              onChange={(e) => setCurrentTeam(e.target.value)}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                IconComponent: ExpandMoreIcon,
              }}
            >
              <MenuItem value="" disabled>
                Customer support team
              </MenuItem>
              <MenuItem value="station1">Station 1</MenuItem>
              <MenuItem value="station2">Station 2</MenuItem>
            </TextField>
          </div>

          {/* Current group */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-stations"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Current group
            </label>
            <TextField
              id="fuel-stations"
              select
              placeholder="Group 16"
              variant="outlined"
              size="small"
              value={currentGroup}
              onChange={(e) => setCurrentGroup(e.target.value)}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                IconComponent: ExpandMoreIcon,
              }}
            >
              <MenuItem value="" disabled>
                Group 16
              </MenuItem>
              <MenuItem value="station1">Station 1</MenuItem>
              <MenuItem value="station2">Station 2</MenuItem>
            </TextField>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeInfo;
