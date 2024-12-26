import React from "react";
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
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AppleIcon from "../../assets/apple.svg";

const organizationsData = [
  {
    id: 12,
    name: "ABC Company Ltd1",
    operatingSince: "12 Oct, 2024",
    totalDrivers: 322,
    totalVehicles: 400,
    listingDrivers: 78,
    issuesQueries: 12,
  },
  {
    id: 13,
    name: "XYZ Organization",
    operatingSince: "15 Nov, 2024",
    totalDrivers: 120,
    totalVehicles: 200,
    listingDrivers: 50,
    issuesQueries: 0,
  },
];

const PartnersPage = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box padding="20px">
      {/* Partners Heading */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Box sx={{ fontSize: "18px", fontWeight: "bold" }}>Partners</Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            border: "1px solid #d3d3d3",
            borderRadius: "8px",
            padding: "5px 10px",
            width: "250px",
          }}
        >
          <SearchIcon sx={{ color: "#9e9e9e", marginRight: "5px" }} />
          <TextField
            variant="standard"
            placeholder="Search anything..."
            InputProps={{ disableUnderline: true }}
            sx={{ flexGrow: 1 }}
          />
        </Box>
      </Box>

      {/* Manage Heading */}
      <Box sx={{ fontSize: "24px", fontWeight: "500", marginBottom: "20px" }}>
        Manage & find organisation
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          borderBottom: "1px solid #d3d3d3",
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

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box
          sx={{
            marginTop: "20px",
            padding: "5px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TableContainer>
            <Table>
              {/* Table Header */}
              <TableHead>
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
                    <TableCell
                      key={header}
                      sx={{
                        backgroundColor: "#f5f5f5",
                        fontWeight: "bold",
                        color: "#757575",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {organizationsData.map((org) => (
                  <TableRow
                    key={org.id}
                    sx={{ borderBottom: "1px solid #d3d3d3" }}
                  >
                    <TableCell>{org.id}</TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img src={AppleIcon} alt="AppleIcon" />
                      {org.name}
                    </TableCell>
                    <TableCell>{org.operatingSince}</TableCell>
                    <TableCell>{org.totalDrivers}</TableCell>
                    <TableCell>{org.totalVehicles}</TableCell>
                    <TableCell>{org.listingDrivers}</TableCell>
                    <TableCell>{org.issuesQueries}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {activeTab === 1 && (
        <Box
          sx={{
            marginTop: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#757575",
            textAlign: "center",
          }}
        >
          Pending organisations
        </Box>
      )}

      {activeTab === 2 && (
        <Box
          sx={{
            marginTop: "20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#757575",
            textAlign: "center",
          }}
        >
          New requests (11)
        </Box>
      )}
    </Box>
  );
};

export default PartnersPage;
