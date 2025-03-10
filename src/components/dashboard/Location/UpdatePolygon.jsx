/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from "react";
import BackArrow from "../../../assets/leftArrowBlack.svg";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GoogleMap, Marker, Polygon } from "@react-google-maps/api";
import useGoogleMapsLoader from "../../../useGoogleMapsLoader";
import LoadingAnimation from "../../common/LoadingAnimation";

const DEFAULT_CENTER = { lat: 38.7169, lng: -9.1399 };
const zoneColors = {
  YELLOW_ZONE: "yellow",
  BLUE_ZONE: "blue",
  RED_ZONE: "red",
};

const UpdatePolygon = ({
  isZone,
  entityId,
  setEntityId,
  setActiveComponent,
}) => {
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [polygonCoords, setPolygonCoords] = useState([]);
  const [cityCoords, setCityCoords] = useState([]);
  const [initialCoords, setInitialCoords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState("");
  const [entityData, setEntityData] = useState("");
  const [zoneName, setZoneName] = useState("");
  const [zoneType, setZoneType] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [prevZones, setPrevZones] = useState([]);

  const { isLoaded, loadError } = useGoogleMapsLoader();
  const polygonRef = useRef(null);

  const calculatePolygonCentroid = (coords) => {
    let area = 0;
    let centroidX = 0;
    let centroidY = 0;

    for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
      const lat1 = coords[i].lat;
      const lng1 = coords[i].lng;
      const lat2 = coords[j].lat;
      const lng2 = coords[j].lng;

      const factor = lat1 * lng2 - lat2 * lng1;
      area += factor;
      centroidX += (lat1 + lat2) * factor;
      centroidY += (lng1 + lng2) * factor;
    }

    if (area === 0) return coords[0]; // Fallback to the first point if area is zero (e.g., line segment).

    area /= 2;
    centroidX = centroidX / (6 * area);
    centroidY = centroidY / (6 * area);

    return { lat: centroidX, lng: centroidY };
  };

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
        if (isZone) {
          const zoneData = result?.data?.zone;
          const polygon = zoneData?.location?.coordinates[0].map(
            ([lng, lat]) => ({ lat, lng })
          );
          const cityPolygon = zoneData?.city_id?.location?.coordinates[0].map(
            ([lng, lat]) => ({ lat, lng })
          );
          setEntityData(zoneData);
          setPolygonCoords(polygon);
          setInitialCoords(polygon);
          setCityCoords(cityPolygon);
          setZoneName(zoneData?.name);
          setZoneType(zoneData?.zone_type);
          setMapCenter({
            lat: zoneData?.center_location?.coordinates[1],
            lng: zoneData?.center_location?.coordinates[0],
          });
        } else {
          const cityData = result?.data?.city;
          const polygon = cityData?.location?.coordinates[0].map(
            ([lng, lat]) => ({ lat, lng })
          );
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

  const onPolygonLoad = (polygon) => {
    polygonRef.current = polygon;
  };

  const updatePolygonCoords = useCallback(() => {
    if (!polygonRef.current) return;
    const newCoords = polygonRef.current
      .getPath()
      .getArray()
      .map((point) => ({ lat: point.lat(), lng: point.lng() }));
    setPolygonCoords(newCoords);
    setIsEdited(true);
    const newCenter = calculatePolygonCentroid(newCoords);
    setMapCenter(newCenter);
  }, []);

  const fetchPrevZones = useCallback(async () => {
    setError("");
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/zones?page=1&limit=100&city_id=${
          entityData?.city_id?.id
        }`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setPrevZones(result?.data?.zones?.results);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    }
  }, [entityData?.city_id?.id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  useEffect(() => {
    if (polygonRef.current) {
      const path = polygonRef.current.getPath();
      path.addListener("set_at", updatePolygonCoords);
      path.addListener("insert_at", updatePolygonCoords);
      path.addListener("remove_at", updatePolygonCoords);
    }
  }, [polygonCoords, updatePolygonCoords]);

  useEffect(() => {
    isZone && entityData?.city_id?.id && fetchPrevZones();
  }, [fetchPrevZones, entityData?.city_id?.id, isZone]);

  const handleReset = () => {
    setPolygonCoords(initialCoords);
    setIsEdited(false);
    setMapCenter({
      lat: entityData?.center_location?.coordinates[1],
      lng: entityData?.center_location?.coordinates[0],
    });
  };

  const isDisabled = () => {
    if (isZone) {
      return (
        !isEdited &&
        zoneType === entityData?.zone_type &&
        zoneName?.trim() === entityData?.name
      );
    }
    return !isEdited;
  };

  const getStrokeColor = () => {
    if (!isZone) return "green";
    if (isZone && zoneType === "RED_ZONE") {
      return "#FF0000";
    } else if (isZone && zoneType === "BLUE_ZONE") {
      return "blue";
    }
    return "yellow";
  };

  const getOpacityColor = () => {
    if (!isZone) return "#90EE90";
    if (isZone && zoneType === "RED_ZONE") {
      return "#FF7F7F";
    } else if (isZone && zoneType === "BLUE_ZONE") {
      return "#87CEFA";
    }
    return "#FFFF99";
  };

  const handleUpdate = async () => {
    setError("");
    setButtonLoading(true);

    const formattedCoords = polygonCoords.map(({ lat, lng }) => [lng, lat]);

    const data = isZone
      ? {
          name: zoneName,
          zone_type: zoneType,
          city_id: entityData?.city_id?.id,
          country_id: entityData?.country_id?.id,
          color: getStrokeColor(),
          location: {
            coordinates: [formattedCoords],
          },
          center_location: {
            coordinates: [mapCenter?.lng, mapCenter?.lat],
          },
        }
      : {
          country_code: entityData?.country_id?.id?.iso_code,
          name: entityData?.name,
          country_id: entityData?.country_id?.id,
          location: {
            type: "Polygon",
            coordinates: [formattedCoords],
          },
          city_lat_lng: {
            type: "Point",
            coordinates: [mapCenter?.lng, mapCenter?.lat],
          },
          airport_business: true,
          city_business: true,
          zone_business: true,
          is_business: true,
        };

    const url = isZone
      ? `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/zones/update/${entityId}`
      : `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/city/update-city/${entityId}`;

    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
        credentials: "include",
      });
      const result = await res?.json();
      if (result?.success) {
        isZone
          ? setActiveComponent("Zones")
          : setActiveComponent("AddLocation");
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setButtonLoading(false);
    }
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

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <p className="text-gray">
          {isZone ? "Dashboard > " : "Location > "}
          <span className="text-black">
            {isZone ? "Zones" : "Add Location"}
          </span>
          {" > "}
          <span className="text-black">
            {isZone ? "Update zone" : "Update City"}
          </span>
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
                <MenuItem value="RED_ZONE">
                  Red zone (Maximum demand area)
                </MenuItem>
                <MenuItem value="YELLOW_ZONE">
                  Yellow zone (Medium demand area)
                </MenuItem>
                <MenuItem value="BLUE_ZONE">
                  Blue zone (Minimum demand area)
                </MenuItem>
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
        {isZone
          ? "Update the zone boundary from dragging the polygon visible on map. Make sure that the boundaries of your updated zone should not cross the boundary lines of city which is marked as green polygon. You can expand or compress the boundaries by dragging polygon corners which is visible in the map."
          : "Update the city boundary from dragging the polygon visible on map. Make sure the city boundary covers all area that you want to cover in that city and provide service. You can expand or compress the boundaries by dragging polygon corners which is visible in map."}
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
            editable
            ref={polygonRef}
            onLoad={onPolygonLoad}
            onMouseUp={updatePolygonCoords}
            options={{
              strokeColor: `${getStrokeColor()}`,
              strokeWeight: 4,
              fillColor: `${getOpacityColor()}`,
              fillOpacity: 0.8,
              strokeOpacity: 1,
              editable: true,
            }}
          />
        )}
        {isZone && (
          <Polygon
            paths={cityCoords}
            options={{
              strokeColor: "green",
              strokeWeight: 6,
              fillColor: "#90EE90",
              fillOpacity: 0.2,
              strokeOpacity: 1,
            }}
          />
        )}

        {isZone &&
          prevZones?.length > 0 &&
          prevZones?.map((zone) => {
            const { coordinates } = zone.location;
            const polygonPath = coordinates[0].map(([lng, lat]) => ({
              lat,
              lng,
            }));
            return (
              <React.Fragment key={zone?.id}>
                {zone?.id !== entityId && (
                  <Polygon
                    paths={polygonPath}
                    options={{
                      fillColor: zoneColors[zone?.zone_type] || "gray",
                      fillOpacity: 0.4,
                      strokeColor: zoneColors[zone?.zone_type] || "gray",
                      strokeOpacity: 1,
                      strokeWeight: 1,
                      draggable: false,
                      editable: false,
                    }}
                  />
                )}
                {zone?.id !== entityId && (
                  <Marker
                    position={{
                      lat: zone?.center_location?.coordinates[1],
                      lng: zone?.center_location?.coordinates[0],
                    }}
                    label={{
                      text: zone?.name,
                      color: "black",
                      fontWeight: "bold",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
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
          variant="contained"
          disabled={isDisabled()}
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
          {buttonLoading ? (
            <LoadingAnimation height={30} width={30} />
          ) : isZone ? (
            "Update zone"
          ) : (
            "Update city"
          )}
        </Button>
      </Stack>
    </>
  );
};

export default UpdatePolygon;
