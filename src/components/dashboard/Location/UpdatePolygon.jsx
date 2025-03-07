/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import BackArrow from "../../../assets/leftArrowBlack.svg";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GoogleMap, Marker, Polygon } from "@react-google-maps/api";
import useGoogleMapsLoader from "../../../useGoogleMapsLoader";
import LoadingAnimation from "../../common/LoadingAnimation";

const DEFAULT_CENTER = { lat: 38.7169, lng: -9.1399 };

const UpdatePolygon = ({ entityId, setEntityId, setActiveComponent }) => {
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [polygonCoords, setPolygonCoords] = useState([]);
  const [initialCoords, setInitialCoords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [entityData, setEntityData] = useState("");
  const [isZone, setIsZone] = useState(false);
  const [zoneName, setZoneName] = useState("");
  const [zoneType, setZoneType] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const { isLoaded, loadError } = useGoogleMapsLoader();

  const fetchDetails = useCallback(async () => {
    setError("");
    setLoading(true);

    const url = isZone
      ? `${import.meta.env.VITE_API_RIDE_URL}/super-admin/zones/${entityId}`
      : `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/city/get-city/${entityId}`;

    try {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const result = await res?.json();
      if (result?.success) {
        if (result?.data?.zone) {
          setIsZone(true);
          setEntityData(result?.data?.zone);
        } else {
          const cityData = result?.data?.city;
          const polygon = cityData?.location?.coordinates[0].map(
            ([lng, lat]) => ({ lat, lng })
          );
          setIsZone(false);
          setEntityData(cityData);
          setPolygonCoords(polygon);
          setInitialCoords(polygon);
          setMapCenter({
            lat: cityData?.center_location?.coordinates[1],
            lng: cityData?.center_location?.coordinates[0],
          });
        }
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [entityId, isZone]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const calculatePolygonCentroid = (coords) => {
    let area = 0;
    let centroidX = 0;
    let centroidY = 0;

    for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
      const lat1 = coords[i][1];
      const lng1 = coords[i][0];
      const lat2 = coords[j][1];
      const lng2 = coords[j][0];

      const factor = lat1 * lng2 - lat2 * lng1;
      area += factor;
      centroidX += (lat1 + lat2) * factor;
      centroidY += (lng1 + lng2) * factor;
    }

    area /= 2;
    centroidX = centroidX / (6 * area);
    centroidY = centroidY / (6 * area);

    return { lat: centroidX, lng: centroidY };
  };

  const handleUpdate = async () => {
    console.log("SAVE", polygonCoords);
    console.log("CENTER", mapCenter);
    // setError("");
    // setLoading(true);

    // const data = isZone
    //   ? {
    //       name: entityData?.name,
    //       zone_type: entityData?.zone_type,
    //       city_id: entityData?.city_id?.id,
    //       country_id: entityData?.country_id?.id,
    //       color: "#FF0000",
    //       location: {
    //         coordinates: [polygonCoords],
    //       },
    //       center_location: {
    //         coordinates: [mapCenter?.lng, mapCenter?.lat],
    //       },
    //     }
    //   : {
    //       country_code: entityData?.country_id?.id?.iso_code,
    //       name: entityData?.name,
    //       country_id: entityData?.country_id?.id,
    //       location: {
    //         type: "Polygon",
    //         coordinates: [polygonCoords],
    //       },
    //       city_lat_lng: {
    //         type: "Point",
    //         coordinates: [mapCenter?.lng, mapCenter?.lat],
    //       },
    //       airport_business: true,
    //       city_business: true,
    //       zone_business: true,
    //       is_business: true,
    //     };

    // const url = isZone
    //   ? `${
    //       import.meta.env.VITE_API_RIDE_URL
    //     }/super-admin/zones/update/${entityId}`
    //   : `${
    //       import.meta.env.VITE_API_RIDE_URL
    //     }/super-admin/city/update-city/${entityId}`;

    // try {
    //   const res = await fetch(url, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: "PUT",
    //     body: JSON.stringify(data),
    //     credentials: "include",
    //   });
    //   const result = await res?.json();
    //   if (result?.success) {
    //     setActiveComponent("AddLocation");
    //   } else {
    //     throw new Error(result?.message);
    //   }
    // } catch (error) {
    //   setError(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handlePolygonEdit = (polygon) => {
    const newCoords = polygon
      .getPath()
      .getArray()
      .map((point) => ({ lat: point.lat(), lng: point.lng() }));
    console.log(newCoords);
    setPolygonCoords(newCoords);
    setIsEdited(true);
    const newCenter = calculatePolygonCentroid(newCoords);
    setMapCenter(newCenter);
  };

  const redrawPolygon = () => {
    setPolygonCoords([]);
    setIsEdited(false);
    setMapCenter(null);
  };

  const handleReset = () => {
    setPolygonCoords(initialCoords);
    setIsEdited(false);
    setMapCenter({
      lat: entityData?.center_location?.coordinates[1],
      lng: entityData?.center_location?.coordinates[0],
    });
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (loading || !isLoaded) {
    return <LoadingAnimation width={500} height={500} />;
  }

  if (error) {
    return (
      <p className="text-lg text-red-400 font-bold">
        {error.message || "Error"}
      </p>
    );
  }

  console.log("CORDS", polygonCoords);
  console.log("Center", mapCenter);
  console.log("EDIT", isEdited);

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <p className="text-gray">
          {"Location > "}
          <span className="text-black">Add Location</span>
          {" > "}
          <span className="text-black">Add City</span>
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

      <div className="flex items-center gap-4 mt-8">
        <img
          src={BackArrow}
          alt="BackArrow"
          className="cursor-pointer"
          onClick={() => {
            setEntityId(null);
            isZone
              ? setActiveComponent("Zones")
              : setActiveComponent("AddLocation");
          }}
        />
        <p className="font-redhat font-semibold text-2xl">
          {isZone ? "Update zone" : "Update city"}
        </p>
      </div>

      {/* Dropdowns */}
      <div className="flex gap-20 mt-8">
        <div className="flex flex-col w-60">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Country
          </label>
          <TextField
            variant="outlined"
            size="small"
            value={entityData?.country_id?.name}
            fullWidth
            disabled
          />
        </div>
        <div className="flex flex-col w-60">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            City
          </label>
          <TextField
            variant="outlined"
            size="small"
            value={isZone ? entityData?.city_id?.name : entityData?.name}
            fullWidth
            disabled
          />
        </div>
        {isZone && (
          <>
            <div className="flex flex-col w-60">
              <label
                htmlFor="fuel-type"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Select zone type
              </label>
              <TextField
                id="fuel-type"
                select
                placeholder="Select map type"
                variant="outlined"
                size="small"
                value={zoneType}
                onChange={(e) => setZoneType(e.target.value)}
                fullWidth
                SelectProps={{
                  displayEmpty: true,
                  IconComponent: ExpandMoreIcon,
                }}
              >
                <MenuItem value="" disabled>
                  Select zone type
                </MenuItem>
                <MenuItem value="RED_ZONE">Heat zone</MenuItem>
                <MenuItem value="BLUE_ZONE">Blue zone</MenuItem>
                <MenuItem value="YELLOW_ZONE">Yellow zone</MenuItem>
              </TextField>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="fuel-card-name"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Enter zone name
              </label>
              <TextField
                id="fuel-card-name"
                placeholder="Enter zone name"
                variant="outlined"
                size="small"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                fullWidth
              />
            </div>
          </>
        )}
      </div>

      <p className="font-sans mt-8 font-semibold text-base">
        Mark the city boundary from the map. Make sure the city boundary covers
        all area that you want to cover in that city and provide service. You
        can search area or location from the search option in the map and make
        the boundary by simply clicking on the boundary points.
      </p>

      <GoogleMap
        mapContainerStyle={{
          height: "400px",
          width: "",
          marginTop: "32px",
          borderRadius: "16px",
        }}
        center={mapCenter}
        zoom={12}
        onLoad={(map) => {
          const bounds = new window.google.maps.LatLngBounds();
          polygonCoords.forEach((coord) => bounds.extend(coord));
          map.fitBounds(bounds);
        }}
      >
        {polygonCoords.length > 0 && (
          <Polygon
            paths={polygonCoords}
            draggable
            editable
            onMouseUp={(e) => handlePolygonEdit(e.overlay)}
            options={{
              strokeColor: "green",
              strokeWeight: 4,
              fillColor: "#90EE90",
              fillOpacity: 0.4,
              strokeOpacity: 1,
              editable: true,
              draggable: true,
            }}
          />
        )}
        {mapCenter && <Marker position={mapCenter} />}
      </GoogleMap>

      <Stack direction="row" spacing={2} marginTop="32px">
        <Button
          variant="outlined"
          sx={{
            borderColor: "black",
            color: "black",
            textTransform: "none",
            padding: "5px 60px",
            borderRadius: "8px",
            fontSize: "14px",
            "&:hover": {
              borderColor: "black",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: "black",
            color: "black",
            textTransform: "none",
            padding: "5px 60px",
            borderRadius: "8px",
            fontSize: "14px",
            "&:hover": {
              borderColor: "black",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
          onClick={redrawPolygon}
        >
          Redraw
        </Button>
        <Button
          variant="contained"
          // disabled={!isEdited && polygonCoords}
          sx={{
            backgroundColor: "black",
            color: "white",
            textTransform: "none",
            padding: "5px 60px",
            borderRadius: "8px",
            fontSize: "14px",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
          onClick={handleUpdate}
        >
          Update zone
        </Button>
      </Stack>
    </>
  );
};

export default UpdatePolygon;
