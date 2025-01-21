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
import LocationOnIcon from "@mui/icons-material/LocationOn";

const AddNewEmployeeModal = ({
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
            <div>
              <p className="text-lg font-semibold text-black">
                Add new employee
              </p>
              <p className="text-sm text-gray-500">
                Please fill in the below details to add your employee.
              </p>
            </div>
          </div>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Employee full name */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-card-name"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Employee full name
            </label>
            <TextField
              id="fuel-card-name"
              placeholder="Enter full name"
              variant="outlined"
              size="small"
              value={formData.cardName}
              onChange={(e) => handleChange("cardName", e.target.value)}
              fullWidth
            />
          </div>

          {/* Employee ID */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-type"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Employee ID
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
                Enter ID (number)
              </MenuItem>
              <MenuItem value="diesel">Diesel</MenuItem>
              <MenuItem value="petrol">Petrol</MenuItem>
            </TextField>
          </div>

          {/* Employee email address */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-category"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Employee email address
            </label>
            <TextField
              id="fuel-category"
              placeholder="Enter official email"
              variant="outlined"
              size="small"
              value={formData.fuelCategory}
              onChange={(e) => handleChange("fuelCategory", e.target.value)}
              fullWidth
            />
          </div>

          {/* Employee phone number */}
          <div className="flex flex-col">
            <label
              htmlFor="fuel-stations"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Employee phone number
            </label>
            <TextField
              id="fuel-stations"
              placeholder="+351 xxxx xxx xx"
              variant="outlined"
              size="small"
              value={formData.fuelStations}
              onChange={(e) => handleChange("fuelStations", e.target.value)}
            />
          </div>

          {/* Select team */}
          <div className="flex flex-col">
            <label
              htmlFor="revenue-needed"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Select team
            </label>
            <TextField
              id="revenue-needed"
              select
              placeholder="Select team"
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
                Select team
              </MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>
          </div>

          {/* Select group */}
          <div className="flex flex-col">
            <label
              htmlFor="revenue-needed"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Select group
            </label>
            <TextField
              id="revenue-needed"
              select
              placeholder="Select group"
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
                Select group
              </MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>
          </div>

          {/* Card Limit */}
          <div className="flex flex-col">
            <label
              htmlFor="card-limit"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Enter area
            </label>
            <TextField
              id="card-limit"
              placeholder="Enter area"
              variant="outlined"
              size="small"
              value={formData.cardLimit}
              onChange={(e) => handleChange("cardLimit", e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Enter full address */}
          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Enter full address
            </label>
            <TextField
              id="amount"
              placeholder="Enter full address"
              variant="outlined"
              size="small"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              fullWidth
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6">
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
              width: "50%",
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
          >
            Add employee
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddNewEmployeeModal;
