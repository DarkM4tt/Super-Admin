/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { Button, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import LoadingAnimation from "../../common/LoadingAnimation";
import BackArrow from "../../../assets/leftArrowBlack.svg";

const UpdateRideTypePrices = ({
  isZone,
  priceId,
  setPriceId,
  setActiveComponent,
}) => {
  const [rideTypes, setRideTypes] = useState([]);
  const [rideTypePrices, setRideTypePrices] = useState([]);
  const [formData, setFormData] = useState({
    city_id: "",
    country_id: "",
    zone_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newRows, setNewRows] = useState([]);

  const fetchRideTypes = useCallback(async () => {
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
      const result = await res.json();
      if (result?.success) setRideTypes(result?.data?.rideTypes?.results || []);
      else throw new Error(result?.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRideTypePrices = useCallback(async () => {
    setLoading(true);
    const url = isZone
      ? `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/ride-type-prices?zone_id=${priceId}`
      : `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/ride-type-prices?city_id=${priceId}`;

    try {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (result?.success) {
        const data = result?.data?.zoneRideTypes?.results;
        setRideTypePrices(data || []);
        setFormData({
          country_id: data.country_id,
          city_id: data.city_id,
          zone_id: data.country_id,
        });
      } else throw new Error(result?.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [isZone, priceId]);

  useEffect(() => {
    fetchRideTypes();
    fetchRideTypePrices();
  }, [fetchRideTypes, fetchRideTypePrices]);

  const handleInputChange = (index, field, value, isNew) => {
    if (isNew) {
      setNewRows((prev) => {
        const updated = [...prev];
        field === "ride_type"
          ? (updated[index][field] = value)
          : (updated[index][field] = +value);
        return updated;
      });
    } else {
      setRideTypePrices((prev) => {
        const updated = [...prev];
        updated[index][field] = +value;
        updated[index].isEdited = true;
        return updated;
      });
    }
  };

  const handleAddRow = () => {
    setNewRows((prev) => [
      ...prev,
      {
        ride_type: "",
        base_fare: 0,
        fare_per_km: 0,
        fare_per_min: 0,
        minimum_fare: 0,
        waiting_charges_per_min: 0,
      },
    ]);
  };

  const validateRow = (row) => {
    return [
      "base_fare",
      "fare_per_km",
      "fare_per_min",
      "minimum_fare",
      "waiting_charges_per_min",
    ].every(
      (field) =>
        row[field] !== "" && !isNaN(row[field]) && Number(row[field]) >= 0
    );
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await fetch(
      `${import.meta.env.VITE_API_RIDE_URL}/super-admin/ride-type-prices/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    fetchRideTypePrices();
  };

  const handleUpdate = async (index) => {
    setLoading(true);
    const { id, isEdited, ...data } = rideTypePrices[index];
    if (!validateRow(data))
      return alert(
        "Please ensure all fields contain non-negative numeric values."
      );
    delete data.createdAt;
    delete data.updatedAt;
    delete data.is_deleted;

    if (isZone) {
      data.zone_id = priceId;
      data.ride_type_price = "ZONE_BASE";
    } else {
      delete data.zone_id;
      data.city_id = priceId;
      data.ride_type_price = "CITY_BASE";
    }

    await fetch(
      `${import.meta.env.VITE_API_RIDE_URL}/super-admin/ride-type-prices/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    fetchRideTypePrices();
  };

  const handleCreate = async () => {
    setLoading(true);
    console.log("PAYLOAD", newRows);
    const payload = newRows.map((item) => ({
      ...item,
      city_id: formData.city_id,
      country_id: formData.country_id,
      zone_id: formData.zone_id,
    }));
    await fetch(
      `${
        import.meta.env.VITE_API_RIDE_URL
      }/super-admin/ride-type-prices/create`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRows),
      }
    );
    fetchRideTypePrices();
    setNewRows([]);
  };

  const handleClearNewRows = () => setNewRows([]);

  const usedRideTypes = [...(rideTypePrices || []), ...newRows].map(
    (row) => row.ride_type
  );

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
      <p className="text-gray font-redhat text-base font-semibold">
        {isZone ? "Dashboard > " : "Location > "}
        <span className="text-black">{isZone ? "Zones" : "Add Location"}</span>
        {" > "}
        <span className="text-black">
          {isZone ? "Update zone" : "Update City"}
        </span>
      </p>

      <div className="flex items-center gap-4 mt-8">
        <img
          src={BackArrow}
          alt="BackArrow"
          className="cursor-pointer"
          onClick={() => {
            setPriceId(null);
            isZone
              ? setActiveComponent("Zones")
              : setActiveComponent("AddLocation");
          }}
        />
        <p className="font-redhat font-semibold text-2xl">
          {isZone ? "Update zone prices" : "Update city prices"}
        </p>
      </div>

      {(rideTypePrices || []).map((row, index) => (
        <div key={row._id} className="flex space-x-2 mb-4 mt-8">
          <TextField
            value={
              rideTypes.find((type) => type._id === row.ride_type)?.name || ""
            }
            disabled
          />
          {[
            "base_fare",
            "fare_per_km",
            "fare_per_min",
            "minimum_fare",
            "waiting_charges_per_min",
          ].map((field) => (
            <TextField
              key={field}
              label={field.replace(/_/g, " ").toUpperCase()}
              value={row[field]}
              type="number"
              onChange={(e) => handleInputChange(index, field, e.target.value)}
              inputProps={{ step: 0.1 }}
            />
          ))}
          <IconButton
            onClick={() => handleUpdate(index)}
            disabled={!row.isEdited}
          >
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)}>
            <Delete />
          </IconButton>
        </div>
      ))}
      {newRows.map((row, index) => {
        const availableRideTypes = rideTypes.filter(
          (type) =>
            !usedRideTypes.includes(type._id) || type._id === row.ride_type
        );

        return (
          <div key={index} className="flex space-x-2 mb-4 mt-8">
            <TextField
              sx={{ width: "220px" }}
              select
              value={row?.ride_type?.toString() || ""}
              onChange={(e) =>
                handleInputChange(index, "ride_type", e.target.value, true)
              }
            >
              {availableRideTypes.map((type) => (
                <MenuItem key={type._id} value={type._id}>
                  {type?.name}
                </MenuItem>
              ))}
            </TextField>
            {[
              "base_fare",
              "fare_per_km",
              "fare_per_min",
              "minimum_fare",
              "waiting_charges_per_min",
            ].map((field) => (
              <TextField
                key={field}
                label={field.replace(/_/g, " ").toUpperCase()}
                value={row[field]}
                onChange={(e) =>
                  handleInputChange(index, field, e.target.value, true)
                }
                type="number"
                inputProps={{ step: 0.1 }}
              />
            ))}
          </div>
        );
      })}
      <div className="flex justify-between">
        <Button variant="contained" color="secondary" onClick={handleAddRow}>
          + Add row
        </Button>
        {/* <div> */}
        {newRows.length > 0 && (
          <div className="flex gap-4">
            <Button variant="outlined" onClick={handleClearNewRows}>
              Clear
            </Button>
            <Button
              variant="contained"
              color="success"
              disabled={newRows.every(validateRow)}
              onClick={handleCreate}
            >
              Add Prices
            </Button>
          </div>
        )}
        {/* </div> */}
      </div>
    </>
  );
};

export default UpdateRideTypePrices;
