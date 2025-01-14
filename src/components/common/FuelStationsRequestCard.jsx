import { Card, CardContent, Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const FuelStationsRequestCard = () => {
  const fuelStations = [
    {
      title: "Aviero BP Fuels",
      validity: "Valid until December 25, 2024",
    },
    { title: "Aviero BP Fuels", validity: "Valid until December 25, 2024" },
    {
      title: "Norway HP Fuel Stations",
      validity: "Valid until December 25, 2024",
    },
    {
      title: "United Pure fuels brothers and distributors Ltd",
      validity: "Valid until December 25, 2024",
    },
  ];

  return (
    <Card
      sx={{
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ paddingInline: "5%" }}>
        <div className="flex justify-between items-center">
          <p className="font-redhat font-semibold text-base">
            Fuel station requests
          </p>
        </div>
        <div className="mt-6 space-y-3 font-redhat text-base">
          {fuelStations.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b-[1px] border-b-[#DDDDDD] pb-4"
            >
              <p className="font-bold max-w-[60%]">{doc.title}</p>
              <p className="text-[#F68D2B] font-medium cursor-pointer">
                Review request <KeyboardDoubleArrowRightIcon />
              </p>
            </div>
          ))}
        </div>
      </CardContent>
      <div className="p-4 mb-2 mt-4">
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "black",
            color: "black",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              borderColor: "black",
            },
          }}
        >
          View all fuel station request list{" "}
          <KeyboardDoubleArrowRightIcon className="ml-4" />
        </Button>
      </div>
    </Card>
  );
};

export default FuelStationsRequestCard;
