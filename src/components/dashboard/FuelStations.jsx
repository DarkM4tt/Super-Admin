/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CustomDropdown from "./../common/CustomDropdown";
import { useState } from "react";
import AddFuelCardModal from "./AddFuelCardModal";
import { Button, Tab, Tabs } from "@mui/material";
import BackArrow from "../../assets/leftArrowBlack.svg";

const FuelStations = ({ onFuelStationClick, setActiveComponent }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    cardName: "",
    fuelType: "",
    fuelCategory: "",
    fuelStations: "",
    cardLimit: "",
    revenueNeeded: "",
    amount: "",
  });
  const dropdownOptions = [
    { title: "Fuel Stations", value: "stations" },
    { title: "Vehicles", value: "vehicles" },
  ];
  const requests = [
    {
      company: "ABC Fuel Company Ltd, Aviero Portugal",
      location: "ZFEA3560006N7751\n83-XR-04",
      signedUpOn: "22 Aug, 2024",
      time: "12:22 PM GMT+1",
    },
    {
      company: "ABC Fuel Company Ltd, Aviero Portugal",
      location: "ZFEA3560006N7751\n83-XR-04",
      signedUpOn: "22 Aug, 2024",
      time: "12:22 PM GMT+1",
    },
    {
      company: "ABC Fuel Company Ltd, Aviero Portugal",
      location: "ZFEA3560006N7751\n83-XR-04",
      signedUpOn: "22 Aug, 2024",
      time: "12:22 PM GMT+1",
    },
    {
      company: "ABC Fuel Company Ltd, Aviero Portugal",
      location: "ZFEA3560006N7751\n83-XR-04",
      signedUpOn: "22 Aug, 2024",
      time: "12:22 PM GMT+1",
    },
  ];

  const handleSave = () => {
    console.log("Saved Data:", formData);
    setModalOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const FuelRequestCard = ({ data }) => {
    return (
      <div className="bg-white rounded-md p-4 mb-4 relative border-b-[1px] border-[#344BFD]">
        {/* Company Details */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-black">Company</p>
            <p className="text-sm text-gray-600">{data.company}</p>
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-black">Location</p>
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {data.location}
            </p>
          </div>

          {/* Signed Up On */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-black">Signed up on</p>
            <p className="text-sm text-gray-600">{data.signedUpOn}</p>
            <p className="text-sm text-gray-600">{data.time}</p>
          </div>

          {/* Action Button */}
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: "500",
              borderColor: "#000",
              color: "#000",
              borderRadius: "10px",
              "&:hover": {
                borderColor: "#000",
                backgroundColor: "rgba(0,0,0,0.05)",
              },
            }}
            onClick={() => onFuelStationClick(2)}
          >
            Accept and review
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <div className="flex gap-2 text-gray">{"> Fuel Card"}</div>
        <div className="flex gap-4">
          <div
            className="py-3 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px] cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <span className="pr-1">
              {" "}
              <AddIcon fontSize="small" />
            </span>{" "}
            Create new fuel card{" "}
          </div>
        </div>
      </div>

      <img
        src={BackArrow}
        alt="BackArrow"
        className="mb-4 mt-4 cursor-pointer"
        onClick={() => {
          setActiveComponent("Fuel Card");
        }}
      />

      <p className="font-redhat font-semibold text-2xl pt-8">Overview</p>
      <p className="font-normal text-lg text-gray pt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.{" "}
      </p>
      <p className="font-normal text-lg text-gray pt-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.{" "}
      </p>

      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-8 items-center">
          <p className="font-redhat font-semibold text-2xl">
            Select from drop down to view the list
          </p>
          <CustomDropdown options={dropdownOptions} />
        </div>
        <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center mt-8">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: "1px solid #d3d3d3",
            width: "fit-content",
            ".MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              color: "#9e9e9e",
            },
            ".Mui-selected": { color: "#1976d2", fontWeight: "bold" },
            ".MuiTabs-indicator": { backgroundColor: "#1976d2" },
          }}
        >
          <Tab label="New request (3)" />
          <Tab label="Pending (0)" />
          <Tab label="All (33k)" />
        </Tabs>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "black",
            color: "black",
            borderRadius: "30px",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              borderColor: "black",
            },
          }}
        >
          Engage operations team
        </Button>
      </div>

      {activeTab === 0 && (
        <div className="mt-8">
          {requests.map((request, index) => (
            <FuelRequestCard key={index} data={request} />
          ))}
        </div>
      )}
      {activeTab === 1 && <p className="text-red-400 p-6">Empty</p>}
      {activeTab === 2 && <p className="text-red-400 p-6">Empty</p>}

      <AddFuelCardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />
    </>
  );
};

export default FuelStations;
