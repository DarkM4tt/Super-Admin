import { Card, CardContent, IconButton, Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const SubmittedDocumentsCard = () => {
  const documents = [
    {
      title: "TVDE Driver Certificate",
      validity: "Valid until December 25, 2024",
    },
    { title: "Driver’s License", validity: "Valid until December 25, 2024" },
    { title: "Proof of Identity", validity: "Valid until December 25, 2024" },
    { title: "Criminal Record", validity: "Valid until December 25, 2024" },
  ];

  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="font-redhat font-semibold text-base">
            Submitted documents
          </p>
          <IconButton aria-label="options">
            <MoreHorizIcon />
          </IconButton>
        </div>
        <div className="mt-4 space-y-3 font-redhat text-base">
          {documents.map((doc, index) => (
            <div key={index}>
              <p className="font-bold">{doc.title}</p>
              <p className="text-boldCyan font-medium">{doc.validity}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <div className="px-4">
        <div className="border-t border-dashed border-gray-100 mt-2"></div>
      </div>
      <div className="p-4 mb-2">
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
          Engage operations team
        </Button>
      </div>
    </Card>
  );
};

export default SubmittedDocumentsCard;
