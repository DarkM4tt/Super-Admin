import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingAnimation from "../common/LoadingAnimation";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [loginId, setLoginId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = async () => {
    setError("");
    setLoading(true);
    if (!loginId || !accessCode) {
      setError("Please enter login id and access code!");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
          email: loginId,
          password: accessCode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res?.json();
      console.log(result);
      if (result.success) {
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
    </div>
  );
}

export default LoginForm;
