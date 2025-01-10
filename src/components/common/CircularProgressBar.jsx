import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const CircularProgressBar = () => {
  const data = {
    labels: ["Accepted", "Cancelled by driver", "Cancelled by customer"],
    datasets: [
      {
        data: [68, 32], // Adjust percentages based on the actual data
        backgroundColor: ["#344BFD", "#F4A79D"], // Match colors to the labels
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "60%", // Adjust for inner white space (doughnut thickness)
    plugins: {
      legend: {
        display: false, // Disable legend if you don't need it
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div className="flex items-center w-full">
      <div className="flex-grow">
        <p className="font-redhat font-semibold text-base">Spend analysis</p>
        <p className="pt-1 font-redhat font-semibold text-xs">
          including all assigned fuel cards
        </p>
        <div className="pt-3 flex flex-col gap-2">
          <p className="font-redhat text-xs">
            <span className="pr-2">
              <FiberManualRecordIcon
                fontSize="6px"
                className="text-[#344BFD]"
              />
            </span>
            Total revenue
          </p>
          <p className="font-redhat text-xs">
            <span className="pr-2">
              <FiberManualRecordIcon
                fontSize="6px"
                className="text-[#F4A79D]"
              />
            </span>
            Used amount
          </p>
        </div>
      </div>
      <div className="relative w-[30%]">
        {/* The Doughnut chart */}
        <Doughnut data={data} options={options} />

        {/* Inner text */}
        <div className="absolute inset-0 flex justify-center items-center">
          <span className="text-xs font-bold font-redhat">32%</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
