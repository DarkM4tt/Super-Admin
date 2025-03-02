/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CountryModal from "./CountryModal";
import {
  Box,
  Button,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import LoadingAnimation from "../../common/LoadingAnimation";

const AddLocation = ({ setActiveComponent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [allCities, setAllCities] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const fetchCities = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/organizations/super-admin/all-organizations?page=1&limit=100`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setAllCities(result?.data?.cities);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCountries = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/organizations/super-admin/all-organizations?page=1&limit=100`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setAllCountries(result?.data?.countries);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
    fetchCountries();
  }, [fetchCities, fetchCountries]);

  const handleAddCountry = async (country) => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/organizations/super-admin/all-organizations?page=1&limit=100`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            country_code: country,
          }),
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setIsSuccess(result?.success);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (error) {
    return (
      <p className="text-lg text-red-400 font-bold">
        {error.message || "Error"}
      </p>
    );
  }

  const CitiesTable = ({ isCities }) => {
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
        {(isCities ? allCities : allCountries)?.length > 0 ? (
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
                    "SL",
                    "City",
                    "Total zones",
                    "Total vehicles",
                    "City area",
                    "Last edited",
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
                {(isCities ? allCities : allCountries).map((org, idx) => (
                  <TableRow
                    key={org?._id}
                    // onClick={() => onPartnerClick(org?._id)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {org?.full_name || (
                          <p className="text-red-500">No name</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-red-200">Unknown</p>
                    </TableCell>
                    <TableCell>{org.totalDrivers}</TableCell>
                    <TableCell>{org.totalVehicles}</TableCell>
                    <TableCell>{org.listingDrivers}</TableCell>
                    <TableCell>Docs</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : isCities ? (
          <p className="text-lg text-red-400 font-bold">No cities added yet!</p>
        ) : (
          <p className="text-lg text-red-400 font-bold">
            No countries added yet!
          </p>
        )}
      </Box>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <p className="text-gray">
          {"Location > "}
          <span className="text-black">Add Location</span>
        </p>

        <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <p className="font-redhat font-semibold text-2xl">
          All added locations preview
        </p>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            sx={{
              borderColor: "black",
              color: "black",
              textTransform: "none",
              padding: "5px 40px",
              borderRadius: "20px",
              fontSize: "14px",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Add new country
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              padding: "5px 40px",
              borderRadius: "20px",
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
            onClick={() => setActiveComponent("AddCity")}
          >
            Add new city
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          borderBottom: "1px solid #d3d3d3",
          width: "fit-content",
          marginTop: "30px",
          ".MuiTab-root": {
            textTransform: "none",
            fontWeight: 500,
            color: "#9e9e9e",
          },
          ".Mui-selected": { color: "#1976d2", fontWeight: "bold" },
          ".MuiTabs-indicator": { backgroundColor: "#1976d2" },
        }}
      >
        <Tab label="All cities" />
        <Tab label="All countries" />
      </Tabs>

      {loading ? (
        <LoadingAnimation width={500} height={500} />
      ) : (
        <>
          {activeTab === 0 && <CitiesTable isCities={true} />}
          {activeTab === 1 && <CitiesTable isCities={false} />}
        </>
      )}

      <CountryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCountry={handleAddCountry}
        loading={loading}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default AddLocation;
