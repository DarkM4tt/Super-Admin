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
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import BackArrow from "../../assets/leftArrowBlack.svg";
import PartnerIcon from "../../assets/partnerImage.png";
import SearchIcon from "@mui/icons-material/Search";
// import { formatCreatedAt } from "../../utils/dates";
import LoadingAnimation from "../common/LoadingAnimation";
import { formatCreatedAt } from "../../utils/dates";

const Drivers = ({ selectedOrgId, onDriverClick, setActiveComponent }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allDrivers, setAllDrivers] = useState([]);

  const getUrl = useCallback(() => {
    if (activeTab === 0) {
      return `${
        import.meta.env.VITE_API_AUTH_URL
      }/super-admin/all-drivers?page=1&limit=100&status=APPROVED&organization_id=${selectedOrgId}`;
    } else if (activeTab === 1) {
      return `${
        import.meta.env.VITE_API_AUTH_URL
      }/super-admin/all-drivers?page=1&limit=100&status=PENDING&organization_id=${selectedOrgId}`;
    } else if (activeTab === 2) {
      return `${
        import.meta.env.VITE_API_AUTH_URL
      }/super-admin/all-drivers?page=1&limit=100&status=NEW-REQUEST&organization_id=${selectedOrgId}`;
    } else if (activeTab === 3) {
      return `${
        import.meta.env.VITE_API_AUTH_URL
      }/super-admin/all-drivers?page=1&limit=100&status=ASSIGNED&organization_id=${selectedOrgId}`;
    } else {
      return `${
        import.meta.env.VITE_API_AUTH_URL
      }/super-admin/all-drivers?page=1&limit=100&status=REJECTED&organization_id=${selectedOrgId}`;
    }
  }, [activeTab, selectedOrgId]);

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
                    "Joined on",
                    "Total drivers",
                    "Total vehicles",
                    "Listing drivers",
                    status ? "Documents Status" : "Issues/queries",
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
                          <img src={PartnerIcon} alt="AppleIcon" />
                          {driver?.full_name || (
                            <p className="text-red-500">No name</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatCreatedAt(driver?.createdAt) || (
                          <p className="text-red-200">Unknown</p>
                        )}
                      </TableCell>
                      <TableCell>{driver?.email}</TableCell>
                      <TableCell>
                        {formatCreatedAt(driver?.last_login)}
                      </TableCell>
                      <TableCell>420</TableCell>
                      <TableCell>
                        <MoreHoriz />
                      </TableCell>
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
        {"> Partners"}
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
        onClick={() => setActiveComponent("PartnerInfo")}
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
        <Tab label="New requests (11)" />
      </Tabs>

      {loading ? (
        <LoadingAnimation height={500} width={500} />
      ) : (
        <>
          {activeTab === 0 && <DriversTable />}

          {activeTab === 1 && <DriversTable status="pending" />}

          {activeTab === 2 && <DriversTable status="new" />}

          {activeTab === 3 && <DriversTable status="assigned" />}

          {activeTab === 4 && <DriversTable status="rejected" />}
        </>
      )}
    </>
  );
};

export default Drivers;
