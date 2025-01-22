import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Incoming from "../../../assets/Incoming.svg";
import Outgoing from "../../../assets/Outgoing.svg";
import Unanswered from "../../../assets/Unanswered.svg";
import Saletypechart from "../Dashboardcharts/Saletypechart";

const CustomerSupport = () => {
  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold mb-8">
        <p className="font-redhat font-semibold text-base flex items-center">
          <span className="text-[#777777] pr-2">Internal Team</span>
          {"> Customer support"}
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
          <div className="py-3 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px] cursor-pointer">
            <span className="pr-1">
              {" "}
              <AddIcon fontSize="small" />
            </span>{" "}
            Add New Employees{" "}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 gap-4">
        <div className="w-3/6 flex flex-col gap-8">
          <div className="flex justify-between">
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
                <p className="pt-2 text-sm text-[#777777]">
                  vs 290 prev 7 days
                </p>
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
                <p className="pt-2 text-sm text-[#777777]">
                  vs 210 prev 5 days
                </p>
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
                <p className="pt-2 text-sm text-[#777777]">
                  vs 150 prev 17 days
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/6 flex flex-col gap-8">
          <Saletypechart />
        </div>
        <div className="w-1/6 flex flex-col gap-8"></div>
      </div>
    </>
  );
};

export default CustomerSupport;
