/* eslint-disable react/prop-types */
import {
  Modal,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  IconButton,
  Box,
  ToggleButtonGroup,
  ToggleButton,
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
  const [selected, setSelected] = useState("Customers");

  const handleSwitchChange = (event) => {
    setSelected(event.target.value);
  };

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

        {/* Switches */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: 2,
          }}
        >
          <FormControlLabel
            control={
              <Radio
                checked={selected === "Drivers"}
                onChange={handleSwitchChange}
                value="Drivers"
                sx={{
                  "&.Mui-checked": {
                    color: "#00cbc4",
                  },
                  color: "#6d6d6d",
                }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "black",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Drivers
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Radio
                checked={selected === "Customers"}
                onChange={handleSwitchChange}
                value="Customers"
                sx={{
                  "&.Mui-checked": {
                    color: "#00cbc4",
                  },
                  color: "#6d6d6d",
                }}
              />
            }
            label={
              <Typography
                sx={{
                  color: "black",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Customers
              </Typography>
            }
          />
        </Box>

        {/* Modal Body */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Student coupon */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-card-name"
              className="font-redhat font-semibold text-base mb-4"
            >
              Select reward sector
            </label>
            <TextField
              id="fuel-card-name"
              placeholder="Student coupon"
              variant="outlined"
              size="small"
              value={formData.cardName}
              onChange={(e) => handleChange("cardName", e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ExpandMoreIcon sx={{ color: "black" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Select service type */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-type"
              className="font-redhat font-semibold text-base mb-4"
            >
              Select service type
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
                Intercity
              </MenuItem>
              <MenuItem value="diesel">Diesel</MenuItem>
              <MenuItem value="petrol">Petrol</MenuItem>
            </TextField>
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
        <div className="flex justify-end mt-6">
         
        </div>
      </Box>
    </Modal>
  );
};

export default CreateNewRewardModal;
