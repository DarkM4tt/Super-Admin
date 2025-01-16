/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SearchIcon from "@mui/icons-material/Search";
import StatusDropdown from "../common/StatusDropdown";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import BackArrow from "../../assets/leftArrowBlack.svg";
import Incoming from "../../assets/Incoming.svg";
import Outgoing from "../../assets/Outgoing.svg";
import Unanswered from "../../assets/Unanswered.svg";
import CircularProgress from "./../common/CircularProgress";
import CustomerCard from "../common/CustomerCard";

const EmployeeInfo = ({ setActiveComponent, setSelectedEmployeeId }) => {
  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <p>
          <span className="text-gray">{"All Employees >"}</span> Nolan Lipshutz
        </p>
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
      {/* Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={BackArrow}
            alt="BackArrow"
            className="mb-4 cursor-pointer"
            onClick={() => {
              setSelectedEmployeeId(null);
              setActiveComponent("Employees");
            }}
          />
        </div>
        <div className="flex items-center gap-6 pt-8">
          <div className="py-3 px-4 text-base font-redhat bg-[#FF935914] rounded-[56px] text-[#FF9359] border border-[#FF9359] cursor-pointer">
            Generate report
          </div>
          <StatusDropdown />
        </div>
      </div>

      <div className="mt-8">
        <CustomerCard />
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
          <div className="p-2 rounded-lg bg-[#00FFC321] h-fit">
            <img src={Outgoing} alt="Outgoing" />
          </div>
          <div className="">
            <p className="font-redhat font-semibold text-base">
              Answered Queries
            </p>
            <p className="pt-2 font-redhat font-bold text-2xl">221</p>
            <p className="pt-2 text-sm text-[#777777]">
              Last updated 5 min ago
            </p>
            <p className="pt-2 text-sm text-[#777777]">vs 210 prev 5 days</p>
          </div>
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
        <div
          className="w-[30%] flex items-center gap-4 p-4 bg-white rounded-lg border-b border-[#1860C4]"
          style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
        >
          <div className="flex flex-col">
            <p className="font-redhat text-md font-semibold">Performance</p>
            <p className="font-redhat text-xs font-normal">
              0 negative rating received by customers
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <p className="font-redhat text-xs">
                <span className="pr-2">
                  <FiberManualRecordIcon
                    fontSize="6px"
                    className="text-[#EEEEEE]"
                  />
                </span>
                Total calls
              </p>
              <p className="font-redhat text-xs">
                <span className="pr-2">
                  <FiberManualRecordIcon
                    fontSize="6px"
                    className="text-[#15D356]"
                  />
                </span>
                Responded calls
              </p>
            </div>
          </div>
          <CircularProgress
            value={82}
            primaryColor="#15D356"
            secondaryColor="#EEEEEE"
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeInfo;
