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

const AllCustomers = ({ onCustomerClick, setActiveComponent }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allCustomers, setAllCustomers] = useState([]);

  //   const getUrl = useCallback(() => {
  //     if (activeTab === 0) {
  //       return `${
  //         import.meta.env.VITE_API_AUTH_URL
  //       }/super-admin/all-drivers?page=1&limit=100&status=APPROVED`;
  //     } else if (activeTab === 1) {
  //       return `${
  //         import.meta.env.VITE_API_AUTH_URL
  //       }/super-admin/all-drivers?page=1&limit=100&status=PENDING`;
  //     } else if (activeTab === 2) {
  //       return `${
  //         import.meta.env.VITE_API_AUTH_URL
  //       }/super-admin/all-drivers?page=1&limit=100&status=NEW-REQUEST`;
  //     } else if (activeTab === 3) {
  //       return `${
  //         import.meta.env.VITE_API_AUTH_URL
  //       }/super-admin/all-drivers?page=1&limit=100&status=ASSIGNED`;
  //     } else {
  //       return `${
  //         import.meta.env.VITE_API_AUTH_URL
  //       }/super-admin/all-drivers?page=1&limit=100&status=REJECTED`;
  //     }
  //   }, [activeTab]);

  const fetchCustomers = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_AUTH_URL
        }/super-admin/all-customers?page=1&limit=100`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setAllCustomers(result?.customers?.results);
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
    fetchCustomers();
  }, [fetchCustomers]);

  const CustomersTable = () => {
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
        {allCustomers?.length > 0 ? (
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
                    "User ID",
                    "Phone number",
                    "Email ID",
                    "Total spends",
                    "Total booked rides",
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
                {allCustomers.map((customer) => {
                  return (
                    <TableRow
                      key={customer?._id}
                      onClick={() => onCustomerClick(customer?._id)}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {customer?.full_name || (
                            <p className="text-red-500">No name!</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {customer?.username || (
                          <p className="text-red-500">No username!</p>
                        )}
                      </TableCell>
                      <TableCell>
                        {customer?.phone || (
                          <p className="text-red-400">Not contact yet!</p>
                        )}
                      </TableCell>
                      <TableCell>
                        {customer?.email || (
                          <p className="text-red-500">No email yet!</p>
                        )}
                      </TableCell>
                      <TableCell>
                        {"€ " + customer?.total_spends || 0}
                      </TableCell>
                      <TableCell>{customer?.total_rides_booked || 0}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p className="text-lg text-red-400 font-bold">No customers yet!</p>
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
        {"> Dashboard > Users"}
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
        List of users
      </Box>

      {loading ? (
        <LoadingAnimation height={500} width={500} />
      ) : (
        <CustomersTable />
      )}
    </>
  );
};

export default AllCustomers;
