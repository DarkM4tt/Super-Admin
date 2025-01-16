import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import profilePic from "../../assets/annBaptista.png"; // Replace with your actual path

const CustomerCard = () => {
  return (
    <div className="bg-white rounded-lg px-6 pt-4 py-8 flex items-center justify-between">
      {/* Profile Section */}
      <div className="flex items-center gap-4">
        {/* Profile Image */}
        <img
          src={profilePic}
          alt="Customer"
          className="w-16 h-16 rounded-full object-cover"
        />

        {/* Customer Details */}
        <div>
          <p className="text-2xl font-semibold text-black">Ann Baptista</p>

          {/* Email and Phone on the Same Line */}
          <div className="flex items-center text-sm text-gray-600 gap-4 mt-1">
            <div className="flex items-center gap-1">
              <EmailIcon fontSize="small" sx={{ color: "gray" }} />
              <p className="text-gray underline font-normal text-base">
                annbaptista16@gmail.com
              </p>
            </div>
            <div className="flex items-center gap-1">
              <PhoneIcon fontSize="small" sx={{ color: "gray" }} />
              <p className="text-gray underline font-normal text-base">
                +91-9440192122
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 gap-2 mt-1">
            <LocationOnIcon fontSize="small" sx={{ color: "gray" }} />
            <p className="text-gray font-normal text-base">
              House number 622, Mall Road, Aveiro, Portugal
            </p>
          </div>
        </div>
      </div>

      {/* Customer Rating */}
      <div className="flex flex-col items-end">
        <p className="font-redhat text-xl font-normal text-gray">
          Customer rating
        </p>
        <div className="flex items-center gap-1 mt-1">
          <StarIcon fontSize="medium" sx={{ color: "#FBDB0B" }} />
          <span className="text-boldCyan font-redhat font-bold text-lg">
            4.5/5
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
