import { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AllowedServices = () => {
  const [disabled, setDisabled] = useState(true);
  const [services, setServices] = useState({
    save: false,
    share: false,
    green: false,
    xl: false,
    luxury: false,
    van: false,
    package: false,
  });

  const handleChange = (event) => {
    setServices({
      ...services,
      [event.target.name]: event.target.checked,
    });
  };

  console.log(setDisabled);

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <p className="text-gray">
          {"Location > "}
          <span className="text-black">Bidding</span>
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

      <div className="flex justify-between items-center mt-8">
        <div className="flex flex-col">
          <p className="font-redhat font-semibold text-2xl">Bidding</p>
          <p className="font-sans font-normal text-lg text-gray">
            The bidding changes will be only done in the selected location, save
            changes to apply.{" "}
          </p>
        </div>
        <Button
          variant="contained"
          disabled={disabled}
          sx={{
            backgroundColor: disabled ? "gray" : "black",
            color: "white",
            textTransform: "none",
            borderRadius: "18px",
            padding: "8px 16px",
            fontSize: "16px",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: disabled
                ? "rgba(128, 128, 128, 1)"
                : "rgba(0, 0, 0, 0.9)",
            },
          }}
        >
          Save changes
        </Button>
      </div>

      <div className="flex gap-8 mt-14 items-center">
        {/* Select region */}
        <div className="flex flex-col w-[20%]">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Select region
          </label>
          <TextField
            id="fuel-type"
            select
            placeholder="Select fuel type"
            variant="outlined"
            size="small"
            // value={formData.fuelType}
            // onChange={(e) => handleChange("fuelType", e.target.value)}
            fullWidth
            SelectProps={{
              displayEmpty: true,
              IconComponent: ExpandMoreIcon,
            }}
          >
            <MenuItem value="" disabled>
              Select region
            </MenuItem>
            <MenuItem value="diesel">Diesel</MenuItem>
            <MenuItem value="petrol">Petrol</MenuItem>
          </TextField>
        </div>

        {/* Enable ride bidding */}
        <div className="flex flex-col w-[20%]">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Enable ride bidding
          </label>
          <TextField
            id="fuel-type"
            select
            placeholder="Enable ride bidding"
            variant="outlined"
            size="small"
            // value={formData.fuelType}
            // onChange={(e) => handleChange("fuelType", e.target.value)}
            fullWidth
            SelectProps={{
              displayEmpty: true,
              IconComponent: ExpandMoreIcon,
            }}
          >
            <MenuItem value="" disabled>
              Enable ride bidding
            </MenuItem>
            <MenuItem value="diesel">Heat map</MenuItem>
          </TextField>
        </div>
      </div>

      <div className="flex gap-8 mt-8 items-center">
        {/* Minimum amount needed for bidding */}
        <div className="flex flex-col w-[20%]">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Minimum amount needed for bidding
          </label>
          <TextField
            id="fuel-type"
            select
            placeholder="Minimum amount needed for bidding"
            variant="outlined"
            size="small"
            // value={formData.fuelType}
            // onChange={(e) => handleChange("fuelType", e.target.value)}
            fullWidth
            SelectProps={{
              displayEmpty: true,
              IconComponent: ExpandMoreIcon,
            }}
          >
            <MenuItem value="" disabled>
              Minimum amount needed for bidding
            </MenuItem>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </TextField>
        </div>

        {/* Set minimum budget */}
        <div className="flex flex-col w-[20%]">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Set minimum budget
          </label>
          <TextField
            id="fuel-type"
            select
            placeholder="Set minimum budget"
            variant="outlined"
            size="small"
            // value={formData.fuelType}
            // onChange={(e) => handleChange("fuelType", e.target.value)}
            fullWidth
            SelectProps={{
              displayEmpty: true,
              IconComponent: ExpandMoreIcon,
            }}
          >
            <MenuItem value="" disabled>
              Set minimum budget
            </MenuItem>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </TextField>
        </div>
      </div>

      <div className="mt-14">
        <p className="font-redhat font-semibold text-2xl">
          Select ride type for bidding
        </p>
        <p className="font-sans font-normal text-lg text-gray">
          This is the list of allowed services in that selected region.{" "}
        </p>
      </div>

      <div className="flex justify-between pt-10">
        <FormControlLabel
          control={
            <Checkbox
              checked={services.save}
              onChange={handleChange}
              name="save"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="BOLD Save"
          className="text-gray-800 text-sm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={services.share}
              onChange={handleChange}
              name="share"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="Share"
          className="text-gray-800 text-sm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={services.green}
              onChange={handleChange}
              name="green"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="BOLD Green"
          className="text-gray-800 text-sm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={services.xl}
              onChange={handleChange}
              name="xl"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="BOLD XL"
          className="text-gray-800 text-sm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={services.luxury}
              onChange={handleChange}
              name="luxury"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="BOLD Luxury"
          className="text-gray-800 text-sm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={services.van}
              onChange={handleChange}
              name="van"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="BOLD Van"
          className="text-gray-800 text-sm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={services.package}
              onChange={handleChange}
              name="package"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="Package"
          className="text-gray-800 text-sm"
        />
      </div>
    </>
  );
};

export default AllowedServices;
