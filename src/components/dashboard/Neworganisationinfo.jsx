import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  InputAdornment,
  styled,
} from "@mui/material";
import { Button, Card, Typography, Avatar, TextField,Box,IconButton } from "@mui/material";
import online from "../../assets/greenDot.svg";

import organisatiologo from "../../assets/organisationlogo.jpeg";
import callicon from "../../assets/callicon.svg";
import msgicon from "../../assets/messageicon.svg";

const ColorButton = styled(Button)(({ theme }) => ({
  fontFamily: "Red Hat Display, sans-serif",
}));

const Neworganisationinfo = ({ onMenuItemClick }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className=" flex items-center cursor-pointer">
          <ArrowBackIcon
            sx={{ mr: 2 }}
            onClick={() => {
              onMenuItemClick("Organisations");
            }}
          />
          <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
            Return to Organisations
          </Typography>
        </div>
        <ColorButton
          variant="contained"
          sx={{
            backgroundColor: "black",
            fontWeight: 600,
            color: "white",
            fontFamily: "Red Hat Display, sans-serif",
            textTransform: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
          // onClick={handleSubmit}
        >
          Approve organisation
        </ColorButton>
      </div>
      <div className="py-10 flex justify-between">
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

          <div className="rightonetop flex justify-between space-x-16">
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
          <div className="w-[50%]">
          <Typography
            sx={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px" }}
          >
            Required vehicle documents
          </Typography>
          {[
            {
              label: "[Partner Only] > Car Insurance Policy (Green Card)",
              date: "Valid until December 25, 2024",
              type: "carInsurancePolicyGreenCard",
              value: "car_insurance_policy_green_card",
            },
            {
              label:
                "[Partner Only] > Car Insurance Policy (Special Conditions)",
              date: "Valid until December 25, 2024",
              type: "carInsuranceSpecialConditions",
              value: "car_insurance_special_conditions",
            },
            {
              label:
                "[Partner Only] > DUA - Single Car Document (front and back) or Rental Agreement + DUA/DAV or Declaration of Assignment of Use +DUA/DAV",
              date: "Valid until December 25, 2024",
              type: "duaSingleCarDocument",
              value: "dua_single_car_document",
            },
            {
              label:
                "[Partner Only] > Periodic Technical Inspection (Vehicles over 1 year old)",
              date: "Valid until December 25, 2024",
              type: "periodicTechnicalInspection",
              value: "periodic_technical_inspection",
            },
          ].map((item, index) => (
            <Card
              key={index}
              sx={{
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 0",
                borderBottom: "1px solid rgba(221, 221, 221, 1)",
              }}
            >
              <div className="md:max-w-[80%]">
                <Typography variant="body1" fontWeight="700">
                  {item.label}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="500"
                  sx={{ color: "rgba(24, 196, 184, 1)", marginTop: 1 }}
                >
                  {item.date}
                </Typography>
              </div>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "rgba(238, 238, 238, 1)",
                  color: "#000",
                //   fontSize: "16px",
                  fontWeight: "600",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(238, 238, 238, 1)",
                  },
                }}
                // onClick={() => handleUpload(item.type)}
              >
                {/* {uploadingDocument === item.type ? (
                  <LoadingAnimation width={30} height={30} />
                ) : vehicleDetails?.documents &&
                  vehicleDetails?.documents[item.value] ? (
                  "Re-upload"
                ) : (
                  "Upload"
                )} */}
                Upload
              </Button>
              {/* {uploadError && (
                <p className="mt-2 font-redhat text-red-400">{uploadError}</p>
              )} */}
            </Card>
          ))}
        </div>
    </div>
  );
};

export default Neworganisationinfo;
