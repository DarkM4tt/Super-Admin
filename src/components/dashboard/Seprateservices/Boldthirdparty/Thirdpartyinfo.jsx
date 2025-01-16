import { useState, useRef, useEffect } from "react";
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
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import BusinessIcon from "@mui/icons-material/Business";
import Acceptancechart from "../../Dashboardcharts/Acceptancechart";
import Saletypechart from "../../Dashboardcharts/Saletypechart";
import BackArrow from "../../../../assets/leftArrowBlack.svg";
import SubmittedDocumentsCard from "../../../common/SubmittedDocuments";
import StatusDropdown from "../../../common/StatusDropdown";
import Rentalpartner from "../../../../assets/Rentalpartner.png";
import rentalonlinebooking from "../../../../assets/rentalonlinebooking.svg";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import eventimage from "../../../../assets/eventimage.png";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';
import partycar from "../../../../assets/partycar.png";
import { Checkbox, Button, FormControlLabel } from '@mui/material';

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

const Thirdpartyinfo = ({
  selectedOrgId,
  setActiveComponent,
  setSelectedOrgId,
}) => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);
  const [services, setServices] = useState({
    package: false,
    intercity: false,
  });

  const handleChange = (event) => {
    setServices({
      ...services,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSave = () => {
    console.log('Selected services:', services);
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

  const EntityTable = () => {
    const customersData = [
      {
        id: 1,
        name: "Omar Botosh",
        image: "https://via.placeholder.com/40", // Replace with actual image URL
        startDate: "2 Oct, 2024",
        duration: "1 day",
        vehicle: "MK 01MA 220L",
        amountCharged: "€ 1200",
      },
      {
        id: 2,
        name: "Nolan Geidt",
        image: "https://via.placeholder.com/40",
        startDate: "2 Oct, 2024",
        duration: "1 day",
        vehicle: "MK 01MA 220L",
        amountCharged: "€ 1200",
      },
      {
        id: 3,
        name: "Omar Botosh",
        image: "https://via.placeholder.com/40", // Replace with actual image URL
        startDate: "2 Oct, 2024",
        duration: "1 day",
        vehicle: "MK 01MA 220L",
        amountCharged: "€ 1200",
      },
      {
        id: 4,
        name: "Nolan Geidt",
        image: "https://via.placeholder.com/40",
        startDate: "2 Oct, 2024",
        duration: "1 day",
        vehicle: "MK 01MA 220L",
        amountCharged: "€ 1200",
      },
      // Add more data as needed
    ];
  
    return (
      <Box
        sx={{
          marginTop: "24px",
          padding: "16px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex justify-between">
          <p className="font-redhat font-semibold text-2xl">Recent customers</p>
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
              <TableRow>
                {["Customer name", "Ticket type", "Amount charged", "Options"].map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
  
            {/* Table Body */}
            <TableBody>
              {customersData.map((customer) => (
                <TableRow
                  key={customer.id}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <TableCell sx={{fontWeight:600, fontSize:"16px"}}>
                    <div className="flex items-center gap-2">
                      <img
                        src={Rentalpartner}
                        alt={customer.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {customer.name}
                    </div>
                  </TableCell>
                 
                  <TableCell sx={{fontWeight:600, fontSize:"16px"}}>{customer.vehicle}</TableCell>
                  <TableCell sx={{fontWeight:600, fontSize:"16px"}}>{customer.amountCharged}</TableCell>
                  <TableCell>
                    <button>
                      <MoreHorizIcon className="text-[#777777]" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <button
          className="mt-4 py-2 px-4 border w-fit border-black rounded-md font-redhat text-black text-xl font-semibold hover:bg-gray-100"
          onClick={() => alert("View customer list clicked")}
        >
          View customer list &gt;&gt;
        </button>
      </Box>
    );
  };
  

  return (
    <div className=" bg-backGround">
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
          <p className="font-redhat font-semibold text-base flex items-center">
            <span className="text-[#777777] pr-2">{"Services"} </span>
            {"> BOLD 3rd Party"}
          </p>
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
    
    <div className=" p-6 rounded-lg bg-white mt-8">
        <div className="flex justify-between pb-11 border-b border-[#DDDDDD] ">
            <div className="">
            <div className="flex gap-4">
            <div className="">
                      <img
                        src={Rentalpartner}
                        alt="any"
                        className="w-20 h-20 rounded-full"
                      />
                      
                    </div>
                    <div className="">
                        <p className="font-sans text-2xl font-semibold flex items-center">Ann Baptista <span className=" pl-4 text-base text-[#777777] underline font-sans">ABC Company Ltd  &gt;&gt;</span></p>
                        <div className="pt-2 flex gap-4">
                <p className="font-sans text-base text-[#777777] flex gap-2 items-center"><span><EmailIcon fontSize="small"/></span>annbaptista16@gmail.com</p>
                <p className="font-sans text-base text-[#777777] flex gap-2 items-center underline"><span><CallIcon fontSize="small"/></span>+91-9440192122</p>
            </div>
                    </div>
            </div>
            
            </div>
            <div className="">
                <p className="font-redhat text-xl text-[#777777]">Customer rating</p>
                <p className="pt-2 font-redhat font-bold text-xl text-[#18C4B8] text-right"><span className="text-[#FBDB0B] pr-2"><StarIcon/></span>4.5/5</p>
            </div>
        </div>
        <div className="flex justify-between gap-6 items-center pt-4">
            <img src={partycar} alt="partycar" className="w-[15%]"/>
            <div className="flex items-center gap-8 flex-grow">
                <div className="">
                <p className="font-redhat text-xl text-[#777777]">Registered vehicle</p>
                <p className="font-redhat text-xl pt-2 "> KH01MN0019M </p>
                </div>
                <p className="font-redhat font-bold text-xl text-[#344BFD]">82%</p>
                <div className="h-4 rounded-3xl bg-[#EEEEEE] flex-grow relative ">
                 <div className="h-4 rounded-3xl bg-[#344BFD] absolute w-[82%]"></div>
                </div>
            </div>
            <p className="font-redhat font-semibold text-xl text-[#777777]">Acceptance ratio</p>
        </div>
    </div>

      {/* Cards */}
      <div className="flex justify-between pt-8">
        {/* Left Cards */}
        <div className="w-4/6">
          {/* Top Three Cards */}
          <div className="flex justify-between">
          <div
              className="w-[30%] flex flex-col p-4 bg-white rounded-lg border-b border-[#1860C4]"
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
              <div className="mt-4 h-16 flex-grow">
                <Line ref={chartRef} data={data} options={options} />
              </div>
            </div>
            <div
              className="w-[30%] p-6 flex gap-6 bg-white items-center rounded-lg border-b border-[#1860C4]"
              style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
            >
              <div className="p-2 rounded-lg bg-[#FFFF0021] h-fit">
                <ConfirmationNumberIcon
                  fontSize="medium"
                  className="text-black"
                />
              </div>
              <div className="">
                <p className="font-redhat font-semibold text-base">
                Total trips taken
                </p>
                <p className="pt-2 font-redhat font-bold text-2xl">3320</p>
                <p className="pt-2 text-sm text-[#777777] font-redhat">
                Next event 12 days ahead 
                </p>
                <p className="pt-2 text-sm text-[#777777] font-redhat">
                12 tickets sold this week
                </p>
              </div>
            </div>
            <div
              className="w-[30%] p-6 flex flex-col gap-6 bg-white rounded-lg border-b border-[#1860C4]"
              style={{ boxShadow: "4px 4px 33px 0px #0000000A" }}
            >
               <div className="flex justify-between items-center w-full  ">
                <p className="font-redhat font-semibold text-base">
                3rd Party Partner Profile
                </p>
                <button>
                  <MoreHorizIcon className="text-[#777777]" />
                </button>
              </div>
              <div className="pt-3 flex gap-4 items-center">
                <img src={Rentalpartner} className="w-[16%]" alt="rentalpartner " />
                <p className="font-sans text-base">Tatiana Bothman</p>
              </div>
              <button className="w-full bg-black py-2 font-redhat font-semibold text-lg text-white rounded-lg">{"Clear accounts >>"}</button>
            </div>
           
          </div>
          {/* Table */}
          <EntityTable />
        </div>

        {/* Right Cards */}
        <div className="w-[30%] flex flex-col gap-6">
          <div className="px-4 py-6 bg-white rounded-lg" style={{boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",}}>
      {/* Title and Save Button */}
      <div className="flex justify-between items-center">
        <p className="font-semibold font-redhat text-base">Services covered</p>
        <Button
          variant="contained"
          style={{
            backgroundColor: 'black',
            color: 'white',
            textTransform: 'none',
            fontSize:"14px"
          }}
          onClick={handleSave}
        >
          Save changes
        </Button>
      </div>

      {/* Checkboxes */}
      <div className="flex gap-4 pt-10">
        <FormControlLabel
          control={
            <Checkbox
              checked={services.package}
              onChange={handleChange}
              name="package"
              sx={{
                color: '#777777',
                '&.Mui-checked': {
                  color: '#18C4B8',
                },
              }}
            />
          }
          label="Package"
          className="text-gray-800 text-sm"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={services.intercity}
              onChange={handleChange}
              name="intercity"
              sx={{
                color: '#777777',
                '&.Mui-checked': {
                  color: '#18C4B8',
                },
              }}
            />
          }
          label="Intercity"
          className="text-gray-800 text-sm"
        />
      </div>
          </div>
          <SubmittedDocumentsCard />
        </div>
      </div>
    </div>
  );
};

export default Thirdpartyinfo;
