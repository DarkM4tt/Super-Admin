import { useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RedIcon from "../../../assets/redPolygon.svg";
import YellowIcon from "../../../assets/yellowPolygon.svg";
import BlueIcon from "../../../assets/bluePolygon.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GoogleMap } from "@react-google-maps/api";
import useGoogleMapsLoader from "../../../useGoogleMapsLoader";

const Map = () => {
  const [disabled, setDisabled] = useState(true);
  console.log(setDisabled);
  const { isLoaded, loadError } = useGoogleMapsLoader();

  if (loadError) {
    return <p>Error loading Google Maps: {loadError.message}</p>;
  }

  if (!isLoaded) {
    return <p>Loading Google Maps...</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <p className="text-gray">
          {"Location > "}
          <span className="text-black">Map</span>
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
          <p className="font-redhat font-semibold text-2xl">Map</p>
          <p className="font-sans font-normal text-lg text-gray">
            This data is as per the demand which indicated the number of
            customer request and the driver availability in that area.{" "}
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

      <div className="flex justify-between items-center w-full mt-14">
        <div className="flex gap-8">
          {/* Select region */}
          <div className="flex flex-col w-48">
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

          {/* Select map type */}
          <div className="flex flex-col w-48">
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
                Select map type
              </MenuItem>
              <MenuItem value="diesel">Heat map</MenuItem>
            </TextField>
          </div>
        </div>

        {/* Legend Section */}
        <div className="flex items-center gap-4 flex-wrap max-w-96">
          <div className="flex items-center gap-2">
            <img
              src={RedIcon}
              alt="Maximum demand area"
              width="16"
              height="16"
            />
            <p className="text-sm m-0">Maximum demand area</p>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={YellowIcon}
              alt="Medium demand area"
              width="16"
              height="16"
            />
            <p className="text-sm m-0">Medium demand area</p>
          </div>

          <div className="flex items-center gap-2">
            <img src={BlueIcon} alt="Low demand area" width="16" height="16" />
            <p className="text-sm m-0">Low demand area</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl mt-8">
        <GoogleMap
          mapContainerStyle={{ height: "50vh", width: "100%" }}
          //   center={getCenter()}
          center={{ lat: 40.6413, lng: -8.6536 }}
          zoom={12}
          //   zoom={polygon.length > 0 ? 10 : 3}
          //   onLoad={(map) => (mapRef.current = map)}
        ></GoogleMap>
      </div>
    </>
  );
};

export default Map;
