import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const teams = [
  { name: "Customer Support", employees: 219, progress: "92%" },
  { name: "Operations", employees: 219, progress: "92%" },
  { name: "Finance", employees: 219, progress: "92%" },
  { name: "Product Development", employees: 219, progress: "92%" },
];

const Internalteam = () => {
  return (
    <div className="">
         <div className="flex justify-between items-center font-redhat text-base font-semibold mb-8">
         <p className="font-redhat font-semibold text-base flex items-center"><span className='text-[#777777] pr-2'>Internal Team</span>{"> Overview"}</p>
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
    <TableContainer className="bg-gray-100 ">
      <Table>
        <TableBody>
          {teams.map((team, index) => (
            <TableRow
              key={index}
              sx={{
                borderBottom: "16px solid #F8F8F8",
                bgcolor:"white", // Adds the bold divider between rows
                borderRadius:"8px",
              }}
            >
              {/* Team Info */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-2xl text-[#777777] font-normal">Team</span>
                  <span className="text-2xl pt-2 font-semibold">{team.name}</span>
                </div>
              </TableCell>

              {/* Total Employees */}
              <TableCell align="left">
                <div className="flex flex-col">
                  <span className="text-2xl text-[#777777] font-normal">Total Employees</span>
                  <span className="text-2xl pt-2 font-semibold">{team.employees}</span>
                </div>
              </TableCell>

              {/* Overall Progress */}
              <TableCell align="left">
                <div className="flex flex-col">
                  <span className="text-2xl text-[#777777] font-normal">Overall Progress</span>
                  <span className="text-2xl pt-2 font-semibold">{team.progress}</span>
                </div>
              </TableCell>

              {/* Manage Access Button */}
              <TableCell align="center">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#ffe5e5",
                    color: "#ff0000",
                    fontSize:"20px",
                    borderRadius:"32px",
                    paddingX:"24px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#ffcccc" },
                  }}
                >
                  Manage access
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default Internalteam;
