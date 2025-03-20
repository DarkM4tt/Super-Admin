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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback, useEffect, useState } from "react";
import QuickConnect from "../common/QuickConnect";
import SubmittedDocumentsCard from "../common/SubmittedDocuments";
import CustomerCard from "../common/CustomerCard";
import { allDocumentStatus, allVehicleStatus } from "../../utils/enums";
import RemarksModal from "../common/RemarkModal";
import { useSnackbar } from "../../context/snackbarContext";

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
  const [vehicleData, setVehicleData] = useState(null);
  const [vehicleDocuments, setVehicleDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState({});
  const [openRemarksModal, setOpenRemarksModal] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const showSnackbar = useSnackbar();

  const fetchVehicleDetails = useCallback(async () => {
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
        setVehicleData(result?.data);
        setVehicleDocuments(result?.data?.documents);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  }, [selectedVehicleId]);

  const handleVehicleStatusChange = useCallback(
    async (status) => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/organizations/super-admin/update-vehicle-status/${selectedVehicleId}`,
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
          showSnackbar(result?.message, "success");
          fetchVehicleDetails();
        } else {
          throw new Error(result?.message);
        }
      } catch (error) {
        showSnackbar(error.message, "error");
      }
    },
    [fetchVehicleDetails, selectedVehicleId]
  );

  const handleDocStatusChange = useCallback(
    async (status, documentId) => {
      if (status !== "APPROVED") {
        const document = vehicleData?.documents?.find(
          (doc) => doc._id === documentId
        );
        document.status = status;
        setSelectedDocument(document);
        setOpenRemarksModal(true);
        return;
      }

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/organizations/super-admin/update-vehicle-doc-status/${documentId}`,
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
          showSnackbar(result?.message, "success");
          fetchVehicleDetails();
        } else {
          throw new Error(result?.message);
        }
      } catch (error) {
        showSnackbar(error.message, "error");
      }
    },
    [fetchVehicleDetails, vehicleData?.documents]
  );

  const handleAddRemarks = async () => {
    setButtonLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/organizations/super-admin/update-vehicle-doc-status/${
          selectedDocument?._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: selectedDocument?.status,
            remarks,
          }),
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        showSnackbar(result?.message, "success");
        setSelectedDocument(null);
        setOpenRemarksModal(false);
        fetchVehicleDetails();
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      showSnackbar(error.message, "error");
    } finally {
      setButtonLoading(false);
      setRemarks("");
    }
  };

  useEffect(() => {
    fetchVehicleDetails();
  }, [fetchVehicleDetails]);

  useEffect(() => {
    if (vehicleData) {
      setServices({
        is_pet_friendly: vehicleData.is_pet_friendly || false,
        is_assist: vehicleData.is_assist || false,
        is_jumpstart: vehicleData.is_jumpstart || false,
        is_listing: vehicleData.is_listing || false,
        is_bold_miles: vehicleData.is_bold_miles || false,
        is_rentals: vehicleData.is_rentals || false,
        is_sos: vehicleData.is_sos || false,
        is_xl: vehicleData.is_xl || false,
      });
    }
  }, [vehicleData]);

  const handleChange = (event) => {
    setServices({
      ...services,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSave = () => {
    console.log("Selected services:", services);
  };

  const handleRemarksClick = (document) => {
    setSelectedDocument(document);
    setOpenRemarksModal(true);
  };

  console.log(vehicleData?.is_pet_friendly);
  console.log(vehicleData?.is_assist);

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
          <div className="flex gap-8">
            <div className="">
              <img
                src={vehicleData?.vehicle_image}
                alt="car-icon"
                className="w-32"
              />
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
                  {vehicleData?.vin || (
                    <p className="text-red-400 text-sm font-bold">
                      VIN not known
                    </p>
                  )}
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
                    checked={services?.is_pet_friendly}
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
                    checked={services?.is_jumpstart}
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
                    checked={services?.is_listing}
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
                    checked={services?.is_assist}
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
                    checked={services?.is_rentals}
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
                    checked={services?.is_sos}
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
                    checked={services?.is_xl}
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
            {vehicleData?.driver ? (
              <>
                <p className="font-redHat font-semibold text-2xl">
                  Current driver
                </p>
                <CustomerCard
                  image={vehicleData?.driver?.profile_pic}
                  name={vehicleData?.driver?.full_name}
                  email={vehicleData?.driver?.email}
                  contact={vehicleData?.driver?.phone}
                  rating={4}
                />
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
              </>
            ) : (
              <p className="text-lg font-bold text-red-400">
                No driver assigned yet!
              </p>
            )}
          </div>
        </div>

        {/* Right Cards */}
        <div className="w-[30%] flex flex-col gap-8">
          <SubmittedDocumentsCard
            handleRemarksClick={handleRemarksClick}
            orgDocuments={vehicleDocuments}
            status={allDocumentStatus}
            onDocStatusChange={handleDocStatusChange}
          />
          <QuickConnect />
        </div>
      </div>

      <RemarksModal
        selectedDocument={selectedDocument}
        remarks={remarks}
        setRemarks={setRemarks}
        buttonLoading={buttonLoading}
        open={openRemarksModal}
        handleClose={() => {
          setSelectedDocument(null);
          setOpenRemarksModal(false);
          fetchVehicleDetails();
        }}
        handleAddRemarks={handleAddRemarks}
      />
    </>
  );
};

export default VehicleInfo;
