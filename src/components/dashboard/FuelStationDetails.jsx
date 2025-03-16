import SearchIcon from "@mui/icons-material/Search";
import BackArrow from "../../assets/leftArrowBlack.svg";
import StatusDropdown from "../common/StatusDropdown";
import { Box, Button, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CheckCircleOutline } from "@mui/icons-material";
import stationIcon from "../../assets/station.png";
import pdfIcon from "../../assets/pdf.png";

const FuelStations = ({ setActiveComponent }) => {
  const documents = [
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

  const FuelStationInfoCard = () => (
    <Box className="px-4 py-8 bg-white rounded-lg mb-4">
      <Box className="flex justify-between items-center">
        <Box className="flex items-center">
          <img
            src={stationIcon}
            alt="Fuel Station Icon"
            className="w-30 mx-4"
          />
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-2xl">PK Brothers Fuel stations</p>
            <p className="font-normal text-base text-gray">
              <strong>Fuel type :</strong> Diesel, Gasoline
            </p>
            <div className="flex items-center text-gray gap-1">
              <LocationOnIcon fontSize="small" />
              <p className="font-normal text-base text-gray">
                House number 622, Mall Road, Aveiro, Portugal
              </p>
            </div>
          </div>
        </Box>
        <div className="py-3 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px] cursor-pointer">
          Approve and add
        </div>
      </Box>
    </Box>
  );

  const SubmittedDocumentsCard = () => (
    <Box className="p-4 bg-white rounded-lg">
      <p className="font-semibold font-redhat text-2xl mb-4">
        Submitted documents
      </p>
      {documents.map((doc, index) => (
        <Box key={index}>
          <Box className="flex justify-between items-center mb-4 py-2">
            <Box className="flex items-center">
              <div className="flex flex-col gap-2">
                <p className="font-bold text-base font-redhat">{doc.title}</p>
                <Box className="flex items-center text-green-500">
                  <CheckCircleOutline fontSize="small" />
                  <p className="ml-1 text-boldCyan font-redhat font-medium text-base">
                    Valid until {doc.expiryDate}
                  </p>
                </Box>
                <div className="flex gap-2 mt-4">
                  <img src={pdfIcon} alt="PDF Icon" className="w-6 h-6 mr-3" />
                  <p className="underline cursor-pointer">{doc.fileName}</p>
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
          {index < documents.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <div className="flex gap-2 text-gray">{"> Partners"}</div>
        <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <img
          src={BackArrow}
          alt="BackArrow"
          className="mb-4 mt-4 cursor-pointer"
          onClick={() => {
            setActiveComponent("FuelStations");
          }}
        />
        <div className="flex gap-4 items-center">
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: "black",
              color: "black",
              borderRadius: "20px",
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                borderColor: "black",
              },
            }}
          >
            Engage operations team
          </Button>
          <StatusDropdown />
        </div>
      </div>

      <Box className="flex flex-col gap-6 mt-8">
        <FuelStationInfoCard />
        <SubmittedDocumentsCard />
      </Box>
    </>
  );
};

export default FuelStations;
