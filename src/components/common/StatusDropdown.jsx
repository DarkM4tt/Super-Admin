/* eslint-disable react/prop-types */
import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const StatusDropdown = ({ allStatus, currentStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (status) => {
    setSelectedStatus(status);
    handleClose();
  };

  const selectedStatusData = allStatus?.find(
    (status) => status.label === selectedStatus
  );

  return (
    <div>
      <Button
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textTransform: "none",
          backgroundColor: "#fff",
          borderRadius: "50px",
          padding: "8px 16px",
        }}
      >
        <span className="flex items-center">
          <p className="text-gray-600">Status :</p>
          <span
            className={`w-3 h-3 rounded-full ${selectedStatusData?.color} ml-2`}
          ></span>
          <span
            className="ml-1"
            style={{
              color:
                selectedStatusData?.label === "Operating"
                  ? "#0cbaba"
                  : selectedStatusData?.label === "Rejected"
                  ? "#e74c3c"
                  : "#f39c12",
            }}
          >
            {selectedStatus}
          </span>
        </span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "10px",
            minWidth: "200px",
            overflow: "hidden",
          },
        }}
      >
        {allStatus
          ?.filter((status) => status.label !== selectedStatus)
          .map((status) => (
            <MenuItem
              key={status.label}
              onClick={() => handleSelect(status.label)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <span className="text-gray-600">Status :</span>
              <span className={`w-3 h-3 rounded-full ${status.color}`}></span>
              <span
                style={{
                  color:
                    status.label === "Operating"
                      ? "#0cbaba"
                      : status.label === "Rejected"
                      ? "#e74c3c"
                      : "#f39c12",
                }}
              >
                {status.label}
              </span>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default StatusDropdown;
