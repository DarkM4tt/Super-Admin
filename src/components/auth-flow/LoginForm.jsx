import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingAnimation from "../common/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function LoginForm() {
  const [loginId, setLoginId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { checkAuth, authLoading } = useAuth();

  const handleContinue = async () => {
    setError("");
    if (!loginId || !accessCode) {
      setError("Please enter login id and access code!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/organizations/super-admin/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email: loginId,
            password: accessCode,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await res?.json();
      console.log(result);
      if (result?.success) {
        await checkAuth();
        navigate("/home");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <LoadingAnimation width={500} height={500} />;
  }

  return (
    <div className="flex flex-col gap-6 max-w-[650px]">
      <div className="flex flex-col gap-2">
        <p className="font-redhat font-bold text-4xl">Login</p>
        <p className="font-sans font-normal text-xl text-[#5C5C5C]">
          Please login to continue
        </p>
      </div>
      <p className="text-fontBlack text-mxl font-semibold font-redhat">
        Please provide your details
      </p>
      <div className="flex flex-col gap-4">
        <TextField
          placeholder="Enter your login ID"
          variant="outlined"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <TextField
          placeholder="Enter your access code"
          variant="outlined"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          fontWeight: 700,
          fontFamily: "Red Hat Display, sans-serif",
          textTransform: "none",
          color: "white",
          "&:hover": {
            backgroundColor: "black",
          },
          borderRadius: "10px",
          padding: "12px 0px",
        }}
        fullWidth
        onClick={handleContinue}
      >
        {loading ? (
          <LoadingAnimation height={30} width={30} />
        ) : (
          "Login to owner access"
        )}
      </Button>
      <p className="text-gray text-lg font-normal font-sans mt-2">
        This is the owner access login and hence it is having all the BOLD data.
        Any wrong scripted login is strictly prohibited.
      </p>
      <div className="flex gap-4">
        <button
          className="border-[2px] border-red-400 rounded text-lg text-red-400 w-fit px-4 py-1"
          onClick={() => {
            setLoginId("superadmin@gmail.com");
            setAccessCode("SuperAdmin@123");
          }}
        >
          Testing ? get demo email and password
        </button>
        <button
          className="border-[2px] border-green-400 rounded text-lg text-green-400 w-fit px-4 py-1"
          onClick={() => {
            setLoginId("");
            setAccessCode("");
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
