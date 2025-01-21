import React from "react";
import Rentalpartner from "../../../assets/Rentalpartner.png";
import { GoogleMap } from "@react-google-maps/api";
import useGoogleMapsLoader from "../../../useGoogleMapsLoader";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const Tripinfo = () => {
  const { isLoaded, loadError } = useGoogleMapsLoader();

  if (loadError) {
    return <p>Error loading Google Maps: {loadError.message}</p>;
  }

  if (!isLoaded) {
    return <p>Loading Google Maps...</p>;
  }
  return (
    <div className="flex flex-col gap-6">
         <div className="flex justify-between items-center font-redhat text-base font-semibold ">
         <p className="font-redhat font-semibold text-base flex items-center">
            <span className="text-[#777777] pr-2">Services</span>
            {"> SoS"}
          </p>
      <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
<SearchIcon/>
<input type='text' placeholder='Search anything...' className='bg-transparent outline-none'></input>
      </div>
    </div>
    <p className="font-redhat font-semibold text-2xl pt-8">Overview</p>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4 pt-6">
        <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px]">Visit 3rd Party partner profile <span className='pl-2'> <KeyboardDoubleArrowRightIcon/></span> </div>
        <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px]">Visit customer profile <span className='pl-2'> <KeyboardDoubleArrowRightIcon/></span> </div>
        <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px]">View vehicle details  <span className='pl-2'> <KeyboardDoubleArrowRightIcon/></span>  </div>
      </div>
    </div>
      <div className="rounded-lg  flex flex-col bg-white py-6 px-4 gap-11">
        <div className="flex gap-10 flex-wrap">
          <div className="flex flex-col gap-6">
            <p className="font-redhat text-base">Customer name</p>
            <div className="flex items-center gap-2">
              <img
                src={Rentalpartner}
                alt="partner"
                className="w-10 h-10 rounded-full"
              />
              Nolan Lipshutz
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-redhat text-base">Customer vehicle name</p>
            <p className="font-redhat text-base font-semibold">
              FORD Mustang GT 440i
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-redhat text-base">Blocking vehicle number</p>
            <p className="font-redhat text-base font-semibold">
              FORD Mustang GT 440i
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-redhat text-base">Blocking vehicle colour</p>
            <p className="font-redhat text-base font-semibold">Red</p>
          </div>
        </div>
        <div className="flex gap-10 flex-wrap">
          <div className="flex flex-col gap-6">
            <p className="font-redhat text-base">Ride type</p>
            <p className="font-redhat text-base font-semibold">SoS</p>
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-redhat text-base">Date</p>
            <p className="font-redhat text-base font-semibold">14-01-2025</p>
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-redhat text-base">Ride status</p>
            <p className="font-redhat text-base font-semibold">
              User not registered
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg  flex flex-col bg-white py-6 px-4 gap-10">
        <p className="font-redhat font-semibold text-2xl">
          Service map highlight
        </p>
        <div className=" overflow-hidden rounded-2xl">
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            //   center={getCenter()}
            center={{ lat: 40.6413, lng: -8.6536 }}
            zoom={12}
            //   zoom={polygon.length > 0 ? 10 : 3}
            //   onLoad={(map) => (mapRef.current = map)}
          ></GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default Tripinfo;
