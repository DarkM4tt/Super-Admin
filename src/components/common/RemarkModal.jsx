/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const RemarksModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontSize: 18,
          fontWeight: 600,
          p: 2,
          pb: 1,
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        Remarks
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select the document
          </label>
          <Select
            fullWidth
            displayEmpty
            sx={{
              height: 42,
              fontSize: 14,
              backgroundColor: "white",
              borderRadius: "6px",
              border: "1px solid #D1D5DB",
              "& .MuiSelect-select": { p: "10px" },
            }}
          >
            <MenuItem value="">Select document</MenuItem>
          </Select>
        </div>

        <div className="mb-4 bg-gray-100 p-4 rounded-lg border border-gray-300">
          <p className="text-sm text-gray-700">
            Hi, your document ABC name was rejected as it does not have proper
            photo quality. Please re-upload the document.
          </p>
          <p className="text-xs text-gray-500 mt-1">12:11 PM | Today</p>
          <div className="flex items-center gap-2 mt-2">
            <PictureAsPdfIcon className="text-red-600" />
            <span className="text-sm text-blue-600 underline cursor-pointer">
              Personal Accid....pdf
            </span>
          </div>
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
          <TextField
            fullWidth
            placeholder="Write your text here"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: { fontSize: 14, color: "#374151" },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2DD4BF",
              color: "white",
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              py: 1,
              ml: 2,
              fontSize: 14,
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": { backgroundColor: "#25B5A0" },
            }}
          >
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemarksModal;
