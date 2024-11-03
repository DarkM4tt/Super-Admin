import React, { useState } from "react";
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
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import {
  Button,
  Card,
  Typography,
  Avatar,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import online from "../../assets/greenDot.svg";

import organisatiologo from "../../assets/organisationlogo.jpeg";
import callicon from "../../assets/callicon.svg";
import msgicon from "../../assets/messageicon.svg";
import {
  useGetSingleOrganizationQuery,
  useUpdateOrganizationStatusMutation,
} from "../../features/Organisations/organisationSlice";

const ColorButton = styled(Button)(({ theme }) => ({
  fontFamily: "Red Hat Display, sans-serif",
}));

const Neworganisationinfo = ({ onMenuItemClick, selectedOrg }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [docUrl, setDocUrl] = useState("");

  const {
    data: orgDetails,
    error,
    isLoading,
  } = useGetSingleOrganizationQuery(selectedOrg);
  const [updateOrganizationStatus, { isLoading: isUpdating }] =
    useUpdateOrganizationStatusMutation();


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching organization details</p>;

  const handleOpenDialog = (url) => {
    setDocUrl(url);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDocUrl("");
  };

  const handleApprove = async () => {
    try {
      await updateOrganizationStatus(selectedOrg).unwrap();
      // Optionally show a success message or refresh data
    } catch (error) {
      // Handle error if needed
      console.error("Failed to approve organization:", error);
    }
  };
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
          onClick={handleApprove}
          disabled={isUpdating}
        >
          {isUpdating  ? "Approving..." : "Approve organisation"}
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
              <p className="font-bold text-2xl ">
                {orgDetails.organization.organization_name}
              </p>
              <p className="font-semibold text-base text-[#777777] pt-2">
                Operating at :{orgDetails.organization.country}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start pt-2">
            <img src={callicon} alt="callicon" className="cursor-pointer w-8" />
            <img src={msgicon} alt="callicon" className="cursor-pointer w-8" />
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
            url: orgDetails.organization.accident_insurance_url,
          },
          {
            label: "[Partner Only] > Car Insurance Policy (Special Conditions)",
            date: "Valid until December 25, 2024",
            type: "carInsuranceSpecialConditions",
            value: "car_insurance_special_conditions",
            url: orgDetails.organization.cp_liability_url,
          },
          {
            label:
              "[Partner Only] > DUA - Single Car Document (front and back) or Rental Agreement + DUA/DAV or Declaration of Assignment of Use +DUA/DAV",
            date: "Valid until December 25, 2024",
            type: "duaSingleCarDocument",
            value: "dua_single_car_document",
            url: orgDetails.organization.tvde_url,
          },
          {
            label:
              "[Partner Only] > Periodic Technical Inspection (Vehicles over 1 year old)",
            date: "Valid until December 25, 2024",
            type: "periodicTechnicalInspection",
            value: "periodic_technical_inspection",
            url: orgDetails.organization.drett_url,
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
              onClick={() => handleOpenDialog(item.url)}
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
              View
            </Button>
            {/* {uploadError && (
                <p className="mt-2 font-redhat text-red-400">{uploadError}</p>
              )} */}
          </Card>
        ))}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Document Viewer</DialogTitle>
          <DialogContent>
            <iframe
              src={docUrl}
              width="100%"
              height="500px"
              title="Document Viewer"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Neworganisationinfo;
