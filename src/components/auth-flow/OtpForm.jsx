import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FooterButtons from "./FooterButtons";
import SignupHeader from "../common/SignupHeader";
import {
  useVerifyEmailOTPMutation,
  useLazyLoginWithEmailQuery,
  useSendEmailOTPMutation,
  useVerifyPhoneNumberMutation,
} from "../../features/auth/authSlice";

function OtpForm() {
  const location = useLocation();
  const { input, isEmail } = location.state;

  const otpLength = isEmail ? 4 : 6;
  const [otp, setOtp] = useState("".padEnd(otpLength, " "));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [verifyEmailOTP] = useVerifyEmailOTPMutation();
  const [sendEmailOTP] = useSendEmailOTPMutation();
  const [triggerLoginWithEmail] = useLazyLoginWithEmailQuery();
  const [verifyPhoneNumber] = useVerifyPhoneNumberMutation();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      setError(false);
      let newOtp = otp.split("");
      newOtp[index] = value;
      setOtp(newOtp.join(""));
      if (value && index < otpLength - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      setError(true);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      let newOtp = otp.split("");
      if (otp[index] === " " && index > 0) {
        inputRefs.current[index - 1].focus();
        newOtp[index - 1] = " ";
      } else {
        newOtp[index] = " ";
      }
      setOtp(newOtp.join(""));
    }
  };

  const isNextEnabled = otp.trim().length === otpLength;

  const handleEmailOtpVerify = async () => {
    setLoading(true);
    try {
      const response = await verifyEmailOTP({ otp }).unwrap();
      console.log(response);
      const loginResponse = await triggerLoginWithEmail().unwrap();
      console.log(loginResponse);
      localStorage.setItem("org_id", loginResponse?.user?.organization_id);
      if (loginResponse.user) {
        navigate("/home");
      } else {
        // error case
      }
    } catch (error) {
      console.error("Error: ", error);
      setOtpError(true);
      setLoading(false);
    }
  };

  const handleMobileNumberVerify = async () => {
    setLoading(true);
    try {
      const phoneData = { phone_number: input };
      const phoneVerificationResponse = await verifyPhoneNumber(
        phoneData
      ).unwrap();
      console.log(phoneVerificationResponse);
      console.log("fds", phoneVerificationResponse.phone_number_exist);
      localStorage.setItem("org_id", phoneVerificationResponse?.org?.id);
      let bool = phoneVerificationResponse.phone_number_exist;
      bool
        ? navigate("/home")
        : navigate("/signup", {
            state: {
              input,
              isEmail,
            },
          });
    } catch (error) {
      console.error("OTP verification failed", error);
      setOtpError(true);
      setLoading(false);
    }
  };

  const maskPhoneNumber = (phone) => {
    return phone.slice(0, -2).replace(/[0-9]/g, "*") + phone.slice(-2);
  };

  const handleNextClick = async () => {
    isEmail ? handleEmailOtpVerify() : handleMobileNumberVerify();
  };

  const handleResendClick = async () => {
    if (isEmail) {
      setError(false);
      setLoading(true);
      try {
        const response = await sendEmailOTP({ email: input }).unwrap();
        const token = response.Email_OTP_Token;
        localStorage.setItem("auth_token", token);
        console.log(response.Email_OTP_Token);
        setResendTimer(30);
      } catch (error) {
        console.error("Error: ", error);
        setError(true);
        setLoading(false);
        return;
      }
      setLoading(false);
    } else {
      setLoading(true);
      try {
        setResendTimer(30);
      } catch (error) {
        console.error("Error: ", error);
        setError(true);
        setLoading(false);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [resendTimer]);

  return (
    <div className="w-screen h-screen flex flex-col overflow-y-auto">
      <SignupHeader />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col py-8">
          <h2 className="text-mxl font-semibold font-redhat">
            Enter the {`${isEmail ? "4-digit" : "6-digit"}`} code sent to you
            at:
          </h2>
          <h2 className="text-mxl font-semibold font-redhat">
            {isEmail ? input : maskPhoneNumber(input)}
          </h2>
          <div className="flex mt-12">
            {otp.split("").map((digit, index) => (
              <TextField
                key={index}
                id={`otp-input-${index}`}
                value={digit.trim()}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputProps={{ maxLength: 1, type: "text" }}
                error={error || otpError}
                inputRef={(el) => (inputRefs.current[index] = el)}
                sx={{
                  width: "3rem",
                  marginRight: "1rem",
                  "& input": {
                    textAlign: "center",
                  },
                }}
              />
            ))}
          </div>
          {error && (
            <div className="text-red-500 text-xs">
              Please enter only numbers
            </div>
          )}
          {otpError && (
            <div className="text-red-500 text-xs">
              Please re-enter correct otp
            </div>
          )}
          <p className="text-lg mt-4 xl:mt-6 font-normal text-gray">
            Tip: check your spam and inbox folder
          </p>
          <div id="recaptcha-container" className="mt-4"></div>
          <Button
            variant="outlined"
            onClick={handleResendClick}
            disabled={resendTimer > 0}
            className="text-gray-600 w-fit"
            sx={{
              borderRadius: "10px",
              marginTop: "40px",
              textTransform: "none",
              fontSize: "18px",
              fontWeight: "700",
              color: "#1E293B",
              border: "1px solid #DDDDDD",
              "&:hover": {
                border: "1px solid gray",
              },
            }}
          >
            {resendTimer > 0
              ? `Please wait for ${resendTimer} seconds`
              : "Resend OTP"}
          </Button>
          <FooterButtons
            loading={loading}
            isNextEnabled={isNextEnabled}
            onNextClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
}

export default OtpForm;
