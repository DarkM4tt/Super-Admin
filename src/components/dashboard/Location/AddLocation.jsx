/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CountryModal from "./CountryModal";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Switch,
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
import { formatCreatedAt } from "../../../utils/dates";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const AddLocation = ({
  setActiveComponent,
  handleEntityClick,
  handlePriceClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCity, setSelectedCity] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const fetchCities = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/city/get-cities?page=1&limit=100`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setAllCities(result?.data?.cities?.results);
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
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/country/get-countries?page=1&limit=100`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setAllCountries(result?.data?.countries?.results);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddCountry = useCallback(
    async (country) => {
      setError("");
      setLoading(true);

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_RIDE_URL
          }/super-admin/country/add-country`,
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
          fetchCountries();
        } else {
          throw new Error(result?.message);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [fetchCountries]
  );

  useEffect(() => {
    fetchCities();
    fetchCountries();
  }, [fetchCities, fetchCountries, handleAddCountry]);

  const handleToggleStatus = async (cityId, isCity) => {
    isCity
      ? setAllCities((prevCities) =>
          prevCities.map((city) =>
            city.id === cityId ? { ...city, is_active: !city.is_active } : city
          )
        )
      : setAllCountries((prevCountries) =>
          prevCountries.map((country) =>
            country.id === cityId
              ? { ...country, is_active: !country.is_active }
              : country
          )
        );
    const url = isCity
      ? `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/city/toggle-city-status/${cityId}`
      : `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/country/toggle-country-status/${cityId}`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        credentials: "include",
      });
      const result = await res?.json();
      if (!result?.success) {
        throw new Error(result?.message);
      }
    } catch (error) {
      isCity
        ? setAllCities((prevCities) =>
            prevCities.map((city) =>
              city.id === cityId
                ? { ...city, is_active: !city.is_active }
                : city
            )
          )
        : setAllCountries((prevCountries) =>
            prevCountries.map((country) =>
              country.id === cityId
                ? { ...country, is_active: !country.is_active }
                : country
            )
          );
      setError(error);
    }
  };

  const handleMenuOpen = (event, city) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom, left: rect.left });
    setMenuAnchor(event.currentTarget);
    setSelectedCity(city);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setMenuAnchor(null);
    setSelectedCity(null);
  };

  const handleDeleteCity = async () => {
    if (!selectedCity) return;
    setError("");
    setLoading(true);

    const url = `${
      import.meta.env.VITE_API_RIDE_URL
    }/super-admin/city/delete-city/${selectedCity?.id}`;

    try {
      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res?.json();
      if (result?.success) {
        fetchCities();
        handleMenuClose();
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      handleMenuClose();
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

  const CitiesTable = () => {
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
        {allCities?.length > 0 ? (
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
                    "Status",
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
                {allCities.map((city, idx) => (
                  <TableRow
                    key={city?.id}
                    onClick={() => handleEntityClick(city?.id, false)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      {city?.name || <p className="text-red-500">No name</p>}
                    </TableCell>
                    <TableCell>
                      <p>{city?.total_zones}</p>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={city?.is_active}
                        onChange={() => handleToggleStatus(city?.id, true)}
                        sx={{
                          "& .MuiSwitch-track": {
                            backgroundColor: city?.is_active
                              ? "#22cfcf"
                              : "red",
                            opacity: 1,
                          },
                          "& .Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#22cfcf",
                            opacity: 1,
                          },
                        }}
                      />
                      {city?.is_active ? "On" : "Off"}
                    </TableCell>
                    <TableCell>
                      <p>{city?.city_area || "100 sqkm"}</p>
                    </TableCell>
                    <TableCell>
                      {city?.updatedAt
                        ? formatCreatedAt(city?.updatedAt)
                        : formatCreatedAt(city?.createdAt)}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation(); // Prevents row click
                          handleMenuOpen(event, city);
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        anchorReference="anchorPosition"
                        anchorPosition={{
                          top: menuPosition.top,
                          left: menuPosition.left,
                        }}
                        open={Boolean(menuAnchor)}
                        onClose={handleMenuClose}
                        PaperProps={{
                          elevation: 2,
                          sx: { boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" },
                        }}
                      >
                        <MenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEntityClick(selectedCity?.id, false);
                          }}
                        >
                          Update Polygon
                        </MenuItem>
                        <MenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            handlePriceClick(selectedCity, false);
                          }}
                        >
                          Update Prices
                        </MenuItem>
                        <MenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteCity();
                          }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p className="text-lg text-red-400 font-bold">No cities added yet!</p>
        )}
      </Box>
    );
  };

  const CountriesTable = () => {
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
        {allCities?.length > 0 ? (
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
                    "Country",
                    "Operating cities",
                    "ISO code",
                    "Currency",
                    "Status",
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
                {allCountries.map((country, idx) => (
                  <TableRow
                    key={country?.id}
                    // onClick={() => onPartnerClick(org?._id)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      {country?.name || <p className="text-red-500">No name</p>}
                    </TableCell>
                    <TableCell>{country?.total_cities}</TableCell>
                    <TableCell>{country?.iso_code}</TableCell>
                    <TableCell>{country?.currency}</TableCell>
                    <TableCell>
                      <Switch
                        checked={country?.is_active}
                        onChange={() => handleToggleStatus(country?.id, false)}
                        sx={{
                          "& .MuiSwitch-track": {
                            backgroundColor: country?.is_active
                              ? "#22cfcf"
                              : "red",
                            opacity: 1,
                          },
                          "& .Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#22cfcf",
                            opacity: 1,
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
          {activeTab === 0 && <CitiesTable />}
          {activeTab === 1 && <CountriesTable />}
        </>
      )}

      <CountryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCountry={handleAddCountry}
        loading={loading}
      />
    </>
  );
};

export default AddLocation;
