import React from "react";
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
const CustomSelectDropdown = ({
  value,
  onChange,
  name,
  options,
  ...rest
}) => {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  };
  return (
    <Select
      value={value}
      onChange={onChange}
      MenuProps={MenuProps}
      {...rest}
      displayEmpty
      renderValue={(selected) => {
        
          return (
            <span
              className="text-sm lg:text-base"
              style={{
                color: "black",
                fontFamily: "Red Hat Display, sans-serif",
                fontWeight: 600,
              }}
            >
 <img className="inline-block pr-2 items-center" src={Sorticon} alt="any" />
              {name}
            </span>
          );
        
        // return `${selected}`;
      }}
      sx={{
        backgroundColor: value ? "black" : "#EEEEEE",
        color: "black",
        borderWidth:"1px",
        overflow:"hidden",
        borderColor:"#DDDDDD",
        borderRadius: "10px",
        ".MuiSvgIcon-root": {
          color: value ? "black" : "black",
        },
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
          borderRadius: "10px",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        ".MuiSelect-select": {
          paddingInline: 2,
          paddingBlock: 1,
          backgroundColor: "white",
          color: "black",
          fontFamily: "Red Hat Display, sans-serif",
          fontSize: {
            xs: "0.5", // default font size for small devices
            sm: "0.75", // for devices with min-width: 600px
            md: "0.87rem", // for devices with min-width: 960px
            lg: "1rem", // for devices with min-width: 1280px
          },
          fontWeight: 600,

          borderRadius: "8px",
        },
        ".MuiInputBase-root": {
          borderRadius: "8px",
        },
      }}
    >
      {options.map((option, idx) => (
        <MenuItem
          key={idx}
          value={option}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: value === option ? "#F5F5F5" : "transparent",
            "&:hover": {
              backgroundColor: "#F5F5F5",
              ".MuiMenuItem-root": {
                paddingY: 0,
              },
            },
            color: "black",
            fontFamily: "Red Hat Display, sans-serif",
            fontSize: {
              xs: "0.5", // default font size for small devices
              sm: "0.75", // for devices with min-width: 600px
              md: "0.87rem", // for devices with min-width: 960px
              lg: "1rem", // for devices with min-width: 1280px
            },
            fontWeight: 600,
          }}
        >
          {option}
          {value === option ? (
            <img
              src={radioButtonChecked}
              alt="radioButtonChecked"
              className="ml-4"
            />
          ) : (
            <img
              src={radioButtonUnChecked}
              alt="radioButtonUnChecked"
              className="ml-4"
            />
          )}
        </MenuItem>
      ))}
    </Select>
  );
};

const Customer = ({onMenuItemClick}) => {

  const customers = [
    {
      name: "John Doe",
      phoneNumber: "123-456-7890",
      userPin: "1234",
      totalTrips: 25,
      DOR: "2023-05-01",
      settings: "Options"
    },
    {
      name: "Jane Smith",
      phoneNumber: "987-654-3210",
      userPin: "4321",
      totalTrips: 30,
      DOR: "2023-04-21",
      settings: "Options"
    },
    {
      name: "Mike Johnson",
      phoneNumber: "456-789-1234",
      userPin: "5678",
      totalTrips: 18,
      DOR: "2023-06-11",
      settings: "Options"
    },
    {
      name: "Emily Davis",
      phoneNumber: "321-654-9870",
      userPin: "8765",
      totalTrips: 22,
      DOR: "2023-05-17",
      settings: "Options"
    },
    {
      name: "Chris Lee",
      phoneNumber: "654-321-9876",
      userPin: "9101",
      totalTrips: 35,
      DOR: "2023-06-25",
      settings: "Options"
    },
    {
      name: "Sophia Brown",
      phoneNumber: "789-123-4560",
      userPin: "2345",
      totalTrips: 27,
      DOR: "2023-07-04",
      settings: "Options"
    }
  ];
  
  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-2xl font-bold">Customers</h1>
      <div className="flex gap-4 ">
      <TextField
            variant="outlined"
            placeholder="Search for organisations"
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
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
              width: "30%",
              ".MuiOutlinedInput-input": {
                padding: "10px 16px 10px 0px",
              },
            }}
          />

        <CustomSelectDropdown
          // value={state}
          // onChange={handleStateChange}
          name="Sort by"
          options={["A-Z", "Z-A", ]}
        />
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
          Name
        </TableCell>
        <TableCell
          sx={{
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          Phone Number
        </TableCell>
        <TableCell
          sx={{
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          User PIN
        </TableCell>
        <TableCell
          sx={{
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          Total Trips
        </TableCell>
        <TableCell
          sx={{
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          DOR
        </TableCell>
        <TableCell align="right">
          <img src={settingsIcon} alt="settingsIcon" />
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {customers.map((customer, index) => (
        <TableRow key={index} onClick={() => onMenuItemClick("Customerinfo")}>
          <TableCell>
            <p className="font-redhat font-bold text-base">
              {customer.name}
            </p>
          </TableCell>
          <TableCell>
            <p className="font-redhat text-base font-semibold">
              {customer.phoneNumber}
            </p>
          </TableCell>
          <TableCell>
            <p className="font-redhat text-base font-semibold">
              {customer.userPin}
            </p>
          </TableCell>
          <TableCell>
            <p className="font-redhat text-base font-semibold">
              {customer.totalTrips}
            </p>
          </TableCell>
          <TableCell>
            <p className="font-redhat text-base font-semibold">
              {customer.DOR}
            </p>
          </TableCell>
          <TableCell>
            <IconButton >
            {/* onClick={(e) => handleMenuOpen(e, customer)} */}
              <MoreVert />
            </IconButton>
            <Menu
              // anchorEl={menuAnchor}
              // open={Boolean(menuAnchor)}
              // onClose={handleMenuClose}
            >
              <MenuItem 
              // onClick={handleEditCustomer}
              >Edit</MenuItem>
              <MenuItem 
              // onClick={handleRemoveCustomer}
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

export default Customer;
