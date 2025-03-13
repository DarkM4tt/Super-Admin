/* eslint-disable react/prop-types */
import {
  Modal,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import rewardIcon from "../../assets/reward.png";
import { useCallback, useEffect, useState } from "react";
import LoadingAnimation from "../common/LoadingAnimation";

const UpdateCouponModal = ({
  open,
  onClose,
  editFormData,
  setEditFormData,
  onUpdate,
  buttonLoading,
  selectedCoupon,
}) => {
  const [allCities, setAllCities] = useState([]);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (selectedCoupon) {
      setEditFormData({
        country_id: selectedCoupon.country_id || "",
        coupon_name: selectedCoupon.coupon_name || "",
        city_id: selectedCoupon.city_id || "",
        min_amount: selectedCoupon.min_amount || 0,
        usage_limit: selectedCoupon.usage_limit || 0,
        discount_type: selectedCoupon.discount_type || "FIXED",
        discount_value: selectedCoupon.discount_value || "",
        coupon_type: selectedCoupon.coupon_type || "REGULAR",
        valid_from: selectedCoupon.valid_from || null,
        valid_until: selectedCoupon.valid_until || null,
        description: selectedCoupon.description || "",
      });
    }
  }, [selectedCoupon, setEditFormData]);

  const fetchCities = useCallback(async () => {
    if (!editFormData?.country_id) return;
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/city/get-cities?page=1&limit=100&country_id=${
          editFormData?.country_id
        }`,
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
      console.log(error);
    }
  }, [editFormData?.country_id]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const handleChange = (field, value) => {
    setEditFormData((prevData) => {
      const updatedData = { ...prevData, [field]: value };
      setIsFormChanged(
        JSON.stringify(updatedData) !== JSON.stringify(selectedCoupon)
      );
      return updatedData;
    });
  };

  const toggleDiscountType = () => {
    const newType =
      editFormData.discount_type === "FIXED" ? "PERCENTAGE" : "FIXED";
    handleChange("discount_type", newType);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="update-coupon-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          bgcolor: "white",
          borderRadius: "8px",
          boxShadow: 24,
          padding: "24px",
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={rewardIcon} alt="Reward Icon" className="w-20 mr-3" />
            <Typography variant="h6" className="font-semibold">
              Update Coupon
            </Typography>
          </div>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-14">
          <TextField
            label="Coupon Name"
            variant="outlined"
            size="small"
            value={editFormData?.coupon_name}
            onChange={(e) => handleChange("coupon_name", e.target.value)}
            fullWidth
          />

          <TextField
            select
            label="Coupon City"
            variant="outlined"
            size="small"
            value={editFormData?.city_id}
            onChange={(e) => handleChange("city_id", e.target.value)}
            fullWidth
          >
            {allCities.map((city) => (
              <MenuItem key={city?.id} value={city?.id}>
                {city?.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Min Amount"
            variant="outlined"
            size="small"
            type="number"
            value={editFormData?.min_amount}
            onChange={(e) => handleChange("min_amount", e.target.value)}
            fullWidth
          />

          <TextField
            label="Usage Limit"
            variant="outlined"
            size="small"
            type="number"
            value={editFormData?.usage_limit}
            onChange={(e) => handleChange("usage_limit", e.target.value)}
            fullWidth
          />

          <TextField
            label="Valid From"
            variant="outlined"
            size="small"
            type="date"
            value={editFormData?.valid_from}
            onChange={(e) => handleChange("valid_from", e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Valid To"
            variant="outlined"
            size="small"
            type="date"
            value={editFormData?.valid_until}
            onChange={(e) => handleChange("valid_until", e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={onUpdate}
          disabled={!isFormChanged || buttonLoading}
          className="mt-6"
        >
          {buttonLoading ? <LoadingAnimation /> : "Update Coupon"}
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateCouponModal;
