/* eslint-disable react/prop-types */
import SearchIcon from "@mui/icons-material/Search";
import BackArrow from "../../../assets/leftArrowBlack.svg";
import { Button } from "@mui/material";

const ZoneCharges = ({ setActiveComponent }) => {
  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        {"> Dashboard"}
        <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>

      <p className="font-redhat font-semibold text-2xl mt-8">
        <img
          src={BackArrow}
          alt="BackArrow"
          className="cursor-pointer inline mr-4"
          onClick={() => {
            setActiveComponent("NewZone");
          }}
        />
        Overview
      </p>
      <p className="font-redhat font-normal text-sm text-[#777777] mt-2">
        Create, edit or switch on-off your zone.
      </p>

      <div className="flex justify-between items-center">
        <p className="font-redhat font-bold text-3xl mt-8">
          Create zone charges
        </p>
        <Button
          variant="contained"
          sx={{
            paddingInline: "6%",
            paddingBlock: "10px",
            textTransform: "none",
            backgroundColor: "black",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0)",
            },
          }}
          onClick={() => setActiveComponent("ZoneCharges")}
        >
          Save & publish
        </Button>
      </div>

      <div className="bg-[#ecebeb] p-8 mt-8">
        <p className="font-sans font-semibold text-2xl">
          Enter the pricing details
        </p>
      </div>
    </>
  );
};

export default ZoneCharges;
