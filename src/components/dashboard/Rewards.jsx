import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CustomDropdown from "./../common/CustomDropdown";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Box,
  Button,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import CreateNewRewardModal from "./CreateNewRewardModal";

const Rewards = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    cardName: "",
    fuelType: "",
    fuelCategory: "",
    Rewards: "",
    cardLimit: "",
    revenueNeeded: "",
    amount: "",
  });
  const dropdownOptions = [
    { title: "Fuel Stations", value: "stations" },
    { title: "Vehicles", value: "vehicles" },
  ];

  const handleSave = () => {
    console.log("Saved Data:", formData);
    setModalOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const EntityTable = () => {
    const driversData = [
      {
        id: 1,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        customerID:"@iamomerbotosh112kmsas_khan",
        totalRides: 789,
      },
      {
        id: 2,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        customerID:"@iamomerbotosh112kmsas_khan",
        totalRides: 789,
      },
      {
        id: 3,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        customerID:"@iamomerbotosh112kmsas_khan",
        totalRides: 789,
      },
      {
        id: 4,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        customerID:"@iamomerbotosh112kmsas_khan",
        totalRides: 789,
      },
      {
        id: 5,
        name: "Omar Botosh",
        assignedVehicle: "MX 019MMA9",
        customerID:"@iamomerbotosh112kmsas_khan",
        totalRides: 789,
      },
    ];

    return (
      <Box
        sx={{
          paddingInline: "15px",
          paddingBlock: "30px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <div className="flex justify-between items-center">
          <p className="font-redhat font-semibold text-2xl">List of applicable customers</p>
          <CustomDropdown options={dropdownOptions} />
        </div>
        <TableContainer>
          <Table>
            {/* Table Header */}
            <TableHead
              sx={{
                "& .MuiTableCell-root": {
                  backgroundColor: "#EEEEEE",
                  fontWeight: "400",
                  fontSize: "16px",
                  borderBottom: "none",
                  color:"black"
                },
                "& .MuiTableCell-root:first-of-type": {
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                },
                "& .MuiTableCell-root:last-of-type": {
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                },
              }}
            >
              <TableRow
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "10px",
                  fontSize: "16px",
                  paddingBottom:"24px"
                }}
              >
                {["Customer name", "Total ride taken", "Total spends","Customer ID","Options"].map(
                  (header) => (
                    <TableCell key={header}>{header}</TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {driversData.map((org) => (
                <TableRow
                  key={org.id}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  <TableCell sx={{fontWeight:"600",fontSize:"16px",color:"black"}}>{org.name}</TableCell>
                  <TableCell  sx={{fontWeight:"600",fontSize:"16px",color:"black"}}>{org.assignedVehicle}</TableCell>
                  <TableCell  sx={{fontWeight:"600",fontSize:"16px",color:"black"}}>{org.totalRides}</TableCell>
                  <TableCell  sx={{fontWeight:"600",fontSize:"16px",color:"black"}}>{org.customerID}</TableCell>
                  <TableCell>
                    <button>
                      <MoreHorizIcon className="text-black" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: "black",
              color: "black",
              borderRadius: "10px",
              fontSize: "20px",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                borderColor: "black",
              },
            }}
          >
            View all list &gt;&gt;
          </Button>
        </div>
      </Box>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base text-gray font-semibold mb-8">
        {"Accounts > Rewards"}
        <div className="flex gap-4">
          <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none"
            ></input>
          </div>
        </div>
      </div>

      <p className="font-redhat font-semibold text-2xl pt-8">Rewards</p>
      <p className="font-normal text-lg text-gray pt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.{" "}
      </p>
      <p className="font-normal text-lg text-gray pt-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.{" "}
      </p>

      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-8 items-center">
          <p className="font-redhat font-semibold text-2xl">
            Select options to proceed
          </p>
        </div>
        <div className="flex gap-6">
        <div
          className="py-3 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px] cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <span className="pr-1">
            {" "}
            <AddIcon fontSize="small" />
          </span>{" "}
          Create new reward{" "}
        </div>
        <div
          className="py-3 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px] cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
         In-app reward
        </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center mt-8">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: "1px solid #d3d3d3",
            width: "fit-content",
            ".MuiTab-root": {
              textTransform: "none",
              fontWeight: 400,
              color: "#9e9e9e",
              paddingY:"8px",
              fontSize:"16px"
            },
            ".Mui-selected": { color: "#1976d2", fontWeight: "600",paddingY:"8px", fontSize:"16px" },
            ".MuiTabs-indicator": { backgroundColor: "#1976d2" },
          }}
        >
          <Tab label="Coupons" />
          <Tab label="Rewards" />
          <Tab label="Voucher" />
        </Tabs>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "black",
            color: "black",
            borderRadius: "30px",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              borderColor: "black",
            },
          }}
        >
          Engage finance team
        </Button>
      </div>

      {activeTab === 0 && <EntityTable />}
      {activeTab === 1 && <p className="text-red-400 p-6">Empty</p>}
      {activeTab === 2 && <p className="text-red-400 p-6">Empty</p>}

      <CreateNewRewardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />
    </>
  );
};

export default Rewards;
