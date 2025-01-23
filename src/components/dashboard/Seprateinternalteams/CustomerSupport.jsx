import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Incoming from "../../../assets/Incoming.svg";
import Outgoing from "../../../assets/Outgoing.svg";
import Unanswered from "../../../assets/Unanswered.svg";
import AnnBaptista from "../../../assets/annBaptista.png";
import Saletypechart from "../Dashboardcharts/Saletypechart";
import {
  Box,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import TimeTracksChart from "../TimeTracksChart";

const agents = [
  {
    name: "Rayna Mango",
    status: "online",
    tickets: 260,
    abandoned: 0,
    rating: 4.8,
  },
  {
    name: "Ryan Dokidis",
    status: "offline",
    tickets: 213,
    abandoned: 7,
    rating: 3.2,
  },
  {
    name: "Marley Rhiel Madsen",
    status: "online",
    tickets: 196,
    abandoned: 13,
    rating: 4.9,
  },
];

const issues = [
  { name: "Service problems", percentage: 43.5, color: "#FBDB0B" },
  { name: "Technical issues", percentage: 38.1, color: "#18C4B8" },
  { name: "Payment issues", percentage: 30.9, color: "#6FA4EE" },
  { name: "Signup issues", percentage: 25.5, color: "#19E051" },
];

const TopPerformingEmployees = () => {
  return (
    <div className="bg-white p-6 rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-4">
        Top performing employees this week
      </h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2 text-sm font-medium text-gray-500">Agents</th>
            <th className="pb-2 text-sm font-medium text-gray-500">
              Total tickets
            </th>
            <th className="pb-2 text-sm font-medium text-gray-500">
              Abandoned tickets
            </th>
            <th className="pb-2 text-sm font-medium text-gray-500">
              Customer rating
            </th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, index) => (
            <tr key={index}>
              <td className="py-4 flex">
                <div className="flex gap-2">
                  <img src={AnnBaptista} alt="AnnBaptista" className="w-10" />
                  <div className="flex flex-col">
                    <div className="font-medium text-gray-800">
                      {agent.name}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          agent.status === "online"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      {agent.status.charAt(0).toUpperCase() +
                        agent.status.slice(1)}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 text-gray-800">{agent.tickets}</td>
              <td className="py-4 text-gray-800">{agent.abandoned}</td>
              <td className="py-4 text-teal-500 font-medium">
                {agent.rating}/5
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const IssuesRelatedTo = () => {
  const [timeframe, setTimeframe] = React.useState("month");

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

const DashboardStats = () => {
  return (
    <div className="flex flex-col h-[50rem] items-center justify-between py-6 rounded-lg w-full">
      {/* Calls Active */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
          22
        </div>
        <p className="mt-2 text-sm font-medium text-gray-700">Calls Active</p>
      </div>

      {/* Calls Waiting */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 font-bold">
          22
        </div>
        <p className="mt-2 text-sm font-medium text-gray-700">Calls Waiting</p>
      </div>

      {/* Calls on Hold */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#B7B5B5] text-white font-bold">
          8
        </div>
        <p className="mt-2 text-sm font-medium text-gray-700">Calls on hold</p>
      </div>

      {/* Total Employees */}
      <div className="flex flex-col items-center">
        <div className="flex items-center -space-x-2">
          <img
            src={AnnBaptista}
            alt="Avatar 1"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <img
            src={AnnBaptista}
            alt="Avatar 2"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <img
            src={AnnBaptista}
            alt="Avatar 3"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white text-sm text-gray-700">
            +35
          </div>
        </div>
        <p className="mt-2 text-sm font-medium text-gray-700">
          Total employees
        </p>
      </div>
    </div>
  );
};

const CustomerSupport = () => {
  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold mb-8">
        <p className="font-redhat font-semibold text-base flex items-center">
          <span className="text-[#777777] pr-2">Internal Team</span>
          {"> Customer support"}
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

      <div className="flex justify-between mt-8 gap-4">
        <div className="w-[70%] flex flex-col gap-8">
          <div className="flex justify-between">
            <div
              className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
              style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
            >
              <div className="p-2 rounded-lg bg-[#006AFF21] h-fit">
                <img src={Incoming} alt="Incoming" />
              </div>
              <div className="">
                <p className="font-redhat font-semibold text-base">
                  Incoming Queries
                </p>
                <p className="pt-2 font-redhat font-bold text-2xl">2210</p>
                <p className="pt-2 text-sm text-[#777777]">
                  Last updated 2 min ago
                </p>
                <p className="pt-2 text-sm text-[#777777]">
                  vs 290 prev 7 days
                </p>
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
                <p className="pt-2 text-sm text-[#777777]">
                  vs 150 prev 17 days
                </p>
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
                <p className="pt-2 text-sm text-[#777777]">
                  vs 210 prev 5 days
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-[8px] px-6 py-8">
            <TimeTracksChart />
          </div>
          <TopPerformingEmployees />
        </div>
        <div className="w-[20%] flex flex-col gap-8">
          <Saletypechart />
          <IssuesRelatedTo />
        </div>
        <div className="w-[10%] h-full">
          <DashboardStats />
        </div>
      </div>
    </>
  );
};

export default CustomerSupport;
