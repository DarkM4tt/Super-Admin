/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import LoadingAnimation from "../../common/LoadingAnimation";

const AddPrices = ({ addLocationData, setActiveComponent }) => {
  const { countryId, cityId, zoneId, rideTypePrice } = addLocationData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rideTypes, setRideTypes] = useState([]);
  const [rows, setRows] = useState([
    {
      id: Date.now(),
      rideType: "",
      baseFare: "",
      kmCharge: "",
      waitingCharge: "",
      farePerMin: "",
      minimumFare: "",
    },
  ]);

  const fetchRideTypes = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/ride-types/?page=1&limit=100`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setRideTypes(result?.data?.results);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRideTypes();
  }, [fetchRideTypes]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        rideType: "",
        baseFare: "",
        kmCharge: "",
        waitingCharge: "",
        farePerMin: "",
        minimumFare: "",
      },
    ]);
  };

  const updateRow = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const validateForm = () => {
    return rows.every(
      (row) =>
        row.rideType &&
        Number(row.baseFare) > 0 &&
        Number(row.kmCharge) > 0 &&
        Number(row.waitingCharge) >= 0 &&
        Number(row.farePerMin) >= 0 &&
        Number(row.minimumFare) > 0
    );
  };

  const handleSubmit = async () => {
    if (rows.length === 0) {
      alert("Please add at least one row.");
      return;
    }

    if (!validateForm()) {
      alert("Please fill all fields with valid positive values.");
      return;
    }

    const payload = rows.map((row) => ({
      country_id: countryId,
      city_id: cityId,
      zone_id: zoneId,
      ride_type: row.rideType,
      ride_type_price: rideTypePrice,
      base_fare: parseFloat(row.baseFare),
      fare_per_km: parseFloat(row.kmCharge),
      waiting_charges_per_min: parseFloat(row.waitingCharge),
      fare_per_min: parseFloat(row.farePerMin),
      minimum_fare: parseFloat(row.minimumFare),
    }));

    if (!zoneId || rideTypePrice === "CITY_BASE") {
      delete payload.zone_id;
    }

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/ride-type-prices/create`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setActiveComponent("AddLocation");
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedRideTypes = rows.map((row) => row.rideType).filter(Boolean);

  if (error) {
    return (
      <p className="text-lg text-red-400 font-bold">
        {error.message || "Error"}
      </p>
    );
  }

  if (loading) {
    return <LoadingAnimation width={500} height={500} />;
  }

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <p className="text-gray">
          {"Location > "}
          <span className="text-black">Add Location</span>
          {" > "}
          <span className="text-black">Add Prices</span>
        </p>

        <div className="py-3 px-4 bg-[#fdfdfd] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>

      <p className="font-redhat font-bold text-3xl mt-8">
        Create non-zone (city) charges
      </p>

      <div className="p-6 bg-[#e7e6e6] mt-8">
        <h2 className="text-2xl font-semibold mb-12">
          Enter the pricing details
        </h2>

        {rows.map((row) => (
          <div key={row.id} className="flex gap-4 mb-4 items-center mt-8">
            <Select
              value={row.rideType}
              onChange={(e) => updateRow(row.id, "rideType", e.target.value)}
              displayEmpty
              className="w-48"
              sx={{ backgroundColor: "#fff" }}
            >
              <MenuItem value="" disabled>
                Select Ride Type
              </MenuItem>
              {rideTypes
                .filter(
                  (ride) =>
                    !selectedRideTypes.includes(ride._id) ||
                    ride._id === row.rideType
                )
                .map((ride) => (
                  <MenuItem key={ride._id} value={ride._id}>
                    {ride.name}
                  </MenuItem>
                ))}
            </Select>

            {[
              "baseFare",
              "kmCharge",
              "waitingCharge",
              "farePerMin",
              "minimumFare",
            ].map((field) => (
              <TextField
                key={field}
                type="number"
                label={`${field.replace(/([A-Z])/g, " $1")} (€)`}
                value={row[field]}
                onChange={(e) => updateRow(row.id, field, e.target.value)}
                inputProps={{ step: 0.1 }}
                sx={{ borderRadius: "10px" }}
              />
            ))}

            <DeleteIcon
              sx={{ color: "red", cursor: "pointer" }}
              onClick={() => deleteRow(row.id)}
            />
          </div>
        ))}

        {rows.length < rideTypes.length && (
          <button onClick={addRow} className="text-blue-600">
            + Click to add more field
          </button>
        )}

        <div className="mt-6">
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="bg-black text-white"
            disabled={rows.length === 0 || !validateForm()}
          >
            Save & Publish
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddPrices;
