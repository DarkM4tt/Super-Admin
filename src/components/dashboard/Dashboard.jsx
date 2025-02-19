/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import BusinessIcon from "@mui/icons-material/Business";
import CloseIcon from "@mui/icons-material/Close";
import Acceptancechart from "./Dashboardcharts/Acceptancechart";
import Bookinggraph from "./Dashboardcharts/Bookinggraph";
import Saletypechart from "./Dashboardcharts/Saletypechart";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Checkbox,
} from "@mui/material";
import Zones from "./Zones";
import DeleteIcon from "@mui/icons-material/Delete";

// Register required chart.js components
// Chart.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = ({ onMenuItemClick }) => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);
  const [openZonesDialog, setOpenZonesDialog] = useState(false);
  const [createzone, setcreatezone] = useState(false);

  const handleOpenDialog = () => {
    setOpenZonesDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenZonesDialog(false);
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;

      // Calculate the chart's dimensions for gradient bounds
      const chartArea = chart.chartArea;
      const gradientFill = ctx.createLinearGradient(
        0, // x0
        chartArea.top, // y0
        0, // x1
        chartArea.bottom // y1
      );

      gradientFill.addColorStop(0, "rgba(59, 130, 246, 0.5)"); // Blue with opacity
      gradientFill.addColorStop(0.5, "rgba(59, 130, 246, 0.25)");
      gradientFill.addColorStop(1, "rgba(59, 130, 246, 0)");
      setGradient(gradientFill);
    }
  }, []);

  const zones = [
    {
      id: 1,
      name: "Mid-eve",
      area: "View in-map",
      vehicles: 622,
      rate: "€ 1120",
    },
    {
      id: 2,
      name: "Mid-eve",
      area: "View in-map",
      vehicles: 622,
      rate: "€ 1120",
    },
    {
      id: 3,
      name: "Mid-eve",
      area: "View in-map",
      vehicles: 622,
      rate: "€ 1120",
    },
    {
      id: 4,
      name: "Mid-eve",
      area: "View in-map",
      vehicles: 622,
      rate: "€ 1120",
    },
    {
      id: 5,
      name: "Mid-eve",
      area: "View in-map",
      vehicles: 622,
      rate: "€ 1120",
    },
  ];

  const data = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Last 6 months",
        data: [200000, 250000, 150000, 270000, 230000],
        borderColor: "#3B82F6", // Blue line color
        backgroundColor: gradient || "rgba(59, 130, 246, 0.5)", // Fallback to solid color
        tension: 0.4, // Curved line
        fill: true,
        borderWidth: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false, // This hides the data labels
      },
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide gridlines
        },
        ticks: {
          display: false, // Hide x-axis numbers
        },
      },
      y: {
        grid: {
          display: false, // Hide gridlines
        },
        ticks: {
          display: false, // Hide y-axis numbers
        },
      },
    },
  };

  return (
    <>
      <div className="">
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
        <p className="font-redhat font-semibold text-2xl pt-8">Overview</p>
        <p className="font-redhat font-normal text-sm  text-[#777777] pt-2">
          This is the overall highlights which includes everything in the BOLD
          applications.{" "}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 pt-8">
            <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px]">
              622 fuel stations signup{" "}
              <span className="pl-2">
                {" "}
                <KeyboardDoubleArrowRightIcon />
              </span>{" "}
            </div>
            <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px]">
              109 rentals signups{" "}
              <span className="pl-2">
                {" "}
                <KeyboardDoubleArrowRightIcon />
              </span>{" "}
            </div>
            <div className="py-3 px-4 text-sm font-redhat bg-white rounded-[40px]">
              221 M new users{" "}
              <span className="pl-2">
                {" "}
                <KeyboardDoubleArrowRightIcon />
              </span>{" "}
            </div>
          </div>
          <div className="flex items-center gap-6 pt-8">
            <div className="py-3 px-4 text-base font-redhat bg-[#FF935914] rounded-[56px] text-[#FF9359] border border-[#FF9359]">
              Generate overview report
            </div>
            <div
              className="py-3 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px] flex"
              onClick={handleOpenDialog}
            >
              All zones
              <span className="pl-1">
                {" "}
                <KeyboardDoubleArrowRightIcon fontSize="small" />
              </span>
            </div>
            <Dialog
              open={openZonesDialog}
              onClose={handleCloseDialog}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle sx={{ paddingX: "32px", paddingY: "40px" }}>
                Create Zone
                <IconButton
                  aria-label="close"
                  onClick={handleCloseDialog}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              {createzone ? (
                <DialogContent sx={{ paddingX: "32px" }}>
                  <Zones />
                </DialogContent>
              ) : (
                <DialogContent className="">
                  <div className="flex justify-between">
                    <p className="text-sm mb-4">
                      Your zone have been created successfully, please fill in
                      the below details and submit
                    </p>

                    <div className="flex flex-col justify-between gap-4">
                      <button
                        variant="contained"
                        onClick={() => setcreatezone(true)}
                        className="py-3 px-4 text-base font-redhat bg-[#000000] text-white rounded-[56px]"
                      >
                        <span className="pr-1">
                          {" "}
                          <AddIcon fontSize="small" />
                        </span>
                        Create new zone
                      </button>
                      <button
                        variant="outlined"
                        className="py-3 px-4 text-base font-redhat border border-black rounded-[56px]"
                      >
                        <span className="pr-1">
                          {" "}
                          <DeleteIcon fontSize="small" />
                        </span>
                        Delete selection
                      </button>
                    </div>
                  </div>

                  <table className="table-auto w-full border-spacing-y-4 border-separate mt-6">
                    <tbody className="">
                      {zones.map((zone, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-[#F5F5F5] w-full `}
                        >
                          <td className=" w-[30px]">
                            <Checkbox />
                          </td>
                          <td className="py-2 px-4 text-left">
                            <div className="flex flex-col gap-2 ">
                              <p className="font-redhat font-bold text-lg">
                                Zone name
                              </p>
                              <p className="font-redhat font-medium text-base text-[#666666]">
                                {zone.name}
                              </p>
                            </div>
                          </td>
                          <td className="py-2 px-4 cursor-pointer">
                            <div className="flex flex-col gap-2 ">
                              <p className="font-redhat font-bold text-lg">
                                Area
                              </p>
                              <p className="font-redhat font-medium text-base text-[#666666] underline">
                                View in-map
                              </p>
                            </div>
                          </td>
                          <td className="py-2 px-4 ">
                            <div className="flex flex-col gap-2 ">
                              <p className="font-redhat font-bold text-lg">
                                Vehicle around
                              </p>
                              <p className="font-redhat font-medium text-base text-[#666666]">
                                {zone.vehicles}
                              </p>
                            </div>
                          </td>
                          <td className="py-2 px-4 text-right">
                            <div className="flex flex-col gap-2 ">
                              <p className="font-redhat font-bold text-lg">
                                Rate
                              </p>
                              <p className="font-redhat font-medium text-base text-[#666666]">
                                62
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>
        <div className="flex justify-between pt-8">
          <div className="w-4/6">
            <div className="flex justify-between ">
              <div
                className="w-[30%] p-4 bg-white rounded-lg border-b border-[#1860C4]"
                style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
              >
                <div className="flex justify-between items-center  ">
                  <p className="font-redhat font-semibold text-base">
                    Total revenue
                  </p>
                  <button>
                    <MoreHorizIcon className="text-[#777777]" />
                  </button>
                </div>
                <div className="flex gap-2 pt-2 items-center">
                  <p className="font-redhat font-bold text-2xl">€ 22.1 M</p>
                  <p className="font-redhat font-semibold text-xs text-[#777777]">
                    {" "}
                    <span>
                      <TrendingUpIcon className="text-[#18C4B8] pr-2" />
                    </span>
                    2% UP
                  </p>
                </div>
                <div className="mt-4 h-16">
                  <Line ref={chartRef} data={data} options={options} />
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
                    18 k+ currently{" "}
                    <span className="text-[#18C4B8]">active</span>
                  </p>
                  <button className="pt-3 font-redhat text-sm font-light underline">
                    View list
                  </button>
                </div>
              </div>
              <div
                className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
                style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
              >
                <div className="p-2 rounded-lg bg-[#006AFF21] h-fit">
                  <BusinessIcon fontSize="medium" className="text-[#006AFF]" />
                </div>
                <div className="">
                  <p className="font-redhat font-semibold text-base">
                    Total users
                  </p>
                  <p className="pt-2 font-redhat font-bold text-2xl">2210</p>
                  <p className="pt-2 text-sm text-[#777777]">
                    including 320 rental org.
                  </p>
                  <button
                    className="pt-3 font-redhat text-sm font-light underline"
                    onClick={() => onMenuItemClick("Customer")}
                  >
                    View list
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-6 ">
              <div
                className="w-[30%] flex p-4 bg-white rounded-lg border-b border-[#1860C4]"
                style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
              >
                <Acceptancechart />
              </div>
              <div
                className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
                style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
              >
                <div className="p-2 rounded-lg bg-[#deeaea] h-fit">
                  <DirectionsCarFilledIcon
                    fontSize="medium"
                    className="text-[#18C4B8]"
                  />
                </div>
                <div className="">
                  <p className="font-redhat font-semibold text-base">
                    Total cabs booked
                  </p>
                  <p className="pt-2 font-redhat font-bold text-2xl">22 k</p>
                  <p className="pt-2 text-sm text-[#777777]">
                    18 k+ currently ongoing
                  </p>
                  <button
                    className="pt-3 font-redhat text-sm font-light underline"
                    onClick={() => onMenuItemClick("Trips")}
                  >
                    View list
                  </button>
                </div>
              </div>
              <div
                className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
                style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
              >
                <div className="p-2 rounded-lg bg-[#006AFF21] h-fit">
                  <BusinessIcon fontSize="medium" className="text-[#006AFF]" />
                </div>
                <div className="">
                  <p className="font-redhat font-semibold text-base">
                    Total employees
                  </p>
                  <p className="pt-2 font-redhat font-bold text-2xl">2210</p>
                  <p className="pt-2 text-sm text-[#777777]">
                    including 320 rental org.
                  </p>
                  <button className="pt-3 font-redhat text-sm font-light underline">
                    View list
                  </button>
                </div>
              </div>
            </div>
            <Bookinggraph />
          </div>
          <div className="w-[30%] flex flex-col gap-6">
            <div
              className=" p-4 bg-white rounded-lg "
              style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
            >
              <div className="flex justify-between items-center  ">
                <p className="font-redhat font-semibold text-base">
                  Total revenue
                </p>
                <button>
                  <MoreHorizIcon className="text-[#777777]" />
                </button>
              </div>
              <div className="flex gap-2 pt-2 items-center">
                <p className="font-redhat font-bold text-2xl">€ 22.1 M</p>
                <p className="font-redhat font-semibold text-xs text-[#777777]">
                  {" "}
                  <span>
                    <TrendingUpIcon className="text-[#18C4B8] pr-2" />
                  </span>
                  2% UP
                </p>
              </div>
              <p className="font-redhat text-base text-[#777777] pt-2">
                Including all sectors on BOLD app{" "}
              </p>
              <div className="mt-4 h-24">
                <Line ref={chartRef} data={data} options={options} />
              </div>
            </div>
            <Saletypechart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
