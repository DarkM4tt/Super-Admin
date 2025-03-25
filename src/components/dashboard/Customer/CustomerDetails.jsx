/* eslint-disable react/prop-types */
import SearchIcon from "@mui/icons-material/Search";
import BackArrow from "../../../assets/leftArrowBlack.svg";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import Avatar from "@mui/material/Avatar";
import StarIcon from "@mui/icons-material/Star";
import Incoming from "../../../assets/Incoming.svg";
import Outgoing from "../../../assets/Outgoing.svg";
import Unanswered from "../../../assets/Unanswered.svg";
import CircularProgress from "../../common/CircularProgress";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSnackbar } from "../../../context/snackbarContext";
import { useCallback, useEffect, useState } from "react";
import { formatCreatedAt } from "../../../utils/dates";

const CustomerDetails = ({
  selectedCustomerId,
  setSelectedCustomerId,
  setActiveComponent,
  onRideClick,
}) => {
  const [customerData, setCustomerData] = useState(null);
  const [rideHistory, setRideHistory] = useState([]);
  const showSnackbar = useSnackbar();

  const fetchCustomerDetails = useCallback(async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_AUTH_URL
        }/super-admin/customer-details/${selectedCustomerId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setCustomerData(result?.data);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  }, [selectedCustomerId]);

  const fetchRideHistory = useCallback(async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_RIDE_URL
        }/ride/super-admin/history?page=1&limit=100&customer_id=${selectedCustomerId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setRideHistory(result?.data?.rides?.results || []);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  }, [selectedCustomerId]);

  useEffect(() => {
    fetchCustomerDetails();
  }, [fetchCustomerDetails]);

  useEffect(() => {
    customerData && fetchRideHistory();
  }, [fetchRideHistory, customerData]);

  return (
    <div>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <p className="font-redhat font-semibold text-base flex items-center">
          <span className="text-[#777777] pr-1">{"Dashboard > All users"}</span>
          {`> ${customerData?.full_name}`}
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

      <div className="flex items-center justify-between mt-8">
        <img
          src={BackArrow}
          alt="BackArrow"
          className="mb-4 cursor-pointer"
          onClick={() => {
            setSelectedCustomerId(null);
            setActiveComponent("AllCustomers");
          }}
        />
        <div className="py-1 px-4 text-base font-redhat bg-[#FF935914] rounded-[56px] text-[#FF9359] border border-[#FF9359] cursor-pointer">
          Generate report
        </div>
      </div>

      <div className="flex justify-between rounded-lg pb-11 mt-6 bg-white p-6 ">
        <div className="flex gap-4">
          {customerData?.profile_pic ? (
            <img
              src={customerData?.profile_pic}
              alt="any"
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <Avatar sx={{ width: "5rem", height: "5rem", borderRadius: "50%" }}>
              {customerData?.full_name?.charAt(0)}
            </Avatar>
          )}
          <div className="flex items-center gap-16">
            <div className="">
              <p className="font-sans text-2xl font-semibold flex items-center">
                {customerData?.full_name}{" "}
              </p>
              <div className="pt-2 flex gap-4">
                <p className="font-sans text-base text-[#777777] flex gap-2 items-center">
                  <span>
                    <EmailIcon fontSize="small" />
                  </span>
                  {customerData?.email}
                </p>
                <p className="font-sans text-base text-[#777777] flex gap-2 items-center underline">
                  <span>
                    <CallIcon fontSize="small" />
                  </span>
                  {customerData?.phone}
                </p>
              </div>
              <p className="font-sans pt-2 text-base text-[#777777] flex gap-2 items-center">
                User ID: {customerData?.username}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <p className="font-redhat text-xl text-[#777777]">Customer rating</p>
          <p className="pt-2 font-redhat font-bold text-xl text-[#18C4B8] text-right">
            <span className="text-[#FBDB0B] pr-2">
              <StarIcon />
            </span>
            {customerData?.rating ? customerData?.rating + "/5" : "0/5"}
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="flex gap-8 mt-8">
        <div
          className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
          style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
        >
          <div className="p-2 rounded-lg bg-[#006AFF21] h-fit">
            <img src={Incoming} alt="Incoming" />
          </div>
          <div className="">
            <p className="font-redhat font-semibold text-base">Total spends</p>
            <p className="pt-2 font-redhat font-bold text-2xl">
              {customerData?.total_spends || 0}
            </p>
            <p className="pt-2 text-sm text-[#777777]">
              Last updated 2 min ago
            </p>
            <p className="pt-2 text-sm text-[#777777]">vs 290 prev 7 days</p>
          </div>
        </div>
        <div
          className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
          style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
        >
          <div className="p-2 rounded-lg bg-[#00FFC321] h-fit">
            <img src={Outgoing} alt="Outgoing" />
          </div>
          <div className="">
            <p className="font-redhat font-semibold text-base">
              Total cabs booked
            </p>
            <p className="pt-2 font-redhat font-bold text-2xl">
              {customerData?.total_rides_booked || 0}
            </p>
            <p className="pt-2 text-sm text-[#777777]">
              Last updated 5 min ago
            </p>
            <p className="pt-2 text-sm text-[#777777]">vs 210 prev 5 days</p>
          </div>
        </div>
        <div
          className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
          style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
        >
          <div className="p-2 rounded-lg bg-[#FFFF0021] h-fit">
            <img src={Unanswered} alt="Unanswered" />
          </div>
          <div className="">
            <p className="font-redhat font-semibold text-base">Issue raised</p>
            <p className="pt-2 font-redhat font-bold text-2xl">
              {customerData?.issue_raised || 0}
            </p>
            <p className="pt-2 text-sm text-[#777777]">for all queries</p>
          </div>
        </div>
        <div
          className="w-[30%] flex items-center gap-4 p-4 bg-white rounded-lg border-b border-[#1860C4]"
          style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
        >
          <div className="flex flex-col">
            <p className="font-redhat text-md font-semibold">Performance</p>
            <p className="font-redhat text-xs font-normal">
              0 negative rating received by customers
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <p className="font-redhat text-xs">
                <span className="pr-2">
                  <FiberManualRecordIcon
                    fontSize="6px"
                    className="text-[#EEEEEE]"
                  />
                </span>
                Booked rides
              </p>
              <p className="font-redhat text-xs">
                <span className="pr-2">
                  <FiberManualRecordIcon
                    fontSize="6px"
                    className="text-[#15D356]"
                  />
                </span>
                Completed rides
              </p>
            </div>
          </div>
          <CircularProgress
            value={customerData?.booked_rate || 80}
            primaryColor="#15D356"
            secondaryColor="#EEEEEE"
          />
        </div>
      </div>

      <Box
        sx={{
          marginTop: "30px",
          padding: "10px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
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
                  "Driver",
                  "Vehicle",
                  "Ride type",
                  "Booked on",
                  "Status",
                  "Total spends",
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
              {rideHistory?.length > 0 ? (
                rideHistory.map((ride) => (
                  <TableRow
                    key={ride._id}
                    onClick={() => onRideClick(ride?._id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      {ride?.driver_info?.full_name || "No name"}
                    </TableCell>
                    <TableCell>
                      {ride?.vehicle_info?.vin || "Not known!"}
                    </TableCell>
                    <TableCell>{ride?.ride_service}</TableCell>
                    <TableCell>
                      {ride?.createdAt
                        ? formatCreatedAt(ride?.createdAt)
                        : "Not known!"}
                    </TableCell>
                    <TableCell>{ride?.status}</TableCell>
                    <TableCell>€ {ride?.captured_amount}</TableCell>
                  </TableRow>
                ))
              ) : (
                <p className="text-red-400 text-lg font-bold mt-8">
                  No rides yet!
                </p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default CustomerDetails;
