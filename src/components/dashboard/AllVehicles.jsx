/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import wrongIcon from "../../assets/wrongIcon.svg";
import infoYellow from "../../assets/infoYellow.svg";
import BackArrow from "../../assets/leftArrowBlack.svg";
import SearchIcon from "@mui/icons-material/Search";
import LoadingAnimation from "../common/LoadingAnimation";
import { formatCreatedAt } from "../../utils/dates";

const AllVehicles = ({
  onVehicleClick,
  handleAcceptClick,
  setActiveComponent,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allVehicles, setAllVehicles] = useState([]);

  const getUrl = useCallback(() => {
    if (activeTab === 0) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-vehicles?page=1&limit=100&status=APPROVED`;
    } else if (activeTab === 1) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-vehicles?page=1&limit=100&status=PENDING`;
    } else if (activeTab === 2) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-vehicles?page=1&limit=100&status=NEW-REQUEST`;
    } else if (activeTab === 3) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/get-all-vehicle-assignments?page=1&limit=100&is_active=true`;
    } else {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-vehicles?page=1&limit=100&status=REJECTED`;
    }
  }, [activeTab]);

  const fetchVehicles = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(getUrl(), {
        method: "GET",
        credentials: "include",
      });
      const result = await res?.json();
      if (result?.success) {
        activeTab === 3
          ? setAllVehicles(result?.assignments?.results)
          : setAllVehicles(result?.vehicles?.results);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [getUrl, activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles, activeTab]);

  const VehiclesTable = ({ status }) => {
    return (
      <Box
        sx={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {allVehicles?.length > 0 ? (
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
                    "Vehicle model",
                    "Organization",
                    "Plate number",
                    "Added on",
                    status === "assigned" ? "Assigned Driver" : "Seats",
                    status && status !== "assigned"
                      ? "Documents Status"
                      : "Color",
                  ].map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Table Body */}
              {status === "assigned" ? (
                <AssignedVehiclesTableBody />
              ) : (
                <TableBody
                  sx={{
                    "& .MuiTableCell-root": {
                      fontWeight: "600",
                      fontSize: "16px",
                    },
                  }}
                >
                  {allVehicles.map((vehicle) => {
                    return (
                      <TableRow
                        key={vehicle?._id}
                        onClick={() => onVehicleClick(vehicle?._id)}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <TableCell>
                          {vehicle?.vehicle_model
                            ? `${vehicle?.vehicle_model} ${vehicle?.brand_name}`
                            : "Not provided!"}
                        </TableCell>
                        <TableCell>
                          {vehicle?.organization_id?.full_name ||
                            "Not added yet!"}
                        </TableCell>
                        <TableCell>{vehicle?.vin || "Null"}</TableCell>
                        <TableCell>
                          {formatCreatedAt(vehicle?.createdAt) ||
                            "Not provided!"}
                        </TableCell>
                        <TableCell>
                          {vehicle?.seats || "Not provided!"}
                        </TableCell>
                        {status ? (
                          <TableCell>
                            <div className="flex w-full justify-center items-center">
                              {vehicle?.rejected_documents > 0 && (
                                <span
                                  className={`bg-[#f9ecea] pl-4 pr-2 py-2 ${
                                    vehicle?.pending_documents > 0
                                      ? "rounded-l-2xl"
                                      : "rounded-2xl"
                                  } text-[#D40038] flex items-center`}
                                >
                                  <img
                                    src={wrongIcon}
                                    alt="wrongIcon"
                                    className="mr-1"
                                  />
                                  <p>{vehicle?.rejected_documents}</p>
                                </span>
                              )}
                              {vehicle?.pending_documents > 0 && (
                                <span
                                  className={`bg-[#f9ecea] pl-2 pr-4 py-2 ${
                                    vehicle?.rejected_documents > 0
                                      ? "rounded-r-2xl"
                                      : "rounded-2xl"
                                  } text-[#C07000] flex items-center`}
                                >
                                  <img
                                    src={infoYellow}
                                    alt="infoYellow"
                                    className="mr-1"
                                  />
                                  <p>{vehicle?.pending_documents}</p>
                                </span>
                              )}
                              {vehicle?.total_documents === 4 &&
                                vehicle?.verified_documents === 4 && (
                                  <p className="text-green-400 font-bold">
                                    Approved
                                  </p>
                                )}
                              {vehicle?.total_documents < 4 &&
                                vehicle?.total_documents > 0 && (
                                  <p className="text-red-400 font-bold">
                                    {4 - vehicle?.total_documents} not uploaded!
                                  </p>
                                )}
                              {vehicle?.total_documents === 0 && (
                                <p className="text-red-400 font-bold">
                                  Not Uploaded!
                                </p>
                              )}
                            </div>
                          </TableCell>
                        ) : (
                          <TableCell>
                            {vehicle?.color || "Not provided!"}
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        ) : status ? (
          <p className="text-lg text-red-400 font-bold">
            No {status} vehicles!
          </p>
        ) : (
          <p className="text-lg text-red-400 font-bold">
            No vehicles approved yet!
          </p>
        )}
      </Box>
    );
  };

  const AssignedVehiclesTableBody = () => {
    return (
      <TableBody
        sx={{
          "& .MuiTableCell-root": {
            fontWeight: "600",
            fontSize: "16px",
          },
        }}
      >
        {allVehicles.map((vehicle) => (
          <TableRow
            key={vehicle?._id}
            onClick={() => onVehicleClick(vehicle?.vehicle_id?._id)}
            sx={{
              cursor: "pointer",
            }}
          >
            <TableCell>
              {vehicle?.vehicle_id?.vehicle_model
                ? `${vehicle?.vehicle_id?.vehicle_model} ${vehicle?.vehicle_id?.brand_name}`
                : "Not provided!"}
            </TableCell>
            <TableCell>
              {vehicle?.vehicle_id?.organization_id?.full_name ||
                "Not added yet!"}
            </TableCell>
            <TableCell>{vehicle?.vehicle_id?.vin || "Null"}</TableCell>
            <TableCell>
              {vehicle?.vehicle_id?.createdAt
                ? formatCreatedAt(vehicle?.vehicle_id?.createdAt)
                : "Not provided!"}
            </TableCell>
            <TableCell>
              {vehicle?.driver?.full_name || "Not assigned yet!"}
            </TableCell>
            <TableCell>
              {vehicle?.vehicle_id?.color || "Not provided!"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const NewVehicleRequestCard = ({ vehicleDetails }) => {
    return (
      <div className="bg-white mt-4 rounded-md py-4 pr-6 pl-10 mb-4 relative border-b-[1px] border-[#344BFD]">
        {/* Vehicle Details */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <img src={vehicleDetails?.vehicle_image} alt="OrgBig" width={70} />
            <div>
              <p className="text-lg font-redhat font-bold">Vehicle Name</p>
              <p className="text-base font-redhat font-medium text-gray">
                {vehicleDetails?.brand_name} {vehicleDetails?.vehicle_model}
              </p>
            </div>
          </div>

          {/* TVDE */}
          <div className="flex flex-col">
            <p className="text-lg font-redhat font-bold">TVDE Applicable</p>
            <p className="text-base font-redhat font-bold">
              Yes : <span className="text-gray font-semibold">Until</span> : 22
              - 01 - 2027
            </p>
          </div>

          {/* Signed Up On */}
          <div className="flex flex-col">
            <p className="text-lg font-redhat font-bold">Organisation</p>
            <p className="text-base font-redhat font-medium text-gray">
              ABC Company Ltd
            </p>
            <p className="text-base font-redhat font-medium text-gray">
              Status:{" "}
              <span className="text-boldCyan font-semibold">Approved</span>
            </p>
          </div>

          {/* Action Button */}
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: "600",
              borderColor: "#000",
              color: "#000",
              borderRadius: "10px",
              paddingInline: "30px",
              "&:hover": {
                borderColor: "#000",
                backgroundColor: "rgba(0,0,0,0.05)",
              },
            }}
            onClick={() => handleAcceptClick(vehicleDetails?._id, "vehicle")}
          >
            Accept and review
          </Button>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <p className="text-lg text-red-400 font-bold">
        {error.message || "Error"}
      </p>
    );
  }

  return (
    <>
      {/* AllVehicles Heading */}
      <div className="flex justify-between items-center font-redhat text-base font-semibold mb-8">
        {"> Dashboard > Vehicles"}
        <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>

      <img
        src={BackArrow}
        alt="BackArrow"
        className="mb-4 cursor-pointer"
        onClick={() => setActiveComponent("Dashboard")}
      />

      {/* Manage Heading */}
      <Box sx={{ fontSize: "24px", fontWeight: "500", marginBottom: "20px" }}>
        List of vehicles
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          borderBottom: "1px solid #d3d3d3",
          width: "fit-content",
          ".MuiTab-root": {
            textTransform: "none",
            fontWeight: 500,
            color: "#9e9e9e",
          },
          ".Mui-selected": { color: "#1976d2", fontWeight: "bold" },
          ".MuiTabs-indicator": { backgroundColor: "#1976d2" },
        }}
      >
        <Tab label="All vehicles" />
        <Tab label="Pending vehicles" />
        <Tab label="New requests" />
        <Tab label="Assigned vehicles" />
        <Tab label="Rejected vehicles" />
      </Tabs>

      {loading ? (
        <LoadingAnimation height={500} width={500} />
      ) : (
        <>
          {activeTab === 0 && <VehiclesTable />}

          {activeTab === 1 && <VehiclesTable status="pending" />}

          {activeTab === 2 && (
            <>
              {allVehicles?.length > 0 ? (
                allVehicles?.map((vehicle) => (
                  <NewVehicleRequestCard
                    key={vehicle?._id}
                    vehicleDetails={vehicle}
                  />
                ))
              ) : (
                <p className="text-lg text-red-400 font-bold mt-4 bg-white p-2">
                  No new vehicles!
                </p>
              )}
            </>
          )}

          {activeTab === 3 && <VehiclesTable status="assigned" />}

          {activeTab === 4 && <VehiclesTable status="rejected" />}
        </>
      )}
    </>
  );
};

export default AllVehicles;
