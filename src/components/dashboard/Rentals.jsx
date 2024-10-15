import React ,{useState}from "react";
import {
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Switch,
  FormControlLabel,
  styled,
} from "@mui/material";
import twoLeft from "../../assets/twoLeft.svg";
import oneLeft from "../../assets/oneLeft.svg";
import twoRight from "../../assets/twoRight.svg";
import Sorticon from "../../assets/Sorticon.svg"
import { MoreVert } from "@mui/icons-material";
import searchIcon from "../../assets/searchIcon.svg";
import radioButtonChecked from "../../assets/radioButtonChecked.svg";
import radioButtonUnChecked from "../../assets/radioButtonUnChecked.svg";
import settingsIcon from "../../assets/settingsIcon.svg";
import CustomSelectDropdown from "../common/CustomSelectDropdown";

const Rentals = ({onMenuItemClick}) => {

    const [showAll, setShowAll] = useState(true);

    const tableData = [
        {
          slNo: 1,
          totalPackages: 50,
          organisation: "Company A",
          totalVehicles: 120,
          totalDistance: "2000 km",
          settings: "Options"
        },
        {
          slNo: 2,
          totalPackages: 30,
          organisation: "Company B",
          totalVehicles: 75,
          totalDistance: "1500 km",
          settings: "Options"
        },
        {
          slNo: 3,
          totalPackages: 20,
          organisation: "Company C",
          totalVehicles: 50,
          totalDistance: "1000 km",
          settings: "Options"
        },
        {
          slNo: 4,
          totalPackages: 40,
          organisation: "Company D",
          totalVehicles: 110,
          totalDistance: "2500 km",
          settings: "Options"
        },
        {
          slNo: 5,
          totalPackages: 15,
          organisation: "Company E",
          totalVehicles: 30,
          totalDistance: "700 km",
          settings: "Options"
        },
        {
          slNo: 6,
          totalPackages: 25,
          organisation: "Company F",
          totalVehicles: 60,
          totalDistance: "1800 km",
          settings: "Options"
        }
      ];
      
  
  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-2xl font-bold">Rentals</h1>
      <div className="flex justify-between">
              <div className="flex space-x-4 h-10">
                <Button
                  variant={showAll ? "contained" : "outlined"}
                  sx={{
                    border: "none",
                    textTransform: "none",
                    fontWeight: "600",
                    fontSize: "16px",
                    backgroundColor: showAll ? "black" : "#EEEEEE",
                    color: showAll ? "white" : "black",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: showAll ? "black" : "#EEEEEE",
                      border: "none",
                    },
                  }}
                //   onClick={handleAllClick}
                >
                  All
                </Button>
                <CustomSelectDropdown
                //   value={state}
                //   onChange={handleStateChange}
                  name="Organisation"
                  options={["Active", "Inactive"]}
                />
                
              </div>
              <div className="flex space-x-4 h-10">
                <TextField
                  variant="outlined"
                  placeholder="Search for drivers"
                //   value={search}
                //   onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={searchIcon}
                          alt="search icon"
                          style={{ width: 25 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "150%",
                    ".MuiOutlinedInput-input": {
                      padding: "10px 4px",
                    },
                  }}
                />
              </div>
            </div>
            <TableContainer>
  <Table
    sx={{
      border: "1px solid rgba(221, 221, 221, 1)",
    }}
  >
    <TableHead
      sx={{
        backgroundColor: "rgba(238, 238, 238, 1)",
        borderRadius: "10px",
      }}
    >
      <TableRow>
        <TableCell
          sx={{
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          Ride ID
        </TableCell>
        <TableCell
          sx={{
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          Total trips
        </TableCell>
        <TableCell
          sx={{
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          Organisation
        </TableCell>
        <TableCell
          sx={{
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          Total vehicles
        </TableCell>
        <TableCell
          sx={{
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          Total distance
        </TableCell>
        <TableCell align="right">
          <img src={settingsIcon} alt="settingsIcon" />
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {tableData.map((row, index) => (
        <TableRow key={index} onClick={() => onMenuItemClick("Rentalorganisation")}>
          <TableCell >
            <p className="font-redhat font-bold text-base">
              {row.slNo}
            </p>
          </TableCell>
          <TableCell>
            <p className="font-redhat text-base font-semibold">
              {row.totalPackages}
            </p>
          </TableCell>
          <TableCell>
            <p className="font-redhat text-base font-semibold">
              {row.organisation}
            </p>
          </TableCell>
          <TableCell>
            <p className="font-redhat text-base font-semibold">
              {row.totalVehicles}
            </p>
          </TableCell>
          <TableCell>
            <p className="font-redhat text-base font-semibold">
              {row.totalDistance}
            </p>
          </TableCell>
          <TableCell>
            <IconButton>
              {/* onClick={(e) => handleMenuOpen(e, row)} */}
              <MoreVert />
            </IconButton>
            <Menu
              // anchorEl={menuAnchor}
              // open={Boolean(menuAnchor)}
              // onClose={handleMenuClose}
            >
              <MenuItem 
              // onClick={handleEditRow}
              >Edit</MenuItem>
              <MenuItem 
              // onClick={handleRemoveRow}
              >Remove</MenuItem>
            </Menu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


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
  );
};

export default Rentals;
