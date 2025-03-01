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
import SearchIcon from "@mui/icons-material/Search";
import LoadingAnimation from "../common/LoadingAnimation";

const Vehicles = ({ selectedOrgId, onVehicleClick, setActiveComponent }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allVehicles, setAllVehicles] = useState([]);

  const getUrl = useCallback(() => {
    if (activeTab === 0) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-vehicles?page=1&limit=100&organization_id=${selectedOrgId}`;
    } else if (activeTab === 1) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-vehicles?page=1&limit=100&status=PENDING&organization_id=${selectedOrgId}`;
    } else if (activeTab === 2) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-vehicles?page=1&limit=100&status=NEW-REQUEST&organization_id=${selectedOrgId}`;
    } else {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-organizations?page=1&limit=100&is_active=true&organization_id=${selectedOrgId}`;
    }
  }, [activeTab, selectedOrgId]);

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
        setAllVehicles(result?.vehicles?.results);
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
    fetchVehicles();
  }, [fetchVehicles, activeTab]);

  const VehiclesTable = ({ pending }) => {
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
                    "Vehicle brand",
                    "Colour",
                    "Vehicle number",
                    "Status",
                    "Seats",
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
                {allVehicles.map((vehicle) => (
                  <TableRow
                    key={vehicle?._id}
                    onClick={() => onVehicleClick(vehicle?.id)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>
                      {vehicle?.brand_name} {vehicle?.vehicle_model}
                    </TableCell>
                    <TableCell>{vehicle?.color || "Null"}</TableCell>
                    <TableCell>{vehicle?.vin || "Null"}</TableCell>
                    <TableCell>
                      {vehicle?.is_active ? (
                        <p className="text-green-400">Active</p>
                      ) : (
                        <p className="text-red-400">Inactive</p>
                      )}
                    </TableCell>
                    <TableCell>{vehicle?.seats}</TableCell>
                    <TableCell>
                      <MoreHoriz />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : pending ? (
          <p className="text-lg text-red-400 font-bold">No pending vehicles!</p>
        ) : (
          <p className="text-lg text-red-400 font-bold">
            No vehicles added up yet!
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

  console.log(allVehicles);

  return (
    <>
      {/* Vehicles Heading */}
      <div className="flex justify-between items-center font-redhat text-base font-semibold mb-8">
        {"> Vehicles"}
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
        ABC Company Ltd &gt;&gt; List of vehicles
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
        <Tab label="Active" />
      </Tabs>

      {loading ? (
        <LoadingAnimation height={500} width={500} />
      ) : (
        <>
          {activeTab === 0 && <VehiclesTable pending={false} />}

          {activeTab === 1 && <VehiclesTable pending={true} />}

          {activeTab === 2 && <VehiclesTable pending={true} />}

          {activeTab === 3 && <VehiclesTable pending={true} />}
        </>
      )}
    </>
  );
};

export default Vehicles;
