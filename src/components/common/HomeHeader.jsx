import { useNavigate } from "react-router-dom";
import boldCyan from "../../assets/boldCyan.svg";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

// eslint-disable-next-line react/prop-types
const HomeHeader = ({ showsidebar, setshowsidebar }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("org_id");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("_grecaptcha");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between shadow-md">
      <div className="bg-themeBlue w-[42.5%]  sm:w-1/5 py-4 flex items-center max-w-[280px] gap-4 justify-center md:justify-start flex-col md:flex-row ">
        <img
          src={boldCyan}
          alt="bold"
          className="w-20 cursor-pointer md:ml-10"
          onClick={handleClick}
        />
        <div
          className=" block md:hidden text-white"
          onClick={() => {
            setshowsidebar(!showsidebar);
          }}
        >
          <MenuIcon fontSize="large" />
        </div>
      </div>
      <div className="flex-1 flex flex-row justify-between items-center px-10">
        <p className="font-redhat text-2xl font-semibold">Owner Access</p>
        <div className="flex flex-row gap-10">
          <div
            className="flex flex-row items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md group"
            onClick={handleLogout}
          >
            <IconButton
              sx={{
                color: "red",
                "&:hover": { backgroundColor: "transparent" }, // Remove default hover effect
              }}
            >
              <LogoutIcon />
            </IconButton>
            <p className="font-redhat text-2xl font-semibold ml-2 group-hover:text-red-600">
              Log out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
