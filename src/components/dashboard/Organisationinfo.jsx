import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Card,
  Typography,
  Avatar,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import organisatiologo from "../../assets/organisationlogo.jpeg";
import callicon from "../../assets/callicon.svg";
import msgicon from "../../assets/messageicon.svg";
import staricon from "../../assets/staricon.svg";
import online from "../../assets/greenDot.svg";
import Euroicon from "../../assets/euroicon.svg";
import Upgraph from "../../assets/upgraph.svg";
import dashboardvehicle from "../../assets/dashboardvehicle.svg";
import CircleIcon from "@mui/icons-material/Circle";
import lowgraph from "../../assets/lowgraphdash.svg";
import moderategraph from "../../assets/moderategrapgdash.svg";
import { Doughnut } from "react-chartjs-2";
import CustomSelectDropdown from "../common/CustomSelectDropdown";
import calenderone from "../../assets/superadmincalender.svg";
import useGoogleMapsLoader from "../../useGoogleMapsLoader";
import {
    GoogleMap,
  } from "@react-google-maps/api";

  const belowsampledata=[
    {
      head:"Intercity",
      count:3312
    },
    {
      head:"Package",
      count:2293
    },
    {
      head:"Regular",
      count:3312
    },
    {
      head:"Rentals",
      count:2293
    },
    ]

const Organisationinfo = ({
  onMenuItemClick
}) => {
    const { isLoaded, loadError } = useGoogleMapsLoader();
  const data = {
    labels: ["Complete", "Incomplete"],
    datasets: [
      {
        data: [54, 46], // You can adjust the percentage here
        backgroundColor: ["#2dd4bf", "#f5f5dc"], // Adjust colors to match the design
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "75%", // Adjust for inner white space (doughnut thickness)
    plugins: {
      legend: {
        display: false, // Disable legend if you don't need it
      },
      datalabels: {
        display: false,
      },
    },
  };
  return (
    <div className="p-6">
      <div className="mb-10 flex items-center cursor-pointer">
        <ArrowBackIcon
          sx={{ mr: 2 }}
          onClick={() => {
            onMenuItemClick("Organisations")
          }}
        />
        <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
          Return to Dashboard
        </Typography>
      </div>
      <div className="flex justify-between">
        <div className="leftonetop">
          <div className="flex gap-10">
            <div className="flex gap-4 ">
              <img
                src={organisatiologo}
                alt=""
                className="w-[80px] rounded-full"
              />
              <div className="pt-2">
                {" "}
                <p className="font-bold text-2xl ">ABC Company Pvt. Ltd</p>
                <p className="font-semibold text-base text-[#777777] pt-2">
                  Operating at : Porto, Portugal
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start pt-2">
              <img
                src={callicon}
                alt="callicon"
                className="cursor-pointer w-8"
              />
              <img
                src={msgicon}
                alt="callicon"
                className="cursor-pointer w-8"
              />
            </div>
          </div>
        </div>
        <div className="rightonetop flex justify-between space-x-16">
          <div>
            <p className="font-semibold text-base font-redhat">User rating</p>
            <div className="flex gap-2 pt-2">
              <img src={staricon} alt="staricon" className="w-6" />
              <p className="font-bold text-base font-redhat">
                4.5<span className="text-[#777777]">/5</span>
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-base font-redhat">
              Registration date
            </p>
            <div className="flex gap-2 pt-2">
              <p className="font-bold text-base font-redhat">12 Jan, 2024</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-base font-redhat">
              Profile status
            </p>
            <div className="flex gap-2 pt-2">
              <img src={online} alt="staricon" className="w-2" />
              <p className="font-normal text-base font-redhat">Active</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-12">
        <div className="border border-borderGray rounded-lg flex flex-col justify-between  p-4 min-h-36">
          <div className="flex gap-2 ">
            <img src={Euroicon} alt="info" className="h-8 mt-2" />
            <div>
              <h1 className="text-4xl font-bold">3322</h1>
              <p className="font-redhat text-sm font-semibold">
                Total earnings
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <img src={Upgraph} alt="info" className="w-[20%] mt-2" />
            <div className="flex justify-end flex-col">
              <p className="font-redhat text-sm font-semibold text-[#777777]">
                4% high
              </p>
            </div>
          </div>
        </div>
        <div className="border border-borderGray rounded-lg flex flex-col justify-between  p-4">
          <div className="flex gap-4 ">
            <img src={dashboardvehicle} alt="info" className="h-12 mt-1" />
            <div>
              <h1 className="text-4xl font-bold">60129</h1>
              <p className="font-redhat text-sm font-semibold">Total trips</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <CircleIcon fontSize="8px" style={{ color: "#2FCA16" }} />
              <p className="font-normal text-sm text-[#777777]">
                Ongoing{" "}
                <span className="font-semibold text-[#484848]">221</span>
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <CircleIcon fontSize="8px" style={{ color: "#F81422" }} />
              <p className="font-normal text-sm text-[#777777]">
                Offline{" "}
                <span className="font-semibold text-[#484848]">380</span>
              </p>
            </div>
          </div>
        </div>
        <div className="border border-borderGray rounded-lg flex flex-col justify-between  p-4">
          <div className="flex gap-2 ">
            <div>
              <h1 className="text-4xl font-bold">6.8</h1>
              <p className="font-redhat text-sm font-semibold">SHpV</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <img src={lowgraph} alt="info" className="w-[20%] mt-2" />
            <div className="flex justify-end flex-col">
              <p className="font-redhat text-sm font-semibold text-[#777777]">
                2% low
              </p>
            </div>
          </div>
        </div>
        <div className="border border-borderGray rounded-lg flex justify-between  p-4">
          <div className="leftonelast w-1/2 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-redhat text-sm font-semibold">
                Acceptance rate
              </p>
              <p className="font-redhat text-sm font-semibold text-[#777777]">
                Moderately good
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <img src={moderategraph} alt="info" className="w-[40%] mt-2" />
              <div className="flex justify-end flex-col">
                <p className="font-redhat text-sm font-semibold text-[#777777]">
                  4% high
                </p>
              </div>
            </div>
          </div>
          <div className="rightonelast w-[35%]">
            <div className="relative w-full">
              {/* The Doughnut chart */}
              <Doughnut data={data} options={options} />

              {/* Inner text */}
              <div className="absolute inset-0 flex justify-center items-center">
                <span className="text-lg font-bold font-redhat">54%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Typography
        sx={{ fontSize: "24px", fontWeight: "700", paddingTop: "3rem" }}
      >
        Submitted documents
      </Typography>

      <div className="flex w-56 pt-4">
        <CustomSelectDropdown
          // value={assignment}
          // onChange={handleAssignmentChange}
          name="Select document"
          options={["National ID", "Sample documents"]}
        />
      </div>

      <div className="flex justify-between items-center pt-12">
        <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
          Working zone
        </Typography>

        <div className="flex gap-4 items-center">
          <img src={calenderone} alt="calender" className="w-6" />
          <div className="flex flex-col">
            <p className="font-redhat text-sm font-semibold">Filter</p>
            <p className="font-redhat text-sm font-normal text-[#777777]">
              8 Aug 2024-2Sept 2024
            </p>
          </div>
        </div>
      </div>

      {loadError && <div>Error loading maps</div>}
          {!isLoaded && <div>Loading Maps...</div>}
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ height:"80%", width: "100%", minHeight:"338px" , marginTop:"32px" }}
              center={{ lat: 40.756795, lng: -73.954298 }}
              zoom={13}
            />
          )}

<div className='pt-10 '>
        <p className="upperbig font-redhat font-bold text-2xl">Ride overview</p>
        <p className="font-redhat text-lg font-normal text-[#777777]">Total ride taken this month</p>
     <div className='flex space-x-20 pt-8'>
      {belowsampledata.map((category)=>{
        return(<div>
        <p className='font-redhat font-bold text-lg'>{category.head}</p>
        <p className='font-redhat font-bold text-4xl pt-4'>{category.count}</p>
        </div>)
      })}
      </div>
      </div>
    </div>
  );
};

export default Organisationinfo;
