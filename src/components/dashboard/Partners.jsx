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
import { formatCreatedAt } from "../../utils/dates";
import SearchIcon from "@mui/icons-material/Search";
import PartnerIcon from "../../assets/partnerImage.png";
import LoadingAnimation from "../common/LoadingAnimation";
import wrongIcon from "../../assets/wrongIcon.svg";
import infoYellow from "../../assets/infoYellow.svg";
import OrgBig from "../../assets/orgBig.svg";

const Partners = ({ onPartnerClick, handleAcceptClick }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allPartners, setAllPartners] = useState([]);

  const getUrl = useCallback(() => {
    if (activeTab === 0) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-organizations?page=1&limit=100&status=APPROVED`;
    } else if (activeTab === 1) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-organizations?page=1&limit=100&status=PENDING`;
    } else if (activeTab === 2) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-organizations?page=1&limit=100&status=NEW-REQUEST`;
    } else if (activeTab === 3) {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-organizations?page=1&limit=100&status=REJECTED`;
    } else {
      return `${
        import.meta.env.VITE_API_URL
      }/organizations/super-admin/all-organizations?page=1&limit=100&is_completed=false`;
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

  const PartnersTable = ({ status }) => {
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
                    status && status !== "incomplete"
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
                {allPartners.map((org, idx) => {
                  return (
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
                      <TableCell>{org.total_drivers || 0}</TableCell>
                      <TableCell>{org.total_vehicles || 0}</TableCell>
                      <TableCell>{org.listing_assignments || 0}</TableCell>
                      {status && status !== "incomplete" ? (
                        <TableCell>
                          <div className="flex">
                            {org?.rejected_documents > 0 && (
                              <span
                                className={`bg-[#f9ecea] pl-4 pr-2 py-2 ${
                                  org?.pending_documents > 0
                                    ? "rounded-l-2xl"
                                    : "rounded-2xl"
                                } text-[#D40038] flex items-center`}
                              >
                                <img
                                  src={wrongIcon}
                                  alt="wrongIcon"
                                  className="mr-1"
                                />
                                <p>{org?.rejected_documents}</p>
                              </span>
                            )}
                            {org?.pending_documents > 0 && (
                              <span
                                className={`bg-[#f9ecea] pl-2 pr-4 py-2 ${
                                  org?.rejected_documents > 0
                                    ? "rounded-r-2xl"
                                    : "rounded-2xl"
                                } text-[#C07000] flex items-center`}
                              >
                                <img
                                  src={infoYellow}
                                  alt="infoYellow"
                                  className="mr-1"
                                />
                                <p>{org?.pending_documents}</p>
                              </span>
                            )}
                            {org?.total_documents === 6 &&
                              org?.verified_documents === 6 && (
                                <p className="text-green-400 font-bold">
                                  Approved
                                </p>
                              )}
                            {org?.total_documents < 6 &&
                              org?.total_documents > 0 &&
                              org?.pending_documents === 0 &&
                              org?.rejected_documents === 0 && (
                                <p className="text-red-400 font-bold">
                                  {6 - org?.total_documents} not uploaded!
                                </p>
                              )}
                            {org?.total_documents === 0 && (
                              <p className="text-red-400 font-bold">
                                Not Uploaded!
                              </p>
                            )}
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell>{org?.issues_raised || 0}</TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : status ? (
          <p className="text-lg text-red-400 font-bold">
            No {status} organisations!
          </p>
        ) : (
          <p className="text-lg text-red-400 font-bold">
            No partners approved yet!
          </p>
        )}
      </Box>
    );
  };

  const NewOrgRequestCard = ({ partnerDetails }) => {
    return (
      <div className="bg-white mt-4 rounded-md py-4 pr-6 pl-10 mb-4 relative border-b-[1px] border-[#344BFD]">
        {/* Company Details */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <img src={OrgBig} alt="OrgBig" />
            <div>
              <p className="text-lg font-redhat font-bold">Organisation</p>
              <p className="text-base font-redhat font-medium text-gray">
                {partnerDetails?.full_name || "No name"}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col w-32">
            <p className="text-lg font-redhat font-bold">Location</p>
            <p className="text-base font-redhat font-medium text-gray">
              {partnerDetails?.city && partnerDetails?.city + ","}{" "}
              {partnerDetails?.country}
              {!partnerDetails?.city && !partnerDetails?.country && (
                <p className="text-red-400">Unknown</p>
              )}
            </p>
          </div>

          {/* Signed Up On */}
          <div className="flex flex-col">
            <p className="text-lg font-redhat font-bold">Signed up on</p>
            <p className="text-base font-redhat font-medium text-gray">
              {(partnerDetails?.createdAt &&
                formatCreatedAt(partnerDetails?.createdAt)) || (
                <p className="text-red-400">Unknown</p>
              )}
            </p>
            <p className="text-sm text-gray-600">{partnerDetails?.time}</p>
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
            onClick={() => handleAcceptClick(partnerDetails?._id, "partner")}
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
        <Tab label="New requests" />
        <Tab label="Rejected" />
        <Tab label="Incomplete signup" />
      </Tabs>

      {loading ? (
        <LoadingAnimation height={500} width={500} />
      ) : (
        <>
          {activeTab === 0 && <PartnersTable />}

          {activeTab === 1 && <PartnersTable status="pending" />}

          {activeTab === 2 && (
            <>
              {allPartners?.length > 0 ? (
                allPartners?.map((partner) => (
                  <NewOrgRequestCard
                    key={partner?._id}
                    partnerDetails={partner}
                  />
                ))
              ) : (
                <p className="text-lg text-red-400 font-bold mt-8 bg-white p-2">
                  No new organisations!
                </p>
              )}
            </>
          )}

          {activeTab === 3 && <PartnersTable status="rejected" />}

          {activeTab === 4 && <PartnersTable status="incomplete" />}
        </>
      )}
    </Box>
  );
};

export default Partners;
