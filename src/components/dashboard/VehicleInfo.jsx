import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import pdfIcon from "../../assets/pdf.png";
import SearchIcon from "@mui/icons-material/Search";
import BackArrow from "../../assets/leftArrowBlack.svg";
import TickIcon from "../../assets/tick.svg";
import StatusDropdown from "../common/StatusDropdown";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import partycar from "../../assets/partycar.png";
import { CheckCircleOutline } from "@mui/icons-material";
import Rentalpartner from "../../assets/Rentalpartner.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const VehicleInfo = ({
  selectedOrgId,
  setActiveComponent,
  setSelectedOrgId,
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

  const VehicleInfo = [
    {
      title:
        "[Partner Only] > Personal Accident Insurance Policy (Special Conditions + Invoice/Receipt)",
      expiryDate: "December 25, 2024",
      fileName: "Personal Accid....pdf",
    },
    {
      title:
        "[Partner Only] > Personal Accident Insurance Policy (Special Conditions + Invoice/Receipt)",
      expiryDate: "December 25, 2024",
      fileName: "Personal Accid....pdf",
    },
    {
      title:
        "[Partner Only] > Personal Accident Insurance Policy (Special Conditions + Invoice/Receipt)",
      expiryDate: "December 25, 2024",
      fileName: "Personal Accid....pdf",
    },
  ];

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
              setSelectedDriverId(null);
              setActiveComponent("Drivers");
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

      <div className="flex justify-between pt-8">
        <div className="w-4/6">
          <Box className="p-4 bg-white rounded-lg">
            <p className="font-semibold font-redhat text-2xl mb-4">
              Submitted VehicleInfo
            </p>
            {VehicleInfo.map((doc, index) => (
              <Box key={index}>
                <Box className="flex justify-between items-center mb-4 py-2">
                  <Box className="flex items-center mt-4">
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-base font-redhat">
                        {doc.title}
                      </p>
                      <Box className="flex items-center text-green-500">
                        <CheckCircleOutline fontSize="small" />
                        <p className="ml-1 text-boldCyan font-redhat font-medium text-base">
                          Valid until {doc.expiryDate}
                        </p>
                      </Box>
                      <div className="flex gap-2 mt-4">
                        <img
                          src={pdfIcon}
                          alt="PDF Icon"
                          className="w-6 h-6 mr-3"
                        />
                        <p className="underline cursor-pointer">
                          {doc.fileName}
                        </p>
                      </div>
                    </div>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#eeeeee",
                      color: "black",
                      textTransform: "none",
                      boxShadow: "none",
                      border: "none",
                      "&:hover": {
                        backgroundColor: "#eeeeee",
                        boxShadow: "none",
                      },
                      borderRadius: "8px",
                      padding: "6px 16px",
                    }}
                  >
                    View
                  </Button>
                </Box>
                {index < VehicleInfo.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        </div>

        <div className="w-[30%] flex flex-col gap-4">
          <div className="px-4 py-6 bg-white rounded-lg">
            {/* Title and Save Button */}
            <div className="flex justify-between">
              <p className="font-semibold font-redhat text-base">
                Services covered
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
            </div>
            <div className="flex justify-between pt-2">
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
            </div>
            <div className="flex justify-between pt-2">
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
            </div>
            <div className="flex justify-between pt-2">
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
            <p className="font-redhat font-semibold text-base">
              Assigned driver
            </p>
            <div className="flex gap-2 items-center mt-4 border-b-[1px] border-[#dddddd] border-dashed pb-4">
              <img
                src={Rentalpartner}
                alt="Rentalpartner"
                className="w-[5rem]"
              />
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-semibold">Ann Baptista</p>
                <p className="font-sans text-base text-[#777777] flex gap-2 items-center underline">
                  <span>
                    <CallIcon fontSize="small" />
                  </span>
                  +91-9440192122
                </p>
              </div>
            </div>
            <p className="text-xl underline font-redhat font-semibold my-4">
              ABC Company Ltd &gt;&gt;
            </p>
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
      </div>
    </>
  );
};

export default VehicleInfo;
