/* eslint-disable react/prop-types */
import { Card, CardContent, IconButton, Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StatusDropdown from "./StatusDropdown";
import { allDocumentStatus } from "../../utils/enums";

const SubmittedDocumentsCard = ({ orgDocuments }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        // maxHeight: "400px",
        // overflowY: "auto",
      }}
    >
      <CardContent sx={{ paddingInline: "5%" }}>
        <div className="flex justify-between items-center">
          <p className="font-redhat font-semibold text-base">
            Submitted documents
          </p>
          <IconButton aria-label="options">
            <MoreHorizIcon />
          </IconButton>
        </div>
        {orgDocuments?.length === 0 && (
          <p className="text-red-400 font-bold text-lg">
            No documents uploaded yet!
          </p>
        )}
        {orgDocuments?.length > 0 && (
          <div className="mt-4 space-y-3 font-redhat text-base max-h-72 overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
            {orgDocuments?.map((document, index) => (
              <div key={index}>
                <p className="font-bold underline cursor-pointer">
                  {document?.name}
                </p>
                <StatusDropdown
                  allStatus={allDocumentStatus}
                  currentStatus={document?.status}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <div className="px-[5%]">
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
    </Card>
  );
};

export default SubmittedDocumentsCard;
