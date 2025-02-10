/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CheckedIcon from "../../assets/checked.svg";
import UncheckedIcon from "../../assets/unchecked.svg";

const data = [
  { id: 1, dueIn: 0, totalOutstandingAmount: 66120, fuelCards: 622 },
  { id: 2, dueIn: 2, totalOutstandingAmount: 66120, fuelCards: 2 },
  { id: 3, dueIn: 2, totalOutstandingAmount: 66120, fuelCards: 2 },
  { id: 4, dueIn: 2, totalOutstandingAmount: 66120, fuelCards: 2 },
  { id: 5, dueIn: 22, totalOutstandingAmount: 66120, fuelCards: 2 },
];

const Payouts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [checkedCards, setCheckedCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalAmountPending = 62210;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setCheckedCards([...checkedCards, id]);
    } else {
      setCheckedCards(checkedCards.filter((cardId) => cardId !== id));
    }
  };

  const CompanyPayoutCard = ({
    id,
    dueIn,
    totalOutstandingAmount,
    fuelCards,
    onCheckboxChange,
    isChecked,
  }) => {
    return (
      <div
        className={`flex justify-between items-center bg-white px-4 py-6 border-b-[1px] border-[#344BFD] rounded-lg hover:border-red-500 transition cursor-pointer`}
      >
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isChecked}
            onChange={(e) => onCheckboxChange(id, e.target.checked)}
            icon={<img src={UncheckedIcon} />}
            checkedIcon={<img src={CheckedIcon} />}
          />
          <div>
            <p className="font-redhat text-lg font-bold">ABC Company Ltd</p>
            <p className="font-redhat text-base font-medium text-gray">
              {fuelCards} fuel cards
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-redhat text-lg font-bold">Due in</span>
          <span className="font-redhat text-3xl font-bold">{dueIn} days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-redhat text-lg font-bold">
            Total outstanding amount
          </span>
          <span className="font-redhat text-3xl font-bold">
            € {totalOutstandingAmount}
          </span>
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            textTransform: "none",
            borderRadius: "8px",
            ":hover": { backgroundColor: "#333" },
            marginTop: "8px",
          }}
          onClick={handleOpenModal}
        >
          Pay now
        </Button>
      </div>
    );
  };

  const ModalComponent = ({ open, onClose, totalAmountPending }) => {
    const [payFullAmount, setPayFullAmount] = useState(false);

    const handleCheckboxChange = (event) => {
      setPayFullAmount(event.target.checked);
    };

    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        sx={{
          "& .MuiPaper-root": {
            paddingBlock: "16px",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", paddingBottom: "8px" }}>
          Payouts
          <CloseIcon
            onClick={onClose}
            sx={{
              position: "absolute",
              top: "16px",
              right: "16px",
              cursor: "pointer",
            }}
          />
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "0" }}>
          <p className="font-normal text-lg text-gray">
            The maximum limit will be from the total revenue generated.
          </p>
          <div className="mt-4">
            <p className="font-redhat text-base font-semibold">
              Total amount pending
            </p>
            <p className="font-redhat text-2xl font-bold mt-2">
              € {totalAmountPending}
            </p>
          </div>
          <div className="mt-4">
            <TextField
              label="Enter the deduction amount"
              placeholder="Enter the name of the fuel card"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "16px" }}
            />
            <div className="flex items-center">
              <Checkbox
                checked={payFullAmount}
                onChange={handleCheckboxChange}
                icon={<img src={UncheckedIcon} />}
                checkedIcon={<img src={CheckedIcon} />}
              />
              <label className="ml-2 text-base font-normal">
                Pay full amount
              </label>
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingInline: "16px" }}>
          <Button
            variant="contained"
            onClick={onClose}
            fullWidth
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              paddingBlock: "12px",
              borderRadius: "8px",
              ":hover": { backgroundColor: "#333" },
            }}
          >
            Confirm and pay
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold mb-8 text-gray">
        {"> Accounts"}
        <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="font-redhat font-semibold text-2xl">
          Please clear the payouts of various service partners.
        </p>
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
          Engage finance team
        </Button>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-between items-center">
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: "1px solid #d3d3d3",
            width: "fit-content",
            ".MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              color: "#9e9e9e",
            },
            ".Mui-selected": { color: "#1976d2", fontWeight: "bold" },
            ".MuiTabs-indicator": { backgroundColor: "#1976d2" },
          }}
        >
          <Tab label="Organisations" />
          <Tab label="Rentals" />
          <Tab label="BOLD promotions" />
          <Tab label="Fuel stations" />
          <Tab label="3rd party" />
          <Tab label="BOLD miles" />
        </Tabs>
        <div className="flex items-center gap-6">
          <div className="py-3 px-4 text-base font-redhat bg-[#FF935914] rounded-[56px] text-[#FF9359] border border-[#FF9359] cursor-pointer">
            Download transaction history
          </div>
        </div>
      </div>

      {activeTab === 0 && (
        <div className="my-6 space-y-4">
          {data.map((card) => (
            <CompanyPayoutCard
              key={card.id}
              {...card}
              onCheckboxChange={handleCheckboxChange}
              isChecked={checkedCards.includes(card.id)}
            />
          ))}
        </div>
      )}

      <ModalComponent
        open={isModalOpen}
        onClose={handleCloseModal}
        totalAmountPending={totalAmountPending}
      />
    </>
  );
};

export default Payouts;
