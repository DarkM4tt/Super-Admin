/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { Button, IconButton, MenuItem, TextField } from "@mui/material";
import { Delete, Save } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoadingAnimation from "../../common/LoadingAnimation";
import BackArrow from "../../../assets/leftArrowBlack.svg";

const UpdateRideTypePrices = ({
  isZone,
  areaDetails,
  setAreaDetails,
  setActiveComponent,
}) => {
  const [rideTypes, setRideTypes] = useState([]);
  const [rideTypePrices, setRideTypePrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
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
      setButtonLoading(false);
    }
  }, []);

  const fetchRideTypePrices = useCallback(async () => {
    setLoading(true);
    const url = isZone
      ? `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/ride-type-prices?zone_id=${areaDetails?.id}`
      : `${
          import.meta.env.VITE_API_RIDE_URL
        }/super-admin/ride-type-prices?city_id=${areaDetails?.id}`;

    try {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (result?.success) {
        const data = result?.data?.zoneRideTypes?.results;
        setRideTypePrices(data || []);
      } else throw new Error(result?.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setButtonLoading(false);
    }
  }, [isZone, areaDetails]);

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

  const validateButton = (row) => {
    return [
      "base_fare",
      "fare_per_km",
      "fare_per_min",
      "minimum_fare",
      "waiting_charges_per_min",
    ].every((field) => Number(row[field]) > 0);
  };

  const handleDelete = async (id) => {
    setButtonLoading(true);
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
    setButtonLoading(true);
    const { id, isEdited, ...data } = rideTypePrices[index];
    console.log(isEdited);
    if (!validateRow(data))
      return alert(
        "Please ensure all fields contain non-negative numeric values."
      );
    delete data.createdAt;
    delete data.updatedAt;
    delete data.is_deleted;

    if (isZone) {
      data.zone_id = areaDetails?.id;
      data.ride_type_price = "ZONE_BASE";
    } else {
      delete data.zone_id;
      data.city_id = areaDetails?.id;
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
    setButtonLoading(true);
    const payload = newRows.map((item) =>
      isZone
        ? {
            ...item,
            city_id: areaDetails?.city_id,
            country_id: areaDetails?.country_id,
            zone_id: areaDetails?.id,
            ride_type_price: isZone ? "ZONE_BASE" : "CITY_BASE",
            additional_charge_type: "FIXED",
            additional_charges: 0,
            discount_type: "PERCENTAGE",
            discount_value: 0,
          }
        : {
            ...item,
            city_id: areaDetails?.id,
            country_id: areaDetails?.country_id,
            ride_type_price: isZone ? "ZONE_BASE" : "CITY_BASE",
            additional_charge_type: "FIXED",
            additional_charges: 0,
            discount_type: "PERCENTAGE",
            discount_value: 0,
          }
    );
    console.log("PAYLOAD", payload);
    await fetch(
      `${
        import.meta.env.VITE_API_RIDE_URL
      }/super-admin/ride-type-prices/create`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
            setAreaDetails(null);
            isZone
              ? setActiveComponent("Zones")
              : setActiveComponent("AddLocation");
          }}
        />
        <p className="font-redhat font-semibold text-2xl">
          {isZone
            ? `Update or add prices for ${areaDetails?.name} zone`
            : `Update or add prices for ${areaDetails?.name} city`}
        </p>
      </div>

      {rideTypePrices?.length === 0 && (
        <p className="text-red-400 text-lg font-bold my-8">
          Not prices for any ride types added yet!
        </p>
      )}
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
              inputProps={{ step: 0.1, min: 0 }}
            />
          ))}
          <IconButton
            onClick={() => handleUpdate(index)}
            disabled={!row.isEdited}
            sx={{
              color: row.isEdited ? "#0A84C1" : "grey",
            }}
          >
            {buttonLoading ? (
              <LoadingAnimation width={30} height={30} />
            ) : (
              <Save />
            )}
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)}>
            {buttonLoading ? (
              <LoadingAnimation width={30} height={30} />
            ) : (
              <Delete sx={{ color: "red" }} />
            )}
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
              sx={{ width: "230px" }}
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
                inputProps={{ step: 0.1, min: 0 }}
              />
            ))}
          </div>
        );
      })}
      <div className="flex justify-between">
        <Button
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            color: "black",
            textTransform: "none",
            fontWeight: 400,
            fontSize: "14px",
          }}
          onClick={handleAddRow}
        >
          Click to add row
        </Button>
        {newRows.length > 0 && (
          <div className="flex gap-4">
            <Button variant="outlined" onClick={handleClearNewRows}>
              Clear
            </Button>
            <Button
              variant="contained"
              color="success"
              disabled={!newRows.every(validateButton)}
              onClick={handleCreate}
            >
              {buttonLoading ? (
                <LoadingAnimation width={30} height={30} />
              ) : (
                "Add Prices"
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateRideTypePrices;
