/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import SuccessIcon from "../../../assets/success-tick.svg";

const CountryModal = ({ open, onClose }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          bgcolor: "white",
          boxShadow: 24,
          py: 4,
          px: 3,
          width: "fit-content",
          borderRadius: 1,
        }}
      >
        {isSuccess ? (
          <>
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 2, right: 4 }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={SuccessIcon}
              alt="Success"
              style={{ width: 60, marginBottom: 16, marginLeft: 50 }}
            />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Country added successfully
            </Typography>
          </>
        ) : (
          <>
            <div className="flex justify-between gap-8 items-center mb-4">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Please select the country you want to add
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
                Select country to add
              </Typography>
              <Select
                value={selectedCountry}
                onChange={handleChange}
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "gray",
                  },
                }}
              >
                <MenuItem value="">Select Country</MenuItem>
                <MenuItem value="Portugal">Portugal</MenuItem>
                <MenuItem value="Spain">Spain</MenuItem>
                <MenuItem value="France">France</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{
                px: "60px",
                textTransform: "none",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
              onClick={() => {
                setIsSuccess(true);
                setTimeout(() => {
                  onClose();
                  setIsSuccess(false);
                }, 1000);
              }}
            >
              Add country
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CountryModal;
