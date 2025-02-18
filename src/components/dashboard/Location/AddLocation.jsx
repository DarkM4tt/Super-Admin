import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CountryModal from "./CountryModal";

const AddLocation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCountry = (country) => {
    console.log("Adding country:", country);
    // Add your logic to handle the country addition here
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <p className="text-gray">
          {"Location > "}
          <span className="text-black">Add Location</span>
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

      <div className="flex gap-4 w-full mt-8 font-redhat font-semibold text-3xl">
        <div
          className="flex-1 flex items-center justify-center border-2 border-dashed border-gray h-40 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Add country
        </div>
        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray h-40 cursor-pointer">
          Add city
        </div>
      </div>

      <CountryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCountry={handleAddCountry}
      />
    </>
  );
};

export default AddLocation;
