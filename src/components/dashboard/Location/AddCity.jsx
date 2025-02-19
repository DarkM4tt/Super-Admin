/* eslint-disable react/prop-types */
import { useCallback, useRef, useState } from "react";
import BackArrow from "../../../assets/leftArrowBlack.svg";
import SearchIcon from "@mui/icons-material/Search";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  DrawingManager,
  GoogleMap,
  InfoWindow,
  StandaloneSearchBox,
  Marker,
  Polygon,
} from "@react-google-maps/api";
// import { Marker, Polygon } from "react-leaflet";
import useGoogleMapsLoader from "../../../useGoogleMapsLoader";
import LoadingAnimation from "../../common/LoadingAnimation";

const DEFAULT_CENTER = { lat: 38.7169, lng: -9.1399 };

const AddCity = ({ setActiveComponent }) => {
  const [disabled, setDisabled] = useState(true);
  const [drawingControlEnabled, setDrawingControlEnabled] = useState(true);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [polygon, setPolygon] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const drawingManagerRef = useRef(null);
  const polygonRef = useRef(null);
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

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

  const handleReset = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }
    setPolygon([]);
    setDrawingControlEnabled(true);
    setMapCenter(DEFAULT_CENTER);
    setMarkerPosition(null);
    drawingManagerRef.current.setDrawingMode(
      window.google.maps.drawing.OverlayType.POLYGON
    );
  };

  console.log(setDisabled);

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

      <div className="flex justify-between items-center mt-8">
        <div className="flex items-center gap-4">
          <img
            src={BackArrow}
            alt="BackArrow"
            className="cursor-pointer"
            onClick={() => {
              setActiveComponent("AddLocation");
            }}
          />
          <p className="font-redhat font-semibold text-2xl">Add location</p>
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
          Add and publish
        </Button>
      </div>

      {/* Dropdowns */}
      <div className="flex gap-20 mt-8">
        <div className="flex flex-col w-60">
          <label
            htmlFor="fuel-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Select country to add
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
            Add city
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
      </div>

      <p className="font-sans mt-8 font-semibold text-base">
        Mark the city boundary from the map. Make sure the city boundary covers
        all area that you want to cover in that city and provide service. You
        can search area or location from the search option in the map and make
        the boundary by simply clicking on the boundary points.
      </p>

      <GoogleMap
        mapContainerStyle={{
          height: "700px",
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

      <Stack direction="row" spacing={2} marginTop="32px">
        {/* Reset boundary area button */}
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
          Reset boundary area
        </Button>

        {/* Save and confirm button */}
        <Button
          variant="contained"
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
        >
          Save and confirm
        </Button>
      </Stack>
    </>
  );
};

export default AddCity;
