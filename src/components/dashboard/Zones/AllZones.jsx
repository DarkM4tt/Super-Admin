/* eslint-disable react/prop-types */
import SearchIcon from "@mui/icons-material/Search";
import BackArrow from "../../../assets/leftArrowBlack.svg";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useCallback, useEffect, useState } from "react";
import LoadingAnimation from "../../common/LoadingAnimation";
import { formatCreatedAt } from "../../../utils/dates";

const AllZones = ({ setActiveComponent, handleZoneClick }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allZones, setAllZones] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedZone, setSelectedZone] = useState(null);

  const fetchAllZones = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/zones?page=1&limit=100`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setAllZones(result?.data?.zones?.results);
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
    fetchAllZones();
  }, [fetchAllZones]);

  const handleToggleStatus = async (zoneId) => {
    setAllZones((prevZones) =>
      prevZones.map((zone) =>
        zone.id === zoneId ? { ...zone, is_active: !zone.is_active } : zone
      )
    );
    const url = `${
      import.meta.env.VITE_API_RIDE_URL
    }/super-admin/zones/toggle-status/${zoneId}`;

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
      setAllZones((prevZones) =>
        prevZones.map((zone) =>
          zone.id === zoneId ? { ...zone, is_active: !zone.is_active } : zone
        )
      );
      setError(error);
    }
  };

  const handleDeleteZone = async () => {
    if (!selectedZone) return;
    setError("");
    setLoading(true);

    const url = `${import.meta.env.VITE_API_RIDE_URL}/super-admin/zones/${
      selectedZone?.id
    }`;

    try {
      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res?.json();
      if (result?.success) {
        fetchAllZones();
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

  const handleMenuOpen = (event, zone) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom, left: rect.left });
    setMenuAnchor(event.currentTarget);
    setSelectedZone(zone);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedZone(null);
  };

  if (error) {
    return (
      <p className="text-lg text-red-400 font-bold">
        {error.message || "Error"}
      </p>
    );
  }

  if (loading) {
    return <LoadingAnimation width={500} height={500} />;
  }

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        {"> Dashboard"}
        <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>

      <div className="flex mt-8 gap-4">
        <img
          src={BackArrow}
          alt="BackArrow"
          className="cursor-pointer"
          onClick={() => {
            setActiveComponent("Dashboard");
          }}
        />
        <p className="font-redhat font-semibold text-2xl ">All zones</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="font-sans font-normal text-xl">
          Review your all zones list, fill in the below details and submit.
        </p>
        <div
          className="py-2 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px] flex cursor-pointer"
          onClick={() => setActiveComponent("NewZone")}
        >
          + Create new zone
        </div>
      </div>

      <Box
        sx={{
          paddingInline: "15px",
          paddingBlock: "30px",
          marginTop: "32px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          borderRadius: "8px",
        }}
      >
        <p className="font-redhat font-semibold text-2xl">List of all zones</p>
        <TableContainer>
          <Table>
            {/* Table Header */}
            <TableHead
              sx={{
                "& .MuiTableCell-root": {
                  backgroundColor: "#EEEEEE",
                  fontWeight: "400",
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
              <TableRow
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "10px",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                {[
                  "Zone name",
                  "Color",
                  "Map type",
                  "Created on",
                  "Zones status",
                  "Options",
                ].map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {allZones.map((zone) => (
                <TableRow
                  key={zone?.id}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    {zone?.name || "No name"}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    {zone?.color || "No color"}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    {zone?.zone_type || "No type"}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    {zone?.updatedAt
                      ? formatCreatedAt(zone?.updatedAt)
                      : formatCreatedAt(zone?.createdAt)}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <Switch
                      checked={zone?.is_active}
                      onChange={() => handleToggleStatus(zone?.id)}
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: zone?.is_active ? "#22cfcf" : "red",
                          opacity: 1,
                        },
                        "& .Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "#22cfcf",
                          opacity: 1,
                        },
                      }}
                    />
                    {zone?.is_active ? "On" : "Off"}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <IconButton
                      onClick={(event) => handleMenuOpen(event, zone)}
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
                        onClick={() => handleZoneClick(selectedZone?.id, true)}
                      >
                        Update Polygon
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleZoneClick(selectedZone?.id, true)}
                      >
                        Update Prices
                      </MenuItem>
                      <MenuItem onClick={handleDeleteZone}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AllZones;
