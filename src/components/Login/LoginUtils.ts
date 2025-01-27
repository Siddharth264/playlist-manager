/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from "react-router-dom";

type SendOtpParams = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  toast: any;
};

type VerifyOtpParams = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  navigate: NavigateFunction;
};

export const sendOTP = async ({
  setLoading,
  setOtpSent,
  setError,
  toast,
}: SendOtpParams) => {
  setLoading(true);
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockOTP = Math.floor(100000 + Math.random() * 900000); 
    
    setOtpSent(true);
    setError("");
    
    toast({
      title: "OTP Sent Successfully!",
      description: `Your OTP is: ${mockOTP}`,
      duration: 5000,
    });
  } catch (err) {
    console.log(err);
    setError("Failed to send OTP. Please try again.");
  }
  setLoading(false);
};

export const verifyOTP = async ({
  setLoading,
  setIsLoggedIn,
  setError,
  email,
  navigate,
}: VerifyOtpParams) => {
  setLoading(true);
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoggedIn(true);
    setError("");
    localStorage.setItem("loggedInUser", email);
    navigate("/");
  } catch (err) {
    console.log(err);
    setError("Invalid OTP. Please try again.");
  }
  setLoading(false);
};