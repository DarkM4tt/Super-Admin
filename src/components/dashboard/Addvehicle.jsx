import PropTypes from "prop-types";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import crossIcon from "../../assets/crossIcon.svg";
import checkedIcon from "../../assets/checked.svg";
import uncheckedIcon from "../../assets/unchecked.svg";
import LoadingAnimation from "../common/LoadingAnimation";



const AddVehicle = ({
  formData,
  handleChange,
  handleAddVehicle,
  handleClose,
  buttonLoading,
  vehicleCategories,
  addError,
  categoryError,
}) => {

  const renderCheckboxGroup = (label, fieldName) => (
    <Box sx={{ flex: 1 }}>
      <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() =>
            handleChange({ target: { name: fieldName, value: true } })
          }
        >
          <IconButton sx={{ p: 0 }}>
            <img
              src={formData?.[fieldName] ? checkedIcon : uncheckedIcon}
              alt="yes"
            />
          </IconButton>
          <Typography variant="body2" sx={{ ml: 1 }}>
            Yes
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() =>
            handleChange({ target: { name: fieldName, value: false } })
          }
        >
          <IconButton sx={{ p: 0 }}>
            <img
              src={!formData?.[fieldName] ? checkedIcon : uncheckedIcon}
              alt="no"
            />
          </IconButton>
          <Typography variant="body2" sx={{ ml: 1 }}>
            No
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const isFormValid = Object.entries(formData).every(([key, value]) => {
    if (key === "fleet_id") {
      return true;
    }
    return typeof value === "string" ? value.trim() !== "" : value != null;
  });

  

  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="700">
          Add Vehicle
        </Typography>
        <img
          src={crossIcon}
          alt="crossIcon"
          className="cursor-pointer"
          onClick={handleClose}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            Registration number
          </Typography>
          <TextField
            name="registration_number"
            value={formData.registration_number.toUpperCase()}
            onChange={handleChange}
            placeholder="For example: 2MRA356"
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            ID (Optional)
          </Typography>
          <TextField
            name="fleet_id"
            value={formData.fleet_id}
            onChange={handleChange}
            placeholder="For example: 1234 - ABCD"
            fullWidth
            variant="outlined"
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            VIN
          </Typography>
          <TextField
            name="vin"
            value={formData.vin.toUpperCase()}
            onChange={handleChange}
            placeholder="For example: 2MRA356"
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            Brand name
          </Typography>
          <TextField
            name="brand_name"
            value={formData.brand_name}
            onChange={handleChange}
            placeholder="For example: 2MRA356"
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            Vehicle type
          </Typography>
          <TextField
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            placeholder="Select vehicle type"
            fullWidth
            select
            variant="outlined"
          >
            {vehicleCategories?.map((option) => (
              <MenuItem key={option.id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            Model
          </Typography>
          <TextField
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="For example: Model X"
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            Color
          </Typography>
          <TextField
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="For example: Red"
            fullWidth
            variant="outlined"
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        {renderCheckboxGroup("Pet friendly vehicle", "pet_friendly")}
        {renderCheckboxGroup("Jumpstart", "jump_start")}
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {renderCheckboxGroup("Rental", "rental")}
        <Box sx={{ flex: 1, display:"flex", gap:"8px" , alignItems:"center"}}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            Hourly charges
          </Typography>
          <TextField
            name="hourly_charges"
            value={formData.hourly_charges}
            onChange={handleChange}
            placeholder="In euro"
            sx={{flex:1}}
            variant="outlined"
            type="number"
            inputProps={{ min: 0 }}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddVehicle}
        disabled={buttonLoading || !isFormValid}
        sx={{
          backgroundColor: isFormValid ? "black" : "rgba(238, 238, 238, 1)",
          color: isFormValid ? "white" : "rgba(153, 153, 153, 1)",
          textTransform: "none",
          padding: "10px 15px",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: isFormValid ? "black" : "grey",
          },
        }}
      >
        {buttonLoading ? (
          <LoadingAnimation width={30} height={30} />
        ) : (
          "Add vehicle"
        )}
      </Button>

      <Box sx={{ mt: 3, color: "#aaa" }}>
        Lorem ipsum dolor sit amet consectetur. Turpis nunc auctor vel amet
        convallis non viverra. Vel aliquam cras scelerisque rhoncus nunc sed
        vitae aliquet morbi.
      </Box>

      {addError && <p className="mt-2 text-red-400">{addError}</p>}
      {(!vehicleCategories ||
        categoryError ||
        vehicleCategories?.length === 0) && (
        <p className="mt-2 text-red-400">
          No vehicle categories found, add it from Super Admin for this
          organization!
        </p>
      )}
    </Box>
  );
};

AddVehicle.propTypes = {
  formData: PropTypes.shape({
    registration_number: PropTypes.string.isRequired,
    fleet_id: PropTypes.string,
    vin: PropTypes.string.isRequired,
    brand_name: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    category_id: PropTypes.string.isRequired,
    pet_friendly: PropTypes.bool.isRequired,
    jump_start: PropTypes.bool.isRequired,
    rental: PropTypes.bool.isRequired,
    hourly_charges: PropTypes.number.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddVehicle: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  buttonLoading: PropTypes.bool.isRequired,
  vehicleCategories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  addError: PropTypes.string,
  categoryError: PropTypes.string,
};

export default AddVehicle;
