/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mail } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { sendOTP, verifyOTP } from "./LoginUtils";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";
import { validateEmail } from "./ValidationUtils";

export default function LoginManager() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      const { isValid, error } = validateEmail(e.target.value);
      if(isValid) setEmailError("");
      setEmailError(error);
    }
  };

  const handleSendOTPClick = async () => {
    const { isValid, error } = validateEmail(email);
    if (!isValid) {
      setEmailError(error);
      return;
    }
    await sendOTP({ setLoading, setOtpSent, setError, toast });
  };

  const handleVerifyOTPClick = () => {
    verifyOTP({ setLoading, setIsLoggedIn, setError, email, navigate });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in with your email to continue</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!otpSent ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className={emailError ? "border-red-500" : ""}
                  />
                </div>
                {emailError && (
                  <p className="text-sm text-red-500 pl-6">{emailError}</p>
                )}
              </div>
              <Button
                className="w-full"
                onClick={handleSendOTPClick}
                disabled={loading || !email}
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                className="w-full"
                onClick={handleVerifyOTPClick}
                disabled={loading || !otp}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}