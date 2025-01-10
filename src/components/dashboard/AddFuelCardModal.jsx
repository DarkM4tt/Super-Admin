/* eslint-disable react/prop-types */
import {
  Modal,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import PercentIcon from "@mui/icons-material/Percent";
import fuelGasIcon from "../../assets/fuelcard.png"; // Adjust path as needed

const AddFuelCardModal = ({ open, onClose, formData, setFormData, onSave }) => {
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
            <img
              src={fuelGasIcon}
              alt="Fuel Gas Icon"
              className="w-10 h-10 mr-3"
            />
            <div>
              <p className="text-lg font-semibold text-black">Add fuel card</p>
              <p className="text-sm text-gray-500">
                The maximum limit will be from the total revenue generated.
              </p>
            </div>
          </div>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Fuel Card Name */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-card-name"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Fuel card name
            </label>
            <TextField
              id="fuel-card-name"
              placeholder="Enter fuel card name"
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

          {/* Fuel Type */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-type"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Fuel type
            </label>
            <TextField
              id="fuel-type"
              select
              placeholder="Select fuel type"
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
                Select fuel type
              </MenuItem>
              <MenuItem value="diesel">Diesel</MenuItem>
              <MenuItem value="petrol">Petrol</MenuItem>
            </TextField>
          </div>

          {/* Fuel Category */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-category"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Fuel category
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
                Select fuel category
              </MenuItem>
              <MenuItem value="regular">Regular</MenuItem>
              <MenuItem value="premium">Premium</MenuItem>
            </TextField>
          </div>

          {/* Partner Fuel Stations */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-stations"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Partner fuel stations
            </label>
            <TextField
              id="fuel-stations"
              select
              placeholder="Select partner fuel stations"
              variant="outlined"
              size="small"
              value={formData.fuelStations}
              onChange={(e) => handleChange("fuelStations", e.target.value)}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                IconComponent: ExpandMoreIcon,
              }}
            >
              <MenuItem value="" disabled>
                Select fuel stations
              </MenuItem>
              <MenuItem value="station1">Station 1</MenuItem>
              <MenuItem value="station2">Station 2</MenuItem>
            </TextField>
          </div>

          {/* Card Limit */}
          <div className="flex flex-col">
            <label
              htmlFor="card-limit"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Card limit
            </label>
            <TextField
              id="card-limit"
              placeholder="Enter maximum limit"
              variant="outlined"
              size="small"
              value={formData.cardLimit}
              onChange={(e) => handleChange("cardLimit", e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PercentIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Revenue Needed */}
          <div className="flex flex-col">
            <label
              htmlFor="revenue-needed"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Revenue needed to apply
            </label>
            <TextField
              id="revenue-needed"
              select
              placeholder="Minimum revenue needed to apply"
              variant="outlined"
              size="small"
              value={formData.revenueNeeded}
              onChange={(e) => handleChange("revenueNeeded", e.target.value)}
              fullWidth
              SelectProps={{
                displayEmpty: true,
                IconComponent: ExpandMoreIcon,
              }}
            >
              <MenuItem value="" disabled>
                Minimum revenue needed to apply
              </MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </label>
            <TextField
              id="amount"
              placeholder="Enter minimum revenue"
              variant="outlined"
              size="small"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              fullWidth
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end mt-6">
          <Button
            variant="contained"
            onClick={onSave}
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              paddingX: "16px",
              paddingY: "8px",
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
          >
            Save and add fuel card
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddFuelCardModal;
