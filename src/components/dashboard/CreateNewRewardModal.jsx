/* eslint-disable react/prop-types */
import {
  Modal,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  IconButton,
  Box,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import rewardIcon from "../../assets/reward.png";
import { useState } from "react";

const CreateNewRewardModal = ({
  open,
  onClose,
  formData,
  setFormData,
  onSave,
}) => {
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-fuel-card-modal">
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
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={rewardIcon} alt="Fuel Gas Icon" className="w-20 mr-3" />
            <div>
              <p className="text-2xl font-redhat font-semibold text-black">
                Create new reward
              </p>
            </div>
          </div>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Coupon name */}
          <div className="flex flex-col">
            <label
              htmlFor="coupon_name"
              className="font-redhat font-semibold text-base mb-4"
            >
              Enter coupon name
            </label>
            <TextField
              id="coupon_name"
              placeholder="Enter name"
              variant="outlined"
              size="small"
              value={formData.coupon_name}
              onChange={(e) => handleChange("coupon_name", e.target.value)}
              fullWidth
            />
          </div>

          {/* Select coupon city */}
          <div className="flex flex-col">
            <label
              htmlFor="city"
              className="font-redhat font-semibold text-base mb-4"
            >
              Select coupon city
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
                Select city
              </MenuItem>
              <MenuItem value="diesel">Diesel</MenuItem>
              <MenuItem value="petrol">Petrol</MenuItem>
            </TextField>
          </div>

          {/* Min amount */}
          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="font-redhat font-semibold text-base mb-4"
            >
              Min amount (spend in app)
            </label>
            <TextField
              id="amount"
              variant="outlined"
              size="small"
              type="number"
              value={formData.min_amount}
              onChange={(e) => handleChange("min_amount", e.target.value)}
              inputProps={{ step: 1, min: 0 }}
              fullWidth
            />
          </div>

          {/* For how many rides */}
          <div className="flex flex-col">
            <label
              htmlFor="rides"
              className="font-redhat font-semibold text-base mb-4"
            >
              For how many rides
            </label>
            <TextField
              id="rides"
              variant="outlined"
              size="small"
              type="number"
              value={formData.usage_limit}
              onChange={(e) => handleChange("usage_limit", e.target.value)}
              inputProps={{ step: 1, min: 0 }}
              fullWidth
            />
          </div>

          {/* Select applicable customers from list */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-category"
              className="font-redhat font-semibold text-base mb-4"
            >
              Select applicable customers from list
            </label>
            <TextField
              id="fuel-category"
              select
              placeholder="Select fuel category"
              variant="outlined"
              size="small"
              value={formData.fuelCategory}
              onChange={(e) => handleChange("fuelCategory", e.target.value)}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                IconComponent: ExpandMoreIcon,
              }}
            >
              <MenuItem value="" disabled>
                Select customers
              </MenuItem>
              <MenuItem value="regular">Regular</MenuItem>
              <MenuItem value="premium">Premium</MenuItem>
            </TextField>
          </div>
          {/* Reward amount */}
          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="font-redhat font-semibold text-base mb-4"
            >
              Reward amount
            </label>
            <TextField
              id="amount"
              placeholder="€ 11"
              variant="outlined"
              size="small"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              fullWidth
            />
          </div>

          {/* Fow how many rides */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-type"
              className="font-redhat font-semibold text-base mb-4"
            >
              Fow how many rides
            </label>
            <TextField
              id="fuel-type"
              select
              variant="outlined"
              size="small"
              value={formData.fuelType}
              onChange={(e) => handleChange("fuelType", e.target.value)}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                IconComponent: ExpandMoreIcon,
              }}
            >
              <MenuItem value="" disabled>
                5
              </MenuItem>
              <MenuItem value="diesel">4</MenuItem>
              <MenuItem value="petrol">3</MenuItem>
            </TextField>
          </div>
          <div className="flex flex-col justify-end">
            <Button
              variant="contained"
              onClick={onSave}
              sx={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                borderRadius: "8px",
                width: "100%",
                paddingX: "16px",
                paddingY: "8px",
                "&:hover": {
                  backgroundColor: "#333333",
                },
              }}
            >
              Add coupon
            </Button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end mt-6"></div>
      </Box>
    </Modal>
  );
};

export default CreateNewRewardModal;
