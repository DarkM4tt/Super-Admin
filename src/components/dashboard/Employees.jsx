/* eslint-disable react/prop-types */
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AppleIcon from "../../assets/apple.svg";
import { MoreHoriz } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const employeesData = [
  {
    id: 1,
    name: "Nolan Lipshutz",
    joinedOn: "12 Oct, 2024",
    currentTeam: "Customer Service",
    employeeId: "2101920012",
    lastWorkedOn: "12 Oct, 2024 | 2:12 PM GMT+1",
  },
  {
    id: 2,
    name: "Emma Watson",
    joinedOn: "05 Sep, 2023",
    currentTeam: "Human Resources",
    employeeId: "2101920056",
    lastWorkedOn: "11 Jan, 2025 | 10:45 AM GMT+1",
  },
  {
    id: 3,
    name: "Liam Johnson",
    joinedOn: "18 Jul, 2022",
    currentTeam: "Engineering",
    employeeId: "2101920090",
    lastWorkedOn: "10 Jan, 2025 | 3:30 PM GMT+1",
  },
  {
    id: 4,
    name: "Sophia Brown",
    joinedOn: "22 Feb, 2023",
    currentTeam: "Marketing",
    employeeId: "2101920123",
    lastWorkedOn: "09 Jan, 2025 | 11:00 AM GMT+1",
  },
  {
    id: 5,
    name: "Olivia Smith",
    joinedOn: "15 Mar, 2021",
    currentTeam: "Finance",
    employeeId: "2101920456",
    lastWorkedOn: "12 Oct, 2024 | 9:00 AM GMT+1",
  },
  {
    id: 6,
    name: "Elijah Davis",
    joinedOn: "30 Nov, 2020",
    currentTeam: "Operations",
    employeeId: "2101920789",
    lastWorkedOn: "08 Jan, 2025 | 5:15 PM GMT+1",
  },
  {
    id: 7,
    name: "Ava Martinez",
    joinedOn: "12 Aug, 2024",
    currentTeam: "Product Management",
    employeeId: "2101920812",
    lastWorkedOn: "12 Jan, 2025 | 1:45 PM GMT+1",
  },
  {
    id: 8,
    name: "James Garcia",
    joinedOn: "10 Jun, 2024",
    currentTeam: "Sales",
    employeeId: "2101920934",
    lastWorkedOn: "07 Jan, 2025 | 4:00 PM GMT+1",
  },
  {
    id: 9,
    name: "Mia Rodriguez",
    joinedOn: "02 Apr, 2023",
    currentTeam: "Engineering",
    employeeId: "2101921023",
    lastWorkedOn: "05 Jan, 2025 | 6:30 PM GMT+1",
  },
  {
    id: 10,
    name: "Benjamin Lopez",
    joinedOn: "01 Jan, 2021",
    currentTeam: "Finance",
    employeeId: "2101921198",
    lastWorkedOn: "03 Jan, 2025 | 10:10 AM GMT+1",
  },
  {
    id: 11,
    name: "Charlotte Wilson",
    joinedOn: "24 Sep, 2024",
    currentTeam: "Human Resources",
    employeeId: "2101921356",
    lastWorkedOn: "12 Jan, 2025 | 12:00 PM GMT+1",
  },
  {
    id: 12,
    name: "William Young",
    joinedOn: "11 Dec, 2023",
    currentTeam: "Operations",
    employeeId: "2101921490",
    lastWorkedOn: "12 Jan, 2025 | 4:45 PM GMT+1",
  },
  {
    id: 13,
    name: "Amelia Hernandez",
    joinedOn: "19 May, 2024",
    currentTeam: "Marketing",
    employeeId: "2101921555",
    lastWorkedOn: "11 Jan, 2025 | 2:00 PM GMT+1",
  },
  {
    id: 14,
    name: "Lucas King",
    joinedOn: "28 Jul, 2023",
    currentTeam: "Product Management",
    employeeId: "2101921678",
    lastWorkedOn: "10 Jan, 2025 | 11:45 AM GMT+1",
  },
  {
    id: 15,
    name: "Isabella Wright",
    joinedOn: "09 Feb, 2022",
    currentTeam: "Customer Service",
    employeeId: "2101921789",
    lastWorkedOn: "12 Jan, 2025 | 3:15 PM GMT+1",
  },
  {
    id: 16,
    name: "Alexander Scott",
    joinedOn: "16 Jun, 2024",
    currentTeam: "Engineering",
    employeeId: "2101921876",
    lastWorkedOn: "09 Jan, 2025 | 10:30 AM GMT+1",
  },
  {
    id: 17,
    name: "Evelyn Green",
    joinedOn: "14 Mar, 2024",
    currentTeam: "Finance",
    employeeId: "2101921955",
    lastWorkedOn: "12 Jan, 2025 | 8:45 AM GMT+1",
  },
  {
    id: 18,
    name: "Michael Adams",
    joinedOn: "21 Jan, 2022",
    currentTeam: "Sales",
    employeeId: "2101922022",
    lastWorkedOn: "08 Jan, 2025 | 7:00 PM GMT+1",
  },
  {
    id: 19,
    name: "Harper Baker",
    joinedOn: "07 Apr, 2023",
    currentTeam: "Operations",
    employeeId: "2101922190",
    lastWorkedOn: "10 Jan, 2025 | 5:00 PM GMT+1",
  },
  {
    id: 20,
    name: "Ethan Perez",
    joinedOn: "03 Oct, 2022",
    currentTeam: "Product Management",
    employeeId: "2101922289",
    lastWorkedOn: "11 Jan, 2025 | 9:45 AM GMT+1",
  },
];

const Employees = ({ onEmployeeClick }) => {
  return (
    <Box>
      {/* Employees Heading */}
      <div className="flex justify-between items-center font-redhat text-base font-semibold mb-8">
        {"> All employees"}
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
                  "Name",
                  "Joined on",
                  "Current team",
                  "Employee ID",
                  "Last worked on",
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
              {employeesData.map((employee) => (
                <TableRow
                  key={employee?.id}
                  onClick={() => onEmployeeClick(employee?.id)}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img src={AppleIcon} alt="AppleIcon" />
                      {employee.name}
                    </div>
                  </TableCell>
                  <TableCell>{employee.joinedOn}</TableCell>
                  <TableCell>{employee.currentTeam}</TableCell>
                  <TableCell>{employee.employeeId}</TableCell>
                  <TableCell>{employee.lastWorkedOn}</TableCell>
                  <TableCell>
                    <MoreHoriz />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Employees;
