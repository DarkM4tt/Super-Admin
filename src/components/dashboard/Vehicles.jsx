import { useCallback, useEffect, useState } from "react";
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
import CustomSelectDropdown from "../common/CustomSelectDropdown";
import LoadingAnimation from "./../common/LoadingAnimation";
import vehiclesIcon from "../../assets/vehicle.svg";
import carImage from "../../assets/carImage.png";
import wrongIcon from "../../assets/wrongIcon.svg";
import infoYellow from "../../assets/infoYellow.svg";
import searchIcon from "../../assets/searchIcon.svg";
import settingsIcon from "../../assets/settingsIcon.svg";
import twoLeft from "../../assets/twoLeft.svg";
import oneLeft from "../../assets/oneLeft.svg";
import twoRight from "../../assets/twoRight.svg";
import redDot from "../../assets/redDot.svg";
import greenDot from "../../assets/greenDot.svg";
import organisatiologo from "../../assets/organisationlogo.jpeg";
import { useGetVehiclesdataQuery } from "../../features/Vehicle/vehicleSlice";

const ColorButton = styled(Button)(({ theme }) => ({
  fontFamily: "Red Hat Display, sans-serif",
}));

const Vehicles = ({ onVehicleClick , selectedVehicleId }) => {
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [fetchedVehicles, setFetchedVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [state, setState] = useState("");
  const [assignment, setAssignment] = useState("");
  const [documents, setDocuments] = useState("");
  // const [registration, setRegistration] = useState("");
  const [search, setSearch] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [addVehicleFormData, setAddVehicleFormData] = useState({
    registration_number: "",
    fleet_id: "",
    vin: "",
    brand_name: "",
    category_id: "",
    model: "",
    color: "",
    pet_friendly: false,
    jump_start: false,
    rental: false,
    hourly_charges: 0,
  });
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [imageFileName, setImageFileName] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [allornew, setallornew] = useState("All");
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

const { data: Vehicles, error:vehiclefetcherror, isLoading } = useGetVehiclesdataQuery();

  // const fetchVehiclesData = useCallback(async () => {
  //   const orgId = localStorage.getItem("org_id");
  //   const url = `https://boldrides.com/api/boldriders/organization/${orgId}/vehicles`;
  //   setLoading(true);
  //   setCategoryError(false);
  //   try {
  //     const res = await fetch(url);
  //     if (!res.ok) {
  //       setError("Error in fetching vehicles!");
  //       setLoading(false);
  //       return;
  //     }
  //     const response = await res.json();
  //     setFetchedVehicles(response.vehicles);
  //     setFilteredVehicles(response.vehicles);
  //   } catch (err) {
  //     setError(err || "An unexpected error occurred.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    if (Vehicles) {
      setFilteredVehicles(Vehicles.vehicles);
    }
  }, [Vehicles]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error in fetching vehicles!</p>;

  // const fetchVehicleCategories = useCallback(async () => {
  //   const orgId = localStorage.getItem("org_id");
  //   const url = `https://boldrides.com/api/boldriders/organization/${orgId}/vehicleCategories`;
  //   setLoading(true);
  //   setCategoryError(false);
  //   try {
  //     const res = await fetch(url);
  //     if (!res.ok) {
  //       setCategoryError(true);
  //       setLoading(false);
  //       return;
  //     }
  //     const response = await res.json();
  //     setVehicleCategories(response.categories);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchVehiclesData();
  //   fetchVehicleCategories();
  // }, [fetchVehiclesData, fetchVehicleCategories]);

  // const handleFilter = useCallback(() => {
  //   let filtered = fetchedVehicles;

  //   if (!showAll) {
  //     if (state) {
  //       filtered = filtered.filter((vehicle) => {
  //         const docs = vehicle?.documents || {};
  //         const docCount = Object.keys(docs).length;
  //         const approvedCount = Object.values(docs).filter(
  //           (doc) => doc.status === "APPROVED"
  //         ).length;

  //         if (state === "Active") {
  //           return docCount === 4 && approvedCount === 4;
  //         }
  //         if (state === "Inactive") {
  //           return !(docCount === 4 && approvedCount === 4);
  //         }
  //         return true;
  //       });
  //     }
  //     if (assignment) {
  //       assignment === "Not assigned"
  //         ? (filtered = filtered.filter(
  //             (vehicle) => vehicle?.assigned_driver_id === null
  //           ))
  //         : (filtered = filtered.filter(
  //             (vehicle) => vehicle?.assigned_driver_id !== null
  //           ));
  //     }
  //     if (documents) {
  //       filtered = filtered.filter((vehicle) => {
  //         const docs = vehicle?.documents || {};
  //         const docCount = Object.keys(docs).length;
  //         const approvedCount = Object.values(docs).filter(
  //           (doc) => doc.status === "APPROVED"
  //         ).length;
  //         const pendingCount = Object.values(docs).filter(
  //           (doc) => doc.status === "PENDING"
  //         ).length;

  //         if (documents === "Approved") {
  //           return docCount === 4 && approvedCount === 4;
  //         }
  //         if (documents === "Pending") {
  //           return pendingCount > 0;
  //         }
  //         if (documents === "Lacking") {
  //           return docCount < 4;
  //         }
  //         return true;
  //       });
  //     }
  //   }

  //   if (search) {
  //     const searchLower = search.toLowerCase();
  //     filtered = filtered.filter((vehicle) => {
  //       const yearStr = vehicle?.year?.toString().toLowerCase() || "";
  //       const modelStr = vehicle?.vehicle_model?.toLowerCase() || "";
  //       const vinStr = vehicle?.vin?.toLowerCase() || "";
  //       const makeStr = vehicle?.make?.toLowerCase() || "";

  //       return (
  //         yearStr.includes(searchLower) ||
  //         modelStr.includes(searchLower) ||
  //         vinStr.includes(searchLower) ||
  //         makeStr.includes(searchLower)
  //       );
  //     });
  //   }

  //   setFilteredVehicles(filtered);
  // }, [showAll, state, assignment, search, documents, fetchedVehicles]);

  // useEffect(() => {
  //   handleFilter();
  // }, [showAll, state, assignment, search, handleFilter]);

  const handleStateChange = (event) => {
    const value = event.target.value;
    setShowAll(false);
    setState((prev) => (prev === value ? "" : value));
  };
  const handleAssignmentChange = (event) => {
    const value = event.target.value;
    setShowAll(false);
    setAssignment((prev) => (prev === value ? "" : value));
  };
  const handleDocumentsChange = (event) => {
    const value = event.target.value;
    setShowAll(false);
    setDocuments((prev) => (prev === value ? "" : value));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)

    if(name==="hourly_charges"){
      setAddVehicleFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parseInt(value),
      }))
      return;
    }
    setAddVehicleFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddVehicle = async () => {
    setButtonLoading(true);
    const orgId = localStorage.getItem("org_id");

    if(addVehicleFormData.hourly_charges<1 && addVehicleFormData.rental){
      setAddError("Hourly Charges Should be greater than 1");
      setButtonLoading(false);
      return;
    }

    const payload = {
      ...addVehicleFormData,
      hourly_charges: addVehicleFormData.hourly_charges,
      vin: addVehicleFormData.vin.toUpperCase(),
    };

    if (payload.fleet_id.trim() === "") {
      delete payload.fleet_id;
    }


    try {
      const response = await fetch(
        `https://boldrides.com/api/boldriders/organization/${orgId}/createVehicle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        setAddError(
          (addVehicleFormData.fleet_id && "Fleet " + result.message) ||
            "Error in adding this vehicle."
        );
        setButtonLoading(false);
        return;
      }

      const result = await response.json();
      setShowAddVehicleModal(false);
      setAddVehicleFormData({
        registration_number: "",
        fleet_id: "",
        vin: "",
        brand_name: "",
        category_id: "",
        model: "",
        color: "",
        pet_friendly: false,
        jump_start: false,
        rental: false,
        hourly_charges: 0,
      });
      fetchVehiclesData();
    } catch (error) {
      setAddError(error.message || "An error occurred");
    } finally {
      setButtonLoading(false);
    }
  };

  const handleAllClick = () => {
    setShowAll(true);
    setState("");
    setAssignment("");
    setDocuments("");
    setSearch("");
    setFilteredVehicles(fetchedVehicles);
  };

  const handleMenuOpen = (event, vehicle) => {
    setMenuAnchor(event.currentTarget);
    setSelectedVehicle(vehicle);
  };

  const handleEditVehicle = () => {
    onVehicleClick(selectedVehicle?._id);
  };

  const handleRemoveVehicle = async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `https://boldrides.com/api/boldriders/organization/${orgId}/vehicle/`;
    setLoading(true);
    try {
      const response = await fetch(`${url}${selectedVehicle._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        setError("Error in deleting this vehicle");
        setLoading(false);
        return;
      }
      const result = await response.json();
      fetchVehiclesData();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      handleMenuClose();
    }
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedVehicle(null);
  };

  const getVerificationStatus = (documents) => {
    const totalDocs = 4;
    if (!documents || Object.keys(documents).length === 0) {
      return {
        status: false,
        notUploadedCount: totalDocs,
        pendingCount: 0,
        approvedCount: 0,
      };
    }

    const pendingCount = Object.values(documents).filter(
      (doc) => doc.status === "PENDING"
    ).length;
    const approvedCount = Object.values(documents).filter(
      (doc) => doc.status === "APPROVED"
    ).length;
    const notUploadedCount = totalDocs - Object.keys(documents).length;

    const allApproved = approvedCount === totalDocs;

    return {
      status: allApproved,
      notUploadedCount,
      pendingCount,
      approvedCount,
    };
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
        <h1 className="text-2xl font-bold">Vehicles</h1>
        {/* <Button
          variant="contained"
          startIcon={<img src={vehiclesIcon} alt="Add vehicle" />}
          sx={{
            backgroundColor: showAddVehicleModal ? "#BBBBBB" : "black",
            color: "white",
            textTransform: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: showAddVehicleModal ? "#BBBBBB" : "black",
            },
          }}
          onClick={() => {
            setCategoryError(false);
            setAddError(false);
            setShowAddVehicleModal((prevValue) => !prevValue);
          }}
        >
          Add vehicle
        </Button> */}
      </div>
      {/* {showAddVehicleModal && (
        <AddVehicle
          formData={addVehicleFormData}
          handleChange={handleChange}
          handleAddVehicle={handleAddVehicle}
          vehicleCategories={vehicleCategories}
          handleClose={() => {
            setCategoryError(false);
            setAddError(false);
            setShowAddVehicleModal((prevValue) => !prevValue);
          }}
          imageFileName={imageFileName}
          buttonLoading={buttonLoading}
          addError={addError}
          categoryError={categoryError}
        />
      )} */}
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
            onClick={handleAllClick}
          >
            All
          </Button>
          <CustomSelectDropdown
            value={state}
            onChange={handleStateChange}
            name="Organisation"
            options={["Active", "Inactive"]}
          />
          {/* <CustomSelectDropdown
            value={assignment}
            onChange={handleAssignmentChange}
            name="Assignment"
            options={["Assigned", "Not assigned"]}
          /> */}
          <CustomSelectDropdown
            value={documents}
            onChange={handleDocumentsChange}
            name="Documents"
            options={[
              "Approved",
              "Pending",
              "Lacking",
              "Rejected Documents",
              "About to expire",
            ]}
          />
        </div>
        <div className="flex space-x-4 h-10">
          {/* <CustomSelectDropdown
            value={registration}
            onChange={handleRegistrationChange}
            name="Registration"
            options={[
              "Approved",
              "Pending",
              "Lacking",
              "Rejected Documents",
              "About to expire",
            ]}
          /> */}
          <TextField
            variant="outlined"
            placeholder="Search for vehicles"
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
                padding: "10px 4px",
              },
            }}
          />
        </div>
      </div>
      {filteredVehicles?.length === 0 && (
        <p className="text-red-400 font-redhat text-xl p-4 font-bold">
          No vehicles added till now!
        </p>
      )}

<div className="flex gap-6">
        <div className={`pb-[6px] pr-3 ${allornew==="All"?"border-b-[3px] border-[#18C4B8]":""}`} onClick={()=>setallornew("All")}>
          <p className={`font-redhat font-bold text-base ${allornew!=="All"?"text-[#777777] font-normal":""}`}>All</p>
        </div>
        <div className={`pb-[6px] pr-3 ${allornew==="New"?"border-b-[3px] border-[#18C4B8]":""}`} onClick={()=>setallornew("New")}>
          <p className={`font-redhat font-bold text-base ${allornew!=="New"?"text-[#777777] font-normal":""}`}>New</p>
        </div>
      </div>

      {allornew==="All"?
      filteredVehicles?.length !== 0 && (
        <>
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
                    Vehicle/ID
                  </TableCell>
                  {/* <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    Status
                  </TableCell> */}
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    VIN and license plate
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
                    Active Status
                  </TableCell>
                  <TableCell align="right">
                    <img src={settingsIcon} alt="settingsIcon" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVehicles?.map((vehicle, index) => {
                  const documents = vehicle?.documents || {};
                  const { status, notUploadedCount, pendingCount } =
                    getVerificationStatus(documents);

                    console.log(vehicle.vehicle_id)

                  return (
                    <TableRow key={index} onClick={() => onVehicleClick(vehicle?.vehicle_id)}>
                      <TableCell >
                        <div className="flex items-center cursor-pointer">
                          <img src={carImage} alt="vehicle" className="mr-2" />
                          <p className="font-redHat font-bold text-base">
                            {vehicle?.year} {vehicle?.make}{" "}
                            {vehicle?.vehicle_model}
                          </p>
                        </div>
                      </TableCell>
                      {/* <TableCell>
                        {status ? (
                          <span className="flex gap-2">
                            <img src={greenDot} alt="greenDot" />
                            <p className="font-redhat text-base font-semibold">
                              Active
                            </p>
                          </span>
                        ) : (
                          <span className="flex gap-2">
                            <img src={redDot} alt="redDot" />
                            <p className="font-redhat text-base font-semibold">
                              Inactive
                            </p>
                          </span>
                        )}
                      </TableCell> */}
                      <TableCell>
                        <p className="font-redhat text-base font-semibold">
                          {vehicle?.vin}
                        </p>
                        <p className="font-redhat text-base font-semibold text-semiGray mt-1">
                          {vehicle?.licensePlate}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="font-redhat text-base font-semibold">
                          {
                          vehicle?.organization_name=== null
                            ? "Not assigned"
                            : vehicle.organization_name}
                        </p>
                      </TableCell>
                      <TableCell>
                        {!vehicle?.active ? (
                          <span className="flex gap-2">
                            <img src={greenDot} alt="greenDot" />
                            <p className="font-redhat text-base font-semibold">
                              Active
                            </p>
                          </span>
                        ) : (
                          <span className="flex gap-2">
                            <img src={redDot} alt="redDot" />
                            <p className="font-redhat text-base font-semibold">
                              Inactive
                            </p>
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={(e) => handleMenuOpen(e, vehicle)}>
                          <MoreVert />
                        </IconButton>
                        <Menu
                          anchorEl={menuAnchor}
                          open={Boolean(menuAnchor)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleEditVehicle}>Edit</MenuItem>
                          <MenuItem onClick={handleRemoveVehicle}>
                            Remove
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
        </>
     ):<>
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
      
    </div>
  );
};

export default Vehicles;
