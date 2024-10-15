import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../../firebase";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingAnimation from "../common/LoadingAnimation";
import { useSendEmailOTPMutation } from "../../features/auth/authSlice";

function LoginForm() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [sendEmailOTP] = useSendEmailOTPMutation();
  const auth = getAuth(app);

  const handlePhoneSignIn = async () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {}
    );
    const appVerifier = window.recaptchaVerifier;
    setLoading(true);
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      input,
      appVerifier
    );
    console.log("RES: ", confirmationResult);
    sessionStorage.setItem("verificationId", confirmationResult.verificationId);
    navigate("/otp", {
      state: {
        input,
        isEmail: false,
      },
    });
  };

  const handleEmailContinue = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await sendEmailOTP({ email: input }).unwrap();
      const token = response.Email_OTP_Token;
      localStorage.setItem("auth_token", token);
      console.log(response.Email_OTP_Token);
      navigate("/otp", {
        state: { input, isEmail: true },
      });
    } catch (error) {
      console.error("Error: ", error);
      setError(true);
    }
    setLoading(false);
  };

  const handleContinue = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\+[0-9]{1,4}[0-9]{6,}$/;

    if (!input) {
      setError(true);
      return;
    }

    if (emailRegex.test(input)) {
      handleEmailContinue();
    } else if (phoneRegex.test(input)) {
      setError(false);
      handlePhoneSignIn();
    } else {
      setError(true);
      return;
    }
  };

  const orgId = localStorage.getItem("org_id");

  if (orgId && orgId !== "undefined") {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex px-20 flex-col py-8 gap-6">
      <p className="text-fontBlack text-mxl font-semibold font-redhat">
        Enter your phone number or email?
      </p>
      <div className="flex flex-col gap-2">
        <TextField
          placeholder="Enter your email or phone no."
          variant="outlined"
          value={input}
          error={error}
          onChange={(e) => setInput(e.target.value)}
        />
        {error && (
          <p className="text-red-500 text-xs">
            Enter a valid email or mobile number with country code
          </p>
        )}
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
        {loading ? <LoadingAnimation height={30} width={30} /> : "Continue"}
      </Button>
      <p className="text-gray text-lg font-normal font-sans mt-2">
        Lorem ipsum dolor sit amet consectetur. Eget venenatis est adipiscing
        senectus. Adipiscing lorem est scelerisque congue donec in.
      </p>
    </div>
  );
}

export default LoginForm;
