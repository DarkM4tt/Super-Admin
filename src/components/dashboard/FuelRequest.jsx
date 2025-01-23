import SearchIcon from "@mui/icons-material/Search";
import BackArrow from "../../assets/leftArrowBlack.svg";
import TickIcon from "../../assets/tick.svg";
import StatusDropdown from "../common/StatusDropdown";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import partycar from "../../assets/partycar.png";
import Incoming from "../../assets/Incoming.svg";
import Unanswered from "../../assets/Unanswered.svg";
import CircularProgress from "./../common/CircularProgress";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { Button } from "@mui/material";

const FuelRequest = () =>
  // {
  // setSelectedVehicleId,
  // setActiveComponent,
  // setSelectedOrgId,
  // }
  {
    return (
      <>
        <div className="flex justify-between items-center font-redhat text-base font-semibold ">
          <span className="text-gray">{"> Partners"}</span>
          <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none"
            ></input>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={BackArrow}
              alt="BackArrow"
              className="mb-4 cursor-pointer"
              onClick={() => {
                setSelectedVehicleId(null);
                setActiveComponent("Vehicles");
              }}
            />
          </div>
          <div className="flex items-center gap-6 pt-8">
            <StatusDropdown />
          </div>
        </div>

        {/* Info Card */}
        <div className=" p-6 rounded-lg bg-white mt-8">
          <div className="flex justify-between pb-11 border-b border-[#DDDDDD] ">
            <div className="">
              <div className="flex gap-4">
                <div className="">
                  <img
                    src={partycar}
                    alt="any"
                    className="w-200 rounded-full"
                  />
                </div>
                <div className="">
                  <p className="font-sans text-2xl font-semibold flex items-center">
                    Ford Endevour{" "}
                    <span className=" pl-4 text-base text-[#777777] underline font-sans">
                      ABC Company Ltd &gt;&gt;
                    </span>
                  </p>
                  <div className="pt-2 flex gap-4">
                    <p className="font-sans text-base text-[#777777] flex gap-2 items-center">
                      <span>
                        <EmailIcon fontSize="small" />
                      </span>
                      annbaptista16@gmail.com
                    </p>
                    <p className="font-sans text-base text-[#777777] flex gap-2 items-center underline">
                      <span>
                        <CallIcon fontSize="small" />
                      </span>
                      +91-9440192122
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <p className="font-semibold text-2xl">TVDE Applicable</p>
              <div className="flex gap-2 items-center mt-4">
                <img src={TickIcon} alt="TickIcon" />
                <p className="font-semibold text-2xl">Yes</p>
                <p className="underline font-semibold text-base">
                  Change status
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-6 items-center pt-4">
            <div className="flex items-center gap-8 flex-grow">
              <div className="">
                <p className="font-redhat text-xl text-[#777777] font-normal">
                  Fuel card
                </p>
                <p className="font-semibold text-2xl pt-2"> Gasoline85 </p>
              </div>
              {/* Allocate Fuel Card Button */}
              <Button
                variant="outlined"
                sx={{
                  color: "teal",
                  borderColor: "teal",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgba(0, 128, 128, 0.1)",
                    borderColor: "teal",
                  },
                }}
              >
                Allocate fuel card
              </Button>

              {/* Reject Request Button */}
              <Button
                variant="outlined"
                sx={{
                  color: "red",
                  borderColor: "red",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                    borderColor: "red",
                  },
                }}
              >
                Reject request
              </Button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="flex gap-8 mt-8">
          <div
            className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
            style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
          >
            <div className="p-2 rounded-lg bg-[#006AFF21] h-fit">
              <img src={Incoming} alt="Incoming" />
            </div>
            <div className="">
              <p className="font-redhat font-semibold text-base">
                Total call received
              </p>
              <p className="pt-2 font-redhat font-bold text-2xl">2210</p>
              <p className="pt-2 text-sm text-[#777777]">
                Last updated 2 min ago
              </p>
              <p className="pt-2 text-sm text-[#777777]">vs 290 prev 7 days</p>
            </div>
          </div>
          <div
            className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
            style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
          >
            <div className="p-2 rounded-lg bg-[#F6A0171F] h-fit">
              <DirectionsCarFilledIcon
                fontSize="medium"
                className="text-[#F6A017]"
              />
            </div>
            <div className="">
              <p className="font-redhat font-semibold text-base">
                Total vehicles
              </p>
              <p className="pt-2 font-redhat font-bold text-2xl">22 k</p>
              <p className="pt-2 text-sm text-[#777777]">
                18 k+ currently <span className="text-[#18C4B8]">active</span>
              </p>
              <button
                className="pt-3 font-redhat text-sm font-light border-b-[2px]"
                onClick={() => setActiveComponent("Vehicles")}
              >
                View list
              </button>
            </div>
          </div>
          <div
            className="w-[30%] flex items-center gap-4 p-4 bg-white rounded-lg border-b border-[#1860C4]"
            style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
          >
            <div className="flex flex-col">
              <p className="font-redhat text-md font-semibold">
                Requested budget
              </p>
              <p className="font-redhat text-xs font-normal">
                this include budget from the earnings made till now
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <p className="font-redhat text-xs">
                  <span className="pr-2">
                    <FiberManualRecordIcon
                      fontSize="6px"
                      className="text-[#EEEEEE]"
                    />
                  </span>
                  Total income made
                </p>
                <p className="font-redhat text-xs">
                  <span className="pr-2">
                    <FiberManualRecordIcon
                      fontSize="6px"
                      className="text-[#E27712]"
                    />
                  </span>
                  Requested max. limit
                </p>
              </div>
            </div>
            <CircularProgress
              value={40}
              primaryColor="#E27712"
              secondaryColor="#EEEEEE"
            />
          </div>
          <div
            className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
            style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
          >
            <div className="p-2 rounded-lg bg-[#FFFF0021] h-fit">
              <img src={Unanswered} alt="Unanswered" />
            </div>
            <div className="">
              <p className="font-redhat font-semibold text-base">
                Unanswered Queries
              </p>
              <p className="pt-2 font-redhat font-bold text-2xl">2210</p>
              <p className="pt-2 text-sm text-[#777777]">
                Last updated 13 min ago
              </p>
              <p className="pt-2 text-sm text-[#777777]">vs 150 prev 17 days</p>
            </div>
          </div>
        </div>

        <p className="font-sans font-normal text-lg mt-8 text-gray">
          This vehicle is operating under ABC Company Ltd since 21 Oct, 2025. It
          has done 22 trips till date and have generated revenue of 221209 €. It
          is <span className="text-boldCyan">applicable</span> for this fuel
          card
        </p>
      </>
    );
  };

export default FuelRequest;
