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
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import partycar from "../../assets/partycar.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import QuickConnect from "../common/QuickConnect";
import SubmittedDocumentsCard from "../common/SubmittedDocuments";
import CustomerCard from "../common/CustomerCard";

const VehicleInfo = ({
  setSelectedVehicleId,
  setActiveComponent,
  // setSelectedOrgId,
}) => {
  const [services, setServices] = useState({
    packages: false,
    intercity: false,
    petFriendly: false,
    assist: false,
    cabs: false,
    jumpstart: false,
    rentals: false,
    sos: false,
    ev: false,
    luxury: false,
  });

  const handleChange = (event) => {
    setServices({
      ...services,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSave = () => {
    console.log("Selected services:", services);
  };

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
          <StatusDropdown />
        </div>
      </div>

      {/* Info Card */}
      <div className=" p-6 rounded-lg bg-white mt-8">
        <div className="flex justify-between pb-11 border-b border-[#DDDDDD] ">
          <div className="">
            <div className="flex gap-4">
              <div className="">
                <img src={partycar} alt="any" className="w-200 rounded-full" />
              </div>
              <div className="">
                <p className="font-sans text-2xl font-semibold flex items-center">
                  Ford Endevour{" "}
                  <span className=" pl-4 text-base text-[#777777] underline font-sans">
                    ABC Company Ltd &gt;&gt;
                  </span>
                </p>
                <div className="pt-2 flex gap-4">
                  <p className="font-sans text-base text-[#777777] flex gap-2 items-center">
                    <span>
                      <EmailIcon fontSize="small" />
                    </span>
                    annbaptista16@gmail.com
                  </p>
                  <p className="font-sans text-base text-[#777777] flex gap-2 items-center underline">
                    <span>
                      <CallIcon fontSize="small" />
                    </span>
                    +91-9440192122
                  </p>
                </div>
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
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "none",
                  fontSize: "14px",
                  borderRadius: "8px",
                }}
                onClick={handleSave}
              >
                Save changes
              </Button>
            </div>

            {/* Checkboxes */}
            <div className="flex justify-between pt-10">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.jumpstart}
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
                    checked={services.rentals}
                    onChange={handleChange}
                    name="rentals"
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
                    checked={services.packages}
                    onChange={handleChange}
                    name="packages"
                    sx={{
                      color: "#777777",
                      "&.Mui-checked": {
                        color: "#18C4B8",
                      },
                    }}
                  />
                }
                label="Packages"
                className="text-gray-800 text-sm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.intercity}
                    onChange={handleChange}
                    name="intercity"
                    sx={{
                      color: "#777777",
                      "&.Mui-checked": {
                        color: "#18C4B8",
                      },
                    }}
                  />
                }
                label="Intercity"
                className="text-gray-800 text-sm"
              />
            </div>
            <p className="font-semibold font-redhat text-2xl mt-4">
              Covering sectors
            </p>
            <div className="flex justify-between pt-2">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.sos}
                    onChange={handleChange}
                    name="sos"
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
                    checked={services.cabs}
                    onChange={handleChange}
                    name="cabs"
                    sx={{
                      color: "#777777",
                      "&.Mui-checked": {
                        color: "#18C4B8",
                      },
                    }}
                  />
                }
                label="Regular cabs"
                className="text-gray-800 text-sm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.petFriendly}
                    onChange={handleChange}
                    name="petFriendly"
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
                    checked={services.assist}
                    onChange={handleChange}
                    name="assist"
                    sx={{
                      color: "#777777",
                      "&.Mui-checked": {
                        color: "#18C4B8",
                      },
                    }}
                  />
                }
                label="BOLD Assist"
                className="text-gray-800 text-sm"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.ev}
                    onChange={handleChange}
                    name="ev"
                    sx={{
                      color: "#777777",
                      "&.Mui-checked": {
                        color: "#18C4B8",
                      },
                    }}
                  />
                }
                label="EV"
                className="text-gray-800 text-sm"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={services.luxury}
                    onChange={handleChange}
                    name="luxury"
                    sx={{
                      color: "#777777",
                      "&.Mui-checked": {
                        color: "#18C4B8",
                      },
                    }}
                  />
                }
                label="Luxury"
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
          <SubmittedDocumentsCard />
          <QuickConnect />
        </div>
      </div>
    </>
  );
};

export default VehicleInfo;
