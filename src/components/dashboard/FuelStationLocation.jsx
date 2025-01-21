import React, { useState } from "react";
import { IconButton, TextField, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GoogleMap } from "@react-google-maps/api";
import useGoogleMapsLoader from "../../useGoogleMapsLoader";

const FuelStationLocation = () => {
  const [partnerStation, setPartnerStation] = useState("");
  const { isLoaded, loadError } = useGoogleMapsLoader();

  if (loadError) {
    return <p>Error loading Google Maps: {loadError.message}</p>;
  }

  if (!isLoaded) {
    return <p>Loading Google Maps...</p>;
  }

  return (
    <div
      className="rounded-lg flex-grow flex flex-col bg-white py-6 px-4"
      style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
    >
      <div className="flex justify-between items-center">
        <p className="font-redhat font-semibold text-base">Quick search</p>
        <IconButton aria-label="options">
          <MoreHorizIcon />
        </IconButton>
      </div>
      <div className="pt-8 flex flex-col gap-4 pb-6 border-b border-[#DDDDDD] border-dashed ">
        <div className="flex flex-col">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-4"
          >
            Select fuel station to view locaion
          </label>
          <TextField
            id="fuel-type"
            select
            variant="outlined"
            size="small"
            value={partnerStation}
            onChange={(e) => setPartnerStation(e.target.value)}
            fullWidth
            SelectProps={{
              displayEmpty: true,
              IconComponent: ExpandMoreIcon,
            }}
          >
            <MenuItem value="" disabled>
              Select partner fuel station
            </MenuItem>
            <MenuItem value="diesel">Diesel</MenuItem>
            <MenuItem value="petrol">Petrol</MenuItem>
          </TextField>
        </div>
      </div>
      <p className="font-sans text-base pt-6">
        <span className="text-[#777777]">Address :</span> Opposite DEF company
        office, Mall Road, Snta street, Aviero Portugal. 110091
      </p>
      <div className="flex-grow pt-6">
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "" }}
          //   center={getCenter()}
          center={{ lat: 40.6413, lng: -8.6536 }}
          zoom={12}
          //   zoom={polygon.length > 0 ? 10 : 3}
          //   onLoad={(map) => (mapRef.current = map)}
        ></GoogleMap>
      </div>
    </div>
  );
};

export default FuelStationLocation;
