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
import SearchIcon from "@mui/icons-material/Search";
import PartnerIcon from "../../assets/partnerImage.png";
import { formatCreatedAt } from "../../utils/dates";
import LoadingAnimation from "../common/LoadingAnimation";

const Partners = ({ onPartnerClick }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allPartners, setAllPartners] = useState([]);

  const getUrl = useCallback(() => {
    if (activeTab === 0) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-organizations?page=1&limit=100`;
    } else if (activeTab === 1) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-organizations?page=1&limit=100&status=PENDING`;
    } else {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-organizations?page=1&limit=100&status=NEW-REQUEST`;
    }
  }, [activeTab]);

  const fetchPartners = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(getUrl(), {
        method: "GET",
        credentials: "include",
      });
      const result = await res?.json();
      if (result?.success) {
        setAllPartners(result?.organizations?.results);
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
    fetchPartners();
  }, [fetchPartners, activeTab]);

  const PartnersTable = (pending) => {
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
        {allPartners?.length > 0 ? (
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
                    "ID",
                    "Name",
                    "Operating since",
                    "Total drivers",
                    "Total vehicles",
                    "Listing drivers",
                    "Issues/queries",
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
                {allPartners.map((org, idx) => (
                  <TableRow
                    key={org?._id}
                    onClick={() => onPartnerClick(org?._id)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img src={PartnerIcon} alt="AppleIcon" />
                        {org?.full_name || (
                          <p className="text-red-500">No name</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatCreatedAt(org?.createdAt) || (
                        <p className="text-red-200">Unknown</p>
                      )}
                    </TableCell>
                    <TableCell>{org.totalDrivers}</TableCell>
                    <TableCell>{org.totalVehicles}</TableCell>
                    <TableCell>{org.listingDrivers}</TableCell>
                    <TableCell>{Math.floor(Math.random() * 20) + 1}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : pending ? (
          <p className="text-lg text-red-400 font-bold">
            No pending organisations!
          </p>
        ) : (
          <p className="text-lg text-red-400 font-bold">
            No partners signed up yet!
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
    <Box>
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

      <Box sx={{ fontSize: "24px", fontWeight: "500", marginBottom: "20px" }}>
        Manage & find organisation
      </Box>

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
        <Tab label="All organisations" />
        <Tab label="Pending organisations" />
        <Tab label="New requests (11)" />
      </Tabs>

      {loading ? (
        <LoadingAnimation height={500} width={500} />
      ) : (
        <>
          {activeTab === 0 && <PartnersTable pending={false} />}

          {activeTab === 1 && <PartnersTable pending={true} />}

          {activeTab === 2 && <PartnersTable pending={true} />}
        </>
      )}
    </Box>
  );
};

export default Partners;
