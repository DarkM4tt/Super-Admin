import { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AllowedServices = () => {
  const [disabled, setDisabled] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [services, setServices] = useState({
    regular: false,
    miles: false,
    fuelCard: false,
    jumpstart: false,
    promotions: false,
    ads: false,
  });

  const handleChange = (event) => {
    setServices({
      ...services,
      [event.target.name]: event.target.checked,
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  console.log(setDisabled);

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <p className="text-gray">
          {"Location > "}
          <span className="text-black">Allowed services</span>
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
          <p className="font-redhat font-semibold text-2xl">Allowed services</p>
          <p className="font-sans font-normal text-lg text-gray">
            Manage and edit permission of the allowed services in one particular
            location. Note that your change will affect that service completely
            in the location.{" "}
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

        {/* Select preferred language */}
        <div className="flex flex-col w-[20%]">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Select map type
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
              Select preferred language
            </MenuItem>
            <MenuItem value="diesel">Heat map</MenuItem>
          </TextField>
        </div>

        {/* Select preferred payment gateway */}
        <div className="flex flex-col w-[20%]">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Select preferred payment gateway
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
              Stripe
            </MenuItem>
            <MenuItem value="diesel">Heat map</MenuItem>
          </TextField>
        </div>
      </div>

      <div className="mt-14">
        <p className="font-redhat font-semibold text-2xl">Allowed services</p>
        <p className="font-sans font-normal text-lg text-gray">
          This is the list of allowed services in that selected region.{" "}
        </p>
      </div>

      <div className="flex justify-between pt-10">
        <FormControlLabel
          control={
            <Checkbox
              checked={services.regular}
              onChange={handleChange}
              name="regular"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="Regular"
          className="text-gray-800 text-sm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={services.miles}
              onChange={handleChange}
              name="miles"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="BOLD Miles"
          className="text-gray-800 text-sm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={services.fuelCard}
              onChange={handleChange}
              name="fuelCard"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="Fuel Card"
          className="text-gray-800 text-sm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={services.jumpstart}
              onChange={handleChange}
              name="jumpstart"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="Jumpstart"
          className="text-gray-800 text-sm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={services.promotions}
              onChange={handleChange}
              name="promotions"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="Promotions"
          className="text-gray-800 text-sm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={services.ads}
              onChange={handleChange}
              name="ads"
              sx={{
                color: "#777777",
                "&.Mui-checked": {
                  color: "#18C4B8",
                },
              }}
            />
          }
          label="BOLD Ads"
          className="text-gray-800 text-sm"
        />
      </div>

      <div className="mt-14">
        <p className="font-redhat font-semibold text-2xl">Policies</p>
        <p className="font-sans font-normal text-lg text-gray">
          The change in policy will be done only on that particular region{" "}
        </p>
      </div>

      {/* Select policy type */}
      <div className="w-[20%] mt-8">
        <label
          htmlFor="fuel-type"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Select policy type
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
            Select policy type
          </MenuItem>
          <MenuItem value="diesel">Heat map</MenuItem>
        </TextField>
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
              fontWeight: 500,
              color: "#9e9e9e",
            },
            ".Mui-selected": { color: "#1976d2", fontWeight: "bold" },
            ".MuiTabs-indicator": { backgroundColor: "#1976d2" },
          }}
        >
          <Tab label="Customer" />
          <Tab label="Driver" />
          <Tab label="Partner" />
        </Tabs>
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

      <div className="mt-8 bg-[#eaeaea] w-[50%] p-6 rounded-[8px]">
        <p className="font-sans font-normal text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <p className="font-sans font-normal text-base mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </>
  );
};

export default AllowedServices;
