/* eslint-disable react/prop-types */
import SearchIcon from "@mui/icons-material/Search";
import BackArrow from "../../../assets/leftArrowBlack.svg";
import { MenuItem, TextField } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoadingAnimation from "../../common/LoadingAnimation";
import useGoogleMapsLoader from "../../../useGoogleMapsLoader";
import {
  DrawingManager,
  GoogleMap,
  InfoWindow,
  Marker,
  Polygon,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const DEFAULT_CENTER = { lat: 38.7169, lng: -9.1399 };

const NewZone = ({ setActiveComponent }) => {
  const [zoneName, setZoneName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [mapType, setMapType] = useState("");
  const drawingManagerRef = useRef(null);
  const polygonRef = useRef(null);
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [drawingControlEnabled, setDrawingControlEnabled] = useState(true);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [polygon, setPolygon] = useState([]);

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

  const onOverlayComplete = useCallback((e) => {
    if (e.type === "polygon") {
      if (polygonRef.current) {
        polygonRef.current.setMap(null);
      }

      const path = e.overlay.getPath();
      const coordinates = [];

      for (let i = 0; i < path.getLength(); i++) {
        const point = path.getAt(i);
        coordinates.push([point.lng(), point.lat()]);
      }

      if (
        coordinates.length > 0 &&
        coordinates[0] !== coordinates[coordinates.length - 1]
      ) {
        coordinates.push(coordinates[0]);
      }

      setPolygon(coordinates);
      polygonRef.current = e.overlay;
      setDrawingControlEnabled(false);

      const centroid = calculatePolygonCentroid(coordinates);
      setMapCenter(centroid);
      setMarkerPosition(centroid);
    }
  }, []);

  const handleSearchPlaces = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;
    const location = places[0].geometry.location;
    setMapCenter({ lat: location.lat(), lng: location.lng() });
    mapRef.current.panTo(location);
    mapRef.current.setZoom(10); // Zoom in to the selected location
  };

  //   const handleReset = () => {
  //     if (polygonRef.current) {
  //       polygonRef.current.setMap(null);
  //       polygonRef.current = null;
  //     }
  //     setPolygon([]);
  //     setDrawingControlEnabled(true);
  //     setMapCenter(DEFAULT_CENTER);
  //     setMarkerPosition(null);
  //     drawingManagerRef.current.setDrawingMode(
  //       window.google.maps.drawing.OverlayType.POLYGON
  //     );
  //   };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return (
      <div>
        <LoadingAnimation height={500} width={500} />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        {"> Dashboard"}
        <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>

      <p className="font-redhat font-semibold text-2xl mt-8">
        <img
          src={BackArrow}
          alt="BackArrow"
          className="cursor-pointer inline mr-4"
          onClick={() => {
            setActiveComponent("Zones");
          }}
        />
        Overview
      </p>
      <p className="font-redhat font-normal text-sm text-[#777777] mt-2">
        Create, edit or switch on-off your zone.
      </p>

      <p className="font-redhat font-bold text-3xl mt-8">Create new zone</p>
      <p className="font-sans font-semibold text-2xl mt-4">
        Enter the map details
      </p>

      {/* Dropdowns */}
      <div className="flex justify-between mt-8">
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
        <div className="flex flex-col w-60">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Select country
          </label>
          <TextField
            id="fuel-type"
            select
            placeholder="Select fuel type"
            variant="outlined"
            size="small"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            SelectProps={{
              displayEmpty: true,
              IconComponent: ExpandMoreIcon,
            }}
          >
            <MenuItem value="" disabled>
              Select country
            </MenuItem>
            <MenuItem value="diesel">Portugal</MenuItem>
            <MenuItem value="petrol">India</MenuItem>
            <MenuItem value="pedfsfdstrol">Pakistan</MenuItem>
            <MenuItem value="petvdsvdfsrol">Nigeria</MenuItem>
          </TextField>
        </div>
        <div className="flex flex-col w-60">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Select city
          </label>
          <TextField
            id="fuel-type"
            select
            placeholder="Select fuel type"
            variant="outlined"
            size="small"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            SelectProps={{
              displayEmpty: true,
              IconComponent: ExpandMoreIcon,
            }}
          >
            <MenuItem value="" disabled>
              Select city
            </MenuItem>
            <MenuItem value="diesel">Porto</MenuItem>
            <MenuItem value="petrol">Aviero</MenuItem>
            <MenuItem value="petrol">New Delhi</MenuItem>
            <MenuItem value="petrol">Lahore</MenuItem>
          </TextField>
        </div>
        <div className="flex flex-col w-60">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Select map type
          </label>
          <TextField
            id="fuel-type"
            select
            placeholder="Select map type"
            variant="outlined"
            size="small"
            value={mapType}
            onChange={(e) => setMapType(e.target.value)}
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
            <MenuItem value="petrol">Zone map</MenuItem>
            <MenuItem value="petrol">Driver map</MenuItem>
          </TextField>
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={{
          height: "400px",
          width: "",
          marginTop: "32px",
          borderRadius: "16px",
        }}
        center={mapCenter}
        zoom={polygon.length > 0 ? 10 : 3}
        onLoad={(map) => (mapRef.current = map)}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={handleSearchPlaces}
        >
          <input
            type="text"
            placeholder="Search places..."
            className="absolute top-2 left-52 w-64 p-2 rounded-md border border-gray-300"
          />
        </StandaloneSearchBox>

        <DrawingManager
          onLoad={(manager) => (drawingManagerRef.current = manager)}
          onOverlayComplete={onOverlayComplete}
          options={{
            drawingControl: drawingControlEnabled,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
            },
            polygonOptions: { editable: true, draggable: true },
          }}
        />

        {polygon.length > 0 && (
          <Polygon
            paths={polygon}
            options={{
              fillColor: "#2196F3",
              fillOpacity: 0.4,
              strokeColor: "#2196F3",
              strokeOpacity: 1,
              strokeWeight: 2,
              editable: true,
              draggable: true,
            }}
          />
        )}

        {markerPosition && (
          <Marker
            position={markerPosition}
            onClick={() => setShowInfoWindow(true)}
          />
        )}

        {showInfoWindow && markerPosition && (
          <InfoWindow
            position={markerPosition}
            onCloseClick={() => setShowInfoWindow(false)}
          >
            <div>Center of Polygon</div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
};

export default NewZone;
