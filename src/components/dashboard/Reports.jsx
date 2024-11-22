import bgimg from "../../assets/landingpage/landingmainimg.jpeg"
import { Button } from "@mui/material";

const Reports = () => {
  return <div>
    <div className="min-h-[500px] relative">
      <img src={bgimg} alt="backimg" />
      
      <div className=" absolute top-[16%] flex flex-col items-center ">
        <p className="font-redhat font-bold text-5xl text-white max-w-[50%] text-center ">The BOLD way to move forward</p>
        <p className="font-normal text-xl pt-8 5xl text-white max-w-[50%] ">Experience seamless travel with our professional cab services. Whether you need a quick ride to the airport or a leisurely journey across town, we prioritize your comfort and safety.</p>
        <div className="flex gap-6 justify-center max-w-[50%]" ><Button>
        Get started
        </Button>
        <Button>
        Know more
        </Button>
        </div>
      </div>
    </div>
  </div>;
};

export default Reports;
