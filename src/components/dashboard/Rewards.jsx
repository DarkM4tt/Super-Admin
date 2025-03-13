import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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
import CreateNewRewardModal from "./CreateNewRewardModal";
import UpdateCouponModal from "./UpdateCouponModal";

const Rewards = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [allCoupons, setAllCoupons] = useState([]);
  const [formData, setFormData] = useState({
    country_id: "",
    coupon_name: "",
    city_id: "",
    min_amount: "",
    usage_limit: "",
    discount_type: "FIXED",
    discount_value: "",
    coupon_type: "REGULAR",
    valid_from: null,
    valid_until: null,
    description: "",
  });
  const [editFormData, setEditFormData] = useState({
    country_id: "67a4b5d0908650882bf69050",
    coupon_name: "",
    city_id: "",
    min_amount: 0,
    usage_limit: 0,
    discount_type: "FIXED",
    discount_value: "",
    coupon_type: "REGULAR",
    valid_from: null,
    valid_until: null,
    description: "",
  });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (selectedCoupon) {
      setEditFormData((prevData) => ({
        ...prevData,
        ...selectedCoupon,
      }));
    }
  }, [selectedCoupon]);

  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => {
    handleMenuClose();
    setEditModalOpen(false);
  };

  const handleUpdateCoupon = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_RIDE_URL}/super-admin/coupons/update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(editFormData),
        }
      );
      const result = await res.json();
      if (result?.success) {
        fetchAllCoupons();
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      handleEditModalClose();
    }
  };

  const handleDeleteCoupon = async () => {
    if (!selectedCoupon) return;
    handleMenuClose();
    const url = `${
      import.meta.env.VITE_API_RIDE_URL
    }/super-admin/coupons/delete/${selectedCoupon?.id}`;

    try {
      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res?.json();
      if (result?.success) {
        fetchAllCoupons();
        handleMenuClose();
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuOpen = (event, coupon) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom, left: rect.left });
    setMenuAnchor(event.currentTarget);
    setSelectedCoupon(coupon);
  };

  const handleMenuClose = (event) => {
    event?.stopPropagation();
    setMenuAnchor(null);
    setSelectedCoupon(null);
  };

  const fetchAllCoupons = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_RIDE_URL}/super-admin/coupons/all`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setAllCoupons(result?.data?.coupons?.results);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleToggleStatus = async (couponId) => {
    setAllCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === couponId
          ? { ...coupon, is_active: !coupon.is_active }
          : coupon
      )
    );
    const url = `${
      import.meta.env.VITE_API_RIDE_URL
    }/super-admin/coupons/toggle-status/${couponId}`;

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
      setAllCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon.id === couponId
            ? { ...coupon, is_active: !coupon.is_active }
            : coupon
        )
      );
      console.log(error);
    }
  };

  const convertToISO = (dateStr) => {
    const date = new Date(dateStr);
    date.setUTCHours(18, 30, 0, 0);
    return date.toISOString();
  };

  useEffect(() => {
    fetchAllCoupons();
  }, [fetchAllCoupons]);

  const handleSave = async () => {
    setButtonLoading(true);
    formData.min_amount = +formData.min_amount;
    formData.usage_limit = +formData.usage_limit;
    formData.discount_value = +formData.discount_value;
    formData.valid_from = convertToISO(formData.valid_from);
    formData.valid_until = convertToISO(formData.valid_until);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_RIDE_URL}/super-admin/coupons/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        console.log(result?.message);
        fetchAllCoupons();
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
      setFormData({
        country_id: "67a4b5d0908650882bf69050",
        coupon_name: "",
        city_id: "",
        min_amount: 0,
        usage_limit: 0,
        discount_type: "FIXED",
        discount_value: "",
        coupon_type: "REGULAR",
        valid_from: null,
        valid_until: null,
        description: "",
      });
      setModalOpen(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const CouponsTable = () => {
    return (
      <Box
        sx={{
          paddingInline: "15px",
          paddingBlock: "30px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
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
                  color: "black",
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
                  fontSize: "16px",
                  paddingBottom: "24px",
                }}
              >
                {[
                  "Coupon name",
                  "Service type",
                  "Limit",
                  "Used count",
                  "Status",
                  "Options",
                ].map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {allCoupons?.length === 0 && (
                <p className="text-red-400 text-lg mt-8 font-bold">
                  No coupons added yet!
                </p>
              )}
              {allCoupons?.length > 0 &&
                allCoupons?.map((coupon) => (
                  <TableRow
                    key={coupon.id}
                    sx={{
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "black",
                      }}
                    >
                      {coupon?.coupon_name}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "black",
                      }}
                    >
                      {coupon?.coupon_type}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "black",
                      }}
                    >
                      {coupon?.usage_limit}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "black",
                      }}
                    >
                      {coupon?.used_count}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "black",
                      }}
                    >
                      <Switch
                        checked={coupon?.is_active}
                        onClick={(event) => event?.stopPropagation()}
                        onChange={() => handleToggleStatus(coupon?.id)}
                        sx={{
                          "& .MuiSwitch-track": {
                            backgroundColor: coupon?.is_active
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
                      {coupon?.is_active ? "On" : "Off"}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                      }}
                    >
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation();
                          handleMenuOpen(event, coupon);
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
                        onClose={(event) => handleMenuClose(event)}
                        PaperProps={{
                          elevation: 2,
                          sx: { boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" },
                        }}
                      >
                        <MenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEditModalOpen();
                          }}
                        >
                          Update Coupon
                        </MenuItem>
                        <MenuItem
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteCoupon();
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
      </Box>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base text-gray font-semibold mb-8">
        {"Accounts > Rewards"}
        <div className="flex gap-4">
          <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none"
            ></input>
          </div>
        </div>
      </div>

      <p className="font-redhat font-semibold text-2xl pt-8">Rewards</p>
      <p className="font-normal text-lg text-gray pt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.{" "}
      </p>
      <p className="font-normal text-lg text-gray pt-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.{" "}
      </p>

      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-8 items-center">
          <p className="font-redhat font-semibold text-2xl">
            Select options to proceed
          </p>
        </div>
        <div className="flex gap-6">
          <div
            className="py-2 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px] cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <span className="pr-1">
              {" "}
              <AddIcon fontSize="small" />
            </span>{" "}
            Create new coupon{" "}
          </div>
          <div
            className="py-2 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px] cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            In-app reward
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center mt-8">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: "1px solid #d3d3d3",
            width: "fit-content",
            ".MuiTab-root": {
              textTransform: "none",
              fontWeight: 400,
              color: "#9e9e9e",
              paddingY: "8px",
              fontSize: "16px",
            },
            ".Mui-selected": {
              color: "#1976d2",
              fontWeight: "600",
              paddingY: "8px",
              fontSize: "16px",
            },
            ".MuiTabs-indicator": { backgroundColor: "#1976d2" },
          }}
        >
          <Tab label="Coupons" />
          <Tab label="Rewards" />
          <Tab label="Voucher" />
        </Tabs>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "black",
            color: "black",
            borderRadius: "30px",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              borderColor: "black",
            },
          }}
        >
          Engage finance team
        </Button>
      </div>

      {activeTab === 0 && <CouponsTable />}
      {activeTab === 1 && <p className="text-red-400 p-6">Empty</p>}
      {activeTab === 2 && <p className="text-red-400 p-6">Empty</p>}

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      <CreateNewRewardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        buttonLoading={buttonLoading}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />
      {/* </LocalizationProvider> */}

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      <UpdateCouponModal
        open={editModalOpen}
        onClose={handleEditModalClose}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        onUpdate={handleUpdateCoupon}
        selectedCoupon={selectedCoupon}
        buttonLoading={buttonLoading}
      />
      {/* </LocalizationProvider> */}
    </>
  );
};

export default Rewards;

{
  /* Select date range */
}
{
  /* <div className="flex flex-col">
            <label
              htmlFor="city"
              className="font-redhat font-semibold text-base mb-4"
            >
              Select date range
            </label>
            <TextField
              id="city"
              select
              variant="outlined"
              size="small"
              value={formData.city_id}
              onChange={(e) => handleChange("city_id", e.target.value)}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                IconComponent: ExpandMoreIcon,
              }}
            >
              <MenuItem value="" disabled>
                Select service type
              </MenuItem>
              <MenuItem value="REGULAR">Regular</MenuItem>
              <MenuItem value="INTERCITY">Intercity</MenuItem>
            </TextField>
          </div> */
}
