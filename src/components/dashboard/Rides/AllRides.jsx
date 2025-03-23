/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import BackArrow from "../../../assets/leftArrowBlack.svg";
import SearchIcon from "@mui/icons-material/Search";
import LoadingAnimation from "../../common/LoadingAnimation";

const AllRides = ({ onRideClick, setActiveComponent }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allRides, setAllRides] = useState([]);

  const fetchRides = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_RIDE_URL
        }/ride/super-admin/history?page=1&limit=100`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setAllRides(result?.data?.rides?.results);
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
    fetchRides();
  }, [fetchRides]);

  const RidesTable = () => {
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
        {allRides?.length > 0 ? (
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
                    "User",
                    "Driver",
                    "Vehicle number",
                    "Service",
                    "Status",
                    "Captured amount",
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
                {allRides.map((ride) => {
                  return (
                    <TableRow
                      key={ride?._id}
                      onClick={() => onRideClick(ride?._id)}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {ride?.customer_info?.full_name || (
                            <p className="text-red-500">No user name!</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {ride?.driver_info?.full_name || (
                          <p className="text-red-500">No driver name!</p>
                        )}
                      </TableCell>
                      <TableCell>
                        {ride?.vehicle_info?.vin || (
                          <p className="text-red-400">Not vehicle number!</p>
                        )}
                      </TableCell>
                      <TableCell>
                        {ride?.ride_service || (
                          <p className="text-red-500">No known!</p>
                        )}
                      </TableCell>
                      <TableCell>{ride?.status}</TableCell>
                      <TableCell>{ride?.captured_amount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p className="text-lg text-red-400 font-bold">No rides yet!</p>
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
      <div className="flex justify-between items-center font-redhat text-base font-semibold mb-8">
        {"> Dashboard > Rides"}
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
        List of rides
      </Box>

      {loading ? <LoadingAnimation height={500} width={500} /> : <RidesTable />}
    </>
  );
};

export default AllRides;
