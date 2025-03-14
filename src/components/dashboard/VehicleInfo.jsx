/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BackArrow from "../../assets/leftArrowBlack.svg";
import TickIcon from "../../assets/tick.svg";
import StatusDropdown from "../common/StatusDropdown";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import partycar from "../../assets/partycar.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback, useEffect, useState } from "react";
import QuickConnect from "../common/QuickConnect";
import SubmittedDocumentsCard from "../common/SubmittedDocuments";
import CustomerCard from "../common/CustomerCard";
import LoadingAnimation from "../common/LoadingAnimation";
import { allDocumentStatus, allVehicleStatus } from "../../utils/enums";

const VehicleInfo = ({
  selectedVehicleId,
  setSelectedVehicleId,
  setActiveComponent,
}) => {
  const [services, setServices] = useState({
    is_pet_friendly: false,
    is_assist: false,
    is_jumpstart: false,
    is_listing: false,
    is_bold_miles: false,
    is_rentals: false,
    is_sos: false,
    is_xl: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [vehicleDocuments, setVehicleDocuments] = useState([]);

  const fetchVehicleDetails = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/organizations/super-admin/get-vehicle-details/${selectedVehicleId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setVehicleData(result?.data?.vehicle);
        setVehicleDocuments(result?.data?.documents);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [selectedVehicleId]);

  const handleVehicleStatusChange = useCallback(
    async (status) => {
      setError("");
      setLoading(true);

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/organizations/vehicle-listings/update-listing-status/${selectedVehicleId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status,
            }),
            credentials: "include",
          }
        );
        const result = await res?.json();
        if (result?.success) {
          fetchVehicleDetails();
        } else {
          throw new Error(result?.message);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicleDetails, selectedVehicleId]
  );

  const handleDocStatusChange = useCallback(
    async (status, documentId) => {
      setError("");
      setLoading(true);

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/organizations/super-admin/update-vehicle-document-status/${documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status,
            }),
            credentials: "include",
          }
        );
        const result = await res?.json();
        if (result?.success) {
          fetchVehicleDetails();
        } else {
          throw new Error(result?.message);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [fetchVehicleDetails]
  );

  useEffect(() => {
    fetchVehicleDetails();
  }, [fetchVehicleDetails]);

  const handleChange = (event) => {
    setServices({
      ...services,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSave = () => {
    console.log("Selected services:", services);
  };

  if (error) {
    return (
      <p className="text-lg text-red-400 font-bold">
        {error.message || "Error"}
      </p>
    );
  }

  if (loading) {
    return <LoadingAnimation height={500} width={500} />;
  }

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <span className="text-gray">{"> Partners"}</span>
        <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={BackArrow}
            alt="BackArrow"
            className="mb-4 cursor-pointer"
            onClick={() => {
              setSelectedVehicleId(null);
              setActiveComponent("Vehicles");
            }}
          />
        </div>
        <div className="flex items-center gap-6 pt-8">
          <div className="py-2 px-4 text-base font-redhat bg-[#FF935914] rounded-[56px] text-[#FF9359] border border-[#FF9359] cursor-pointer">
            Generate report
          </div>
          <StatusDropdown
            allStatus={allVehicleStatus}
            currentStatus={vehicleData?.status}
            onEntityStatusChange={handleVehicleStatusChange}
          />
        </div>
      </div>

      {/* Info Card */}
      <div className=" p-6 rounded-lg bg-white mt-8">
        <div className="flex justify-between pb-11 border-b border-[#DDDDDD] ">
          <div className="flex gap-4">
            <div className="">
              <img src={partycar} alt="any" className="w-200 rounded-full" />
            </div>
            <div className="">
              <p className="font-sans text-2xl font-semibold flex items-center">
                {vehicleData?.brand_name} {vehicleData?.vehicle_model}
                <span className=" pl-4 text-base text-[#777777] underline font-sans">
                  ABC Company Ltd &gt;&gt;
                </span>
              </p>
              <div className="mt-2 flex gap-2 items-center">
                <span>
                  <DirectionsCarIcon fontSize="small" />
                </span>
                <p className="font-sans text-base text-[#777777]">
                  {vehicleData?.vin}
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <p className="font-semibold text-2xl">TVDE Applicable</p>
            <div className="flex gap-2 items-center mt-4">
              <img src={TickIcon} alt="TickIcon" />
              <p className="font-semibold text-2xl">Yes</p>
              <p className="underline font-semibold text-base">Change status</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-6 items-center pt-4">
          <div className="flex items-center gap-8 flex-grow">
            <div className="">
              <p className="font-redhat text-xl text-[#777777] font-normal">
                Fuel card
              </p>
              <p className="font-semibold text-2xl pt-2"> Gasoline85 </p>
            </div>
            <p className="font-redhat font-bold text-xl text-[#344BFD]">
              Total Credit
            </p>
            <div className="h-4 rounded-3xl bg-[#EEEEEE] flex-grow relative ">
              <div className="h-4 rounded-3xl bg-[#344BFD] absolute w-[82%]"></div>
            </div>
          </div>
          <p className="font-redhat font-bold text-xl text-[#344BFD]">€ 2200</p>
        </div>
      </div>

      {/* Cards */}
      <div className="flex justify-between pt-8">
        <div className="w-4/6 flex flex-col gap-4">
          <div className="px-4 py-6 bg-white rounded-lg">
            {/* Title and Save Button */}
            <div className="flex justify-between">
              <p className="font-semibold font-redhat text-2xl">
                Covering services
              </p>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "none",
                  fontSize: "14px",
                  borderRadius: "8px",
                }}
                onClick={handleSave}
                disabled={true}
              >
                Save changes
              </Button>
            </div>

            {/* Checkboxes */}
            <div className="flex justify-between pt-10">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vehicleData?.is_pet_friendly}
                    onChange={handleChange}
                    name="is_pet_friendly"
                    sx={{
                      color: "#777777",
                      "&.Mui-checked": {
                        color: "#18C4B8",
                      },
                    }}
                  />
                }
                label="Pet friendly"
                className="text-gray-800 text-sm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vehicleData?.is_jumpstart}
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
                    checked={vehicleData?.is_listing}
                    onChange={handleChange}
                    name="is_listing"
                    sx={{
                      color: "#777777",
                      "&.Mui-checked": {
                        color: "#18C4B8",
                      },
                    }}
                  />
                }
                label="Listing"
                className="text-gray-800 text-sm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services?.is_bold_miles}
                    onChange={handleChange}
                    name="is_bold_miles"
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
            </div>

            <p className="font-semibold font-redhat text-2xl mt-8">
              Covering sectors
            </p>
            <div className="flex justify-between mt-8">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vehicleData?.is_assist}
                    onChange={handleChange}
                    name="is_assist"
                    sx={{
                      color: "#777777",
                      "&.Mui-checked": {
                        color: "#18C4B8",
                      },
                    }}
                  />
                }
                label="Assist"
                className="text-gray-800 text-sm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vehicleData?.is_rentals}
                    onChange={handleChange}
                    name="is_rentals"
                    sx={{
                      color: "#777777",
                      "&.Mui-checked": {
                        color: "#18C4B8",
                      },
                    }}
                  />
                }
                label="Rentals"
                className="text-gray-800 text-sm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vehicleData?.is_sos}
                    onChange={handleChange}
                    name="is_sos"
                    sx={{
                      color: "#777777",
                      "&.Mui-checked": {
                        color: "#18C4B8",
                      },
                    }}
                  />
                }
                label="SoS"
                className="text-gray-800 text-sm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vehicleData?.is_xl}
                    onChange={handleChange}
                    name="is_xl"
                    sx={{
                      color: "#777777",
                      "&.Mui-checked": {
                        color: "#18C4B8",
                      },
                    }}
                  />
                }
                label="XL"
                className="text-gray-800 text-sm"
              />
            </div>
          </div>

          <div className="bg-white w-full h-fit p-4 rounded-[8px] flex flex-col gap-2">
            <CustomerCard />
            <TextField
              id="fuel-card-name"
              placeholder="Assign another driver"
              variant="outlined"
              size="small"
              // value={formData.cardName}
              // onChange={(e) => handleChange("cardName", e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ExpandMoreIcon sx={{ color: "black" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        {/* Right Cards */}
        <div className="w-[30%] flex flex-col gap-8">
          <SubmittedDocumentsCard
            orgDocuments={vehicleDocuments}
            status={allDocumentStatus}
            onDocStatusChange={handleDocStatusChange}
          />
          <QuickConnect />
        </div>
      </div>
    </>
  );
};

export default VehicleInfo;
