import React from 'react'
import { Card, CardContent, IconButton, Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import {
    GoogleMap,
  } from "@react-google-maps/api";
import useGoogleMapsLoader from '../../useGoogleMapsLoader';



const Locationmapcard = () => {
    const { isLoaded, loadError } = useGoogleMapsLoader();

    if (loadError) {
        return <p>Error loading Google Maps: {loadError.message}</p>;
      }
    
      if (!isLoaded) {
        return <p>Loading Google Maps...</p>;
      }

   return <div className='rounded-lg flex-grow flex flex-col bg-white py-6 px-4' style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}>
        <div className="flex justify-between items-center">
            <p className="font-redhat font-semibold text-base">
                Submitted documents
            </p>
            <IconButton aria-label="options">
                <MoreHorizIcon />
            </IconButton>
        </div>
        <div className="pt-8 flex flex-col gap-4 pb-6 border-b border-[#DDDDDD] border-dashed ">
            <div className="flex items-center gap-3">
                <div className="bg-[#6FA4EE1F] rounded-lg items-start p-3 ">

                    <CallIcon />
                </div>
                <p className="font-sans text-base ">Call : +351 2210 02912</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="bg-[#6FA4EE1F] rounded-lg items-start p-3 ">

                    <EmailIcon />
                </div>
                <p className="font-sans text-base font-bold ">Send mail now</p>
            </div>
        </div>
        <p className="font-sans text-base pt-6"><span className='text-[#777777]'>Address :</span> Opposite DEF company office, Mall Road, Snta street, Aviero Portugal. 110091</p>
        <div className="flex-grow pt-6">
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "" }}
        //   center={getCenter()}
        center={{ lat: 40.6413, lng: -8.6536 }}
        zoom={12}
        //   zoom={polygon.length > 0 ? 10 : 3}
        //   onLoad={(map) => (mapRef.current = map)}
        >
            </GoogleMap>
        </div>
    </div>
}

export default Locationmapcard;
