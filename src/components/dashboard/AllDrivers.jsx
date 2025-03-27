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
  Avatar,
} from "@mui/material";
import BackArrow from "../../assets/leftArrowBlack.svg";
import SearchIcon from "@mui/icons-material/Search";
import LoadingAnimation from "../common/LoadingAnimation";
import wrongIcon from "../../assets/wrongIcon.svg";
import infoYellow from "../../assets/infoYellow.svg";

const AllDrivers = ({
  onDriverClick,
  setActiveComponent,
  handleDriverAcceptClick,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allDrivers, setAllDrivers] = useState([]);

  const getUrl = useCallback(() => {
    if (activeTab === 0) {
      return `${
        import.meta.env.VITE_API_AUTH_URL
      }/super-admin/all-drivers?page=1&limit=100&status=APPROVED`;
    } else if (activeTab === 1) {
      return `${
        import.meta.env.VITE_API_AUTH_URL
      }/super-admin/all-drivers?page=1&limit=100&status=PENDING`;
    } else if (activeTab === 2) {
      return `${
        import.meta.env.VITE_API_AUTH_URL
      }/super-admin/all-drivers?page=1&limit=100&status=NEW-REQUEST`;
    } else if (activeTab === 3) {
      return `${
        import.meta.env.VITE_API_AUTH_URL
      }/super-admin/all-drivers?page=1&limit=100&is_vehicle=true`;
    } else {
      return `${
        import.meta.env.VITE_API_AUTH_URL
      }/super-admin/all-drivers?page=1&limit=100&status=REJECTED`;
    }
  }, [activeTab]);

  const fetchDrivers = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(getUrl(), {
        method: "GET",
        credentials: "include",
      });
      const result = await res?.json();
      if (result?.success) {
        setAllDrivers(result?.drivers?.results);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [getUrl]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers, activeTab]);

  const NewDriverRequestCard = ({ driverDetails }) => {
    return (
      <div className="bg-white mt-4 rounded-md py-4 pr-6 pl-10 mb-4 relative border-b-[1px] border-[#344BFD]">
        {/* Vehicle Details */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            {driverDetails?.profile_pic ? (
              <img src={driverDetails?.profile_pic} alt="OrgBig" width={70} />
            ) : (
              <Avatar
                sx={{ width: "5rem", height: "5rem", borderRadius: "50%" }}
              >
                {driverDetails?.full_name?.charAt(0)}
              </Avatar>
            )}
            <div>
              <p className="text-lg font-redhat font-bold">
                {driverDetails?.full_name || "No name"}
              </p>
              <p className="text-base font-redhat font-medium text-gray">
                {driverDetails?.username}
              </p>
            </div>
          </div>

          {/* Signed Up On */}
          <div className="flex flex-col">
            <p className="text-lg font-redhat font-bold">Contact info:</p>
            <p className="text-base font-redhat font-medium text-gray">
              Mobile: {driverDetails?.phone || "Not provided!"}
            </p>
            <p className="text-base font-redhat font-medium text-gray">
              Email: {driverDetails?.email}
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
            onClick={() => handleDriverAcceptClick(driverDetails?._id)}
          >
            Accept and review
          </Button>
        </div>
      </div>
    );
  };

  const DriversTable = ({ status }) => {
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
        {allDrivers?.length > 0 ? (
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
                    "Organization",
                    "Assigned vehicle",
                    "Total trips",
                    "Customer rating",
                    status && status !== "assigned"
                      ? "Documents Status"
                      : "Issues/queries",
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
                {allDrivers.map((driver) => {
                  return (
                    <TableRow
                      key={driver?._id}
                      onClick={() => onDriverClick(driver?._id)}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {driver?.profile_pic && (
                            <img
                              src={driver?.profile_pic}
                              className="w-8 h-8 rounded-full"
                              alt="driver-image"
                            />
                          )}
                          {driver?.full_name || (
                            <p className="text-red-500">No name</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {driver?.organization_name || (
                          <p className="text-red-400">Not added yet!</p>
                        )}
                      </TableCell>
                      <TableCell>
                        {driver?.vehicle || (
                          <p className="text-red-400">Not assigned yet!</p>
                        )}
                      </TableCell>
                      <TableCell>{driver?.total_rides || 0}</TableCell>
                      <TableCell>
                        {driver?.rating ? driver?.rating + "/5" : 0}
                      </TableCell>
                      {status && status !== "assigned" ? (
                        <TableCell>
                          <div className="flex w-full justify-center items-center">
                            {driver?.rejected_documents > 0 && (
                              <span
                                className={`bg-[#f9ecea] pl-4 pr-2 py-2 ${
                                  driver?.pending_documents > 0
                                    ? "rounded-l-2xl"
                                    : "rounded-2xl"
                                } text-[#D40038] flex items-center`}
                              >
                                <img
                                  src={wrongIcon}
                                  alt="wrongIcon"
                                  className="mr-1"
                                />
                                <p>{driver?.rejected_documents}</p>
                              </span>
                            )}
                            {driver?.pending_documents > 0 && (
                              <span
                                className={`bg-[#f9ecea] pl-2 pr-4 py-2 ${
                                  driver?.rejected_documents > 0
                                    ? "rounded-r-2xl"
                                    : "rounded-2xl"
                                } text-[#C07000] flex items-center`}
                              >
                                <img
                                  src={infoYellow}
                                  alt="infoYellow"
                                  className="mr-1"
                                />
                                <p>{driver?.pending_documents}</p>
                              </span>
                            )}
                            {driver?.total_documents === 9 &&
                              driver?.verified_documents === 9 && (
                                <p className="text-green-400 font-bold">
                                  Approved
                                </p>
                              )}
                            {driver?.total_documents < 9 &&
                              driver?.total_documents > 0 &&
                              driver?.pending_documents === 0 &&
                              driver?.rejected_documents === 0 && (
                                <p className="text-red-400 font-bold">
                                  {9 - driver?.total_documents} not uploaded!
                                </p>
                              )}
                            {driver?.total_documents === 0 && (
                              <p className="text-red-400 font-bold">
                                Not Uploaded!
                              </p>
                            )}
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell>{driver?.issue_raised || 0}</TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : status ? (
          <p className="text-lg text-red-400 font-bold">No {status} drivers!</p>
        ) : (
          <p className="text-lg text-red-400 font-bold">
            No drivers approved yet!
          </p>
        )}
      </Box>
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
      {/* Partners Heading */}
      <div className="flex justify-between items-center font-redhat text-base font-semibold mb-8">
        {"> Dashboard > All Drivers"}
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
        List of drivers
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
        <Tab label="All drivers" />
        <Tab label="Pending drivers" />
        <Tab label="New requests" />
        <Tab label="Assigned" />
        <Tab label="Rejected" />
      </Tabs>

      {loading ? (
        <LoadingAnimation height={500} width={500} />
      ) : (
        <>
          {activeTab === 0 && <DriversTable />}

          {activeTab === 1 && <DriversTable status="pending" />}

          {activeTab === 2 && (
            <>
              {allDrivers?.length > 0 ? (
                allDrivers?.map((driver) => (
                  <NewDriverRequestCard
                    key={driver?._id}
                    driverDetails={driver}
                  />
                ))
              ) : (
                <p className="text-lg text-red-400 font-bold mt-8 bg-white p-2">
                  No new drivers!
                </p>
              )}
            </>
          )}

          {activeTab === 3 && <DriversTable status="assigned" />}

          {activeTab === 4 && <DriversTable status="rejected" />}
        </>
      )}
    </>
  );
};

export default AllDrivers;
