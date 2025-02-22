/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import LoadingAnimation from "./LoadingAnimation";
import { useAuth } from "../../context/authContext";

const HomeHeader = ({ setActiveComponent }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/organizations/super-admin/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        await checkAuth();
        navigate("/");
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="flex-1 flex flex-row justify-between items-center shadow-md px-8 py-2 bg-white">
      <p className="font-redhat text-2xl font-semibold">Owner Access</p>
      {error && (
        <p className="text-red-500 font-bold text-lg">
          {error.message || "Error"}
        </p>
      )}
      <div className="flex flex-row gap-10 items-center">
        <p
          className="font-redhat text-2xl font-semibold px-4 py-2 border-[2px] border-dashed border-[#c8c8c8] rounded-lg cursor-pointer hover:underline"
          onClick={() => setActiveComponent("Zones")}
        >
          All zones
        </p>
        {loading ? (
          <LoadingAnimation width={60} height={60} />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
