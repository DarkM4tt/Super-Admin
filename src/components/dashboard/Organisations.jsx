/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Menu,
  InputAdornment,
  styled
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import searchIcon from "../../assets/searchIcon.svg";
import settingsIcon from "../../assets/settingsIcon.svg";
import twoLeft from "../../assets/twoLeft.svg";
import oneLeft from "../../assets/oneLeft.svg";
import twoRight from "../../assets/twoRight.svg";
import CustomSelectDropdown from "../common/CustomSelectDropdown";
// import RideModal from "./RideModal";
import wrongIcon from "../../assets/wrongIcon.svg";
import infoYellow from "../../assets/infoYellow.svg";
import LoadingAnimation from "../common/LoadingAnimation";
import addorganisationbtn from "../../assets/superadminwhiteorganisation.svg"
import organisatiologo from "../../assets/organisationlogo.jpeg";


const ColorButton = styled(Button)(({ theme }) => ({
  fontFamily: "Red Hat Display, sans-serif",
}));

const Organisation = ({ onMenuItemClick}) => {
  const [showAddFleetModal, setShowAddFleetModal] = useState(false);
  const [allRides, setAllRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([{
      name: "Reliance Industries Ltd.",
      totalVehicles: 100,
      totalDrivers: 80,
      DOR: "01/01/2024", // Assuming it's a date of registration
      verificationStatus: { errors: 1, warnings: 4 }
    },
    {
      name: "Reliance Industries Ltd.",
      totalVehicles: 150,
      totalDrivers: 120,
      DOR: "15/03/2024",
      verificationStatus: { errors: 0, warnings: 0 }
    },
    {
      name: "Reliance Industries Ltd.",
      totalVehicles: 200,
      totalDrivers: 180,
      DOR: "20/05/2024",
      verificationStatus: { errors: 0, warnings: 0 }
    },
    {
      name: "Reliance Industries Ltd.",
      totalVehicles: 50,
      totalDrivers: 45,
      DOR: "10/07/2024",
      verificationStatus: { errors: 1, warnings: 4 }
    }
  ]);
  const [showAll, setShowAll] = useState(true);
  const [state, setState] = useState("");
  const [current, setCurrent] = useState("");
  const [search, setSearch] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addresses, setAddresses] = useState({});
  const [fromandtolocation, setfromandtoloaction] = useState(null);
  const [notUploadedCount, setnotUploadedCount] = useState(2);
  const [pendingCount, setpendingCount] = useState(3);
  const [allornew, setallornew] = useState("All")
  const navigate = useNavigate();


  const getAddress = useCallback(async (latitude, longitude, rideId, type) => {
    const apiKey = "AIzaSyADUMklpWkHyXBGAWiMIXS5-dseLt5Q314";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        setAddresses((prev) => ({
          ...prev,
          [rideId]: {
            ...prev[rideId],
            [type]: data.results[0].formatted_address,
          },
        }));
      } else {
        setAddresses((prev) => ({
          ...prev,
          [rideId]: {
            ...prev[rideId],
            [type]: "Unable to fetch address",
          },
        }));
      }
    } catch (error) {
      setAddresses((prev) => ({
        ...prev,
        [rideId]: {
          ...prev[rideId],
          [type]: "Error fetching data",
        },
      }));
    }
  }, []);

  const handleRide = (rideId) => {
    // Assuming you want to navigate to a page based on the ride ID
    onMenuItemClick("Organisationinfo")
  };


  // const fetchRidesData = useCallback(async () => {
  //   const orgId = localStorage.getItem("org_id");
  //   const url = `https://boldrides.com/api/boldriders/organization/${orgId}/getallRides`;
  //   setLoading(true);
  //   try {
  //     const res = await fetch(url);
  //     if (!res.ok) {
  //       setError("Error in fetching vehicles!");
  //       setLoading(false);
  //       return;
  //     }
  //     const response = await res.json();
  //     setAllRides(response.rides);
  //     setFilteredRides(response.rides);

  //     // Fetch addresses for all rides
  //     response.rides.forEach((ride) => {
  //       if (ride.pickup_location) {
  //         getAddress(
  //           ride.pickup_location.latitude,
  //           ride.pickup_location.longitude,
  //           ride._id,
  //           "pickup"
  //         );
  //       }
  //       if (ride.dropoff_location) {
  //         getAddress(
  //           ride.dropoff_location.latitude,
  //           ride.dropoff_location.longitude,
  //           ride._id,
  //           "dropoff"
  //         );
  //       }
  //     });
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [getAddress]);

  // useEffect(() => {
  //   fetchRidesData();
  // }, [fetchRidesData]);

  const handleFilter = useCallback(() => {
    let filtered = allRides;

    if (!showAll) {
      if (state) {
        filtered = filtered.filter((ride) => {
          return ride?.status.toLowerCase() === state.toLowerCase();
        });
      }
      if (current) {
        console.log(current);
      }
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((ride) => {
        return ride?.driver_id?.full_name.toLowerCase() === searchLower;
      });
    }

    setFilteredRides(filtered);
  }, [showAll, state, current, search, allRides]);

  // useEffect(() => {
  //   handleFilter();
  // }, [showAll, state, current, search, handleFilter]);

  const handleStateChange = (event) => {
    setShowAll(false);
    const value = event.target.value;
    setState((prev) => (prev === value ? "" : value));
  };
  const handleCurrentChange = (event) => {
    setShowAll(false);
    const value = event.target.value;
    setCurrent((prev) => (prev === value ? "" : value));
  };

  const handleMenuOpen = (event, rideId) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRideId(rideId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRideId(null);
  };

  const handleRideClick = (rideId) => {
    setSelectedRideId(rideId);
    setfromandtoloaction({
      fromlocation: addresses[rideId]?.pickup,
      tolocation: addresses[rideId]?.dropoff,
    });
  };

  const handleAllClick = () => {
    setShowAll(true);
    setState("");
    setSearch("");
    setFilteredRides(allRides);
  };

  const getStatus = (status) => {
    if (status === "ACCEPTED") {
      return <p className="font-normal text-sm text-green-500">Accepted</p>;
    } else if (status === "FINISHED") {
      return <p className="font-normal text-sm text-green-500">Finished</p>;
    } else if (status === "CANCELED") {
      return <p className="font-normal text-sm text-[]">Canceled</p>;
    } else if (status === "REQUESTING") {
      return <p className="font-normal text-sm text-[]">Requesting</p>;
    } else if (status === "ONROUTE") {
      return <p className="font-normal text-sm text-green-500">Onroute</p>;
    } else {
      return <p className="font-normal text-sm text-[]">Waiting</p>;
    }
  };


  const truncateAddress = (address, wordLimit = 7) => {
    const words = address.split(" ");
    if (words.length <= wordLimit) return address;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  if (loading) {
    return (
      <div className="mx-auto w-full h-full ">
        <LoadingAnimation height={500} width={500} />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-red-400 text-3xl p-4 font-bold">{error}</h1>;
  }

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Organization</h1>
      <Button
          variant="contained"
          startIcon={<img src={addorganisationbtn} className="text-white" alt="Add vehicle" />}
          sx={{
            backgroundColor: showAddFleetModal ? "#BBBBBB" : "black",
            color: "white",
            textTransform: "none",
            padding: "12px 24px",
            fontWeight:"600",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: showAddFleetModal ? "#BBBBBB" : "black",
            },
          }}
        >
          Add organisation
        </Button>
        </div>
      <div className="flex justify-between">
        <div className="flex space-x-4 h-10">
          <Button
            variant={showAll ? "contained" : "outlined"}
            sx={{
              border: "none",
              textTransform: "none",
              fontWeight: "600",
              backgroundColor: showAll ? "black" : "#EEEEEE",
              color: showAll ? "white" : "black",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: showAll ? "black" : "#EEEEEE",
                border: "none",
              },
            }}
            onClick={handleAllClick}
          >
            All
          </Button>
          <CustomSelectDropdown
            value={state}
            onChange={handleStateChange}
            name="Status"
            options={[
              "Waiting",
              "Canceled",
              "Accepted",
              "Finished",
              "Onroute",
              "Requesting",
            ]}
          />
          {/* <CustomSelectDropdown
            value={current}
            onChange={handleCurrentChange}
            name="Current"
            options={["Assigned", "Not assigned"]}
          /> */}
        </div>
        <div className="flex space-x-4 ">
          <TextField
            variant="outlined"
            placeholder="Search for organisations"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                padding: "10px 16px 10px 0px",
              },
            }}
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div className={`pb-[6px] pr-3 ${allornew==="All"?"border-b-[3px] border-[#18C4B8]":""}`} onClick={()=>setallornew("All")}>
          <p className={`font-redhat font-bold text-base ${allornew!=="All"?"text-[#777777] font-normal":""}`}>All</p>
        </div>
        <div className={`pb-[6px] pr-3 ${allornew==="New"?"border-b-[3px] border-[#18C4B8]":""}`} onClick={()=>setallornew("New")}>
          <p className={`font-redhat font-bold text-base ${allornew!=="New"?"text-[#777777] font-normal":""}`}>New</p>
        </div>
      </div>
     {allornew==="All"?<TableContainer>
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
                Total Vehicles
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                Total Drivers
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                DOR
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                Verification status
              </TableCell>
              <TableCell align="left">
                <img src={settingsIcon} alt="settingsIcon" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRides.map((ride, index) => {
              console.log(ride)
             return <TableRow
                // onClick={(e) => handleRideClick(ride?._id)}
                onClick={() => handleRide()}
                key={index}
                sx={{ cursor: "pointer" }}
              >
                <TableCell >
                  <p className="font-bold text-base">{ride.name}</p>
                </TableCell>
                <TableCell>
                  <p className="font-bold text-base">{ride.totalVehicles}</p>
                </TableCell>
                <TableCell>
                  <p className="font-bold text-base">
                    {ride.totalDrivers}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-semibold text-base">
                    {ride.DOR}
                  </p>
                </TableCell>
                
                <TableCell align="left">
                        {false ? (
                          <span className="bg-[#e6f7e6] px-4 py-2 rounded-2xl text-[#28a745]">
                            Approved
                          </span>
                        ) : (
                          <div className="flex">
                            {notUploadedCount > 0 && (
                              <span
                                className={`bg-[#f9ecea] pl-4 pr-2 py-2 ${
                                  pendingCount > 0
                                    ? "rounded-l-2xl"
                                    : "rounded-2xl"
                                } text-[#D40038] flex items-center`}
                              >
                                <img
                                  src={wrongIcon}
                                  alt="wrongIcon"
                                  className="mr-1"
                                />
                                <p>{notUploadedCount}</p>
                              </span>
                            )}
                            {pendingCount > 0 && (
                              <span
                                className={`bg-[#f9ecea] pl-2 pr-4 py-2 ${
                                  notUploadedCount > 0
                                    ? "rounded-r-2xl"
                                    : "rounded-2xl"
                                } text-[#C07000] flex items-center`}
                              >
                                <img
                                  src={infoYellow}
                                  alt="infoYellow"
                                  className="mr-1"
                                />
                                <p>{pendingCount}</p>
                              </span>
                            )}
                          </div>
                        )}
                      </TableCell>
                <TableCell align="left">
                  <IconButton style={{marginLeft:"-10px"}} >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    
                  >
                    <MenuItem >Option 1</MenuItem>
                    <MenuItem >Option 2</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
})}
          </TableBody>
        </Table>
      </TableContainer>:<>
      {filteredRides.map((org)=>{
       return <div className="py-6 border-b border-[#DDDDDD] flex justify-between items-center " onClick={()=>onMenuItemClick("Neworganisationinfo")}>
           <div className="flex gap-3 ">
              <img
                src={organisatiologo}
                alt=""
                className="w-[80px] rounded-full"
              />
              <div className="flex flex-col justify-between py-1">
                {" "}
                <p className="font-bold text-base font-redhat ">{org.name}</p>
                <p className="font-bold text-base font-redhat">
                  Driver: {org.totalDrivers}
                </p>
                <p className="font-bold text-base font-redhat">
                Vehicles: {org.totalVehicles}
                </p>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-3">
          <ColorButton
            variant="contained"
            sx={{
              backgroundColor: "black",
              fontWeight: 600,
              color: "white",
              fontFamily: "Red Hat Display, sans-serif",
              textTransform: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
            // onClick={handleSubmit}
          >
            Approve
          </ColorButton>
          <ColorButton
            className="text-xs md:text-sm lg:text-base"
            variant="contained"
            sx={{
              backgroundColor: "#EEEEEE",
              fontWeight: 600,
              color: "black",
              textTransform: "none",
              padding: "12px 16px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#EEEEEE",
              },
            }}
            // onClick={handleReset}
          >
            Decline
          </ColorButton>
        </div>
        </div>
      })}
      </>}
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

export default Organisation;
