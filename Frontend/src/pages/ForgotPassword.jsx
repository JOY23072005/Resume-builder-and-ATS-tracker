import { useState } from "react";
import AuthCard from "../components/auth/AuthCard";
import AuthForm from "../components/auth/AuthForm";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

import {
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} from "../services/auth.service";

import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] =
    useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword({
        email,
      });

      setStep(2);
    } catch (error) {}
  };

  const handleResetPassword = async (
    e
  ) => {
    e.preventDefault();

    try {
      await verifyResetOtp({
        email,
        otp,
      });

      await resetPassword({
        email,
        otp,
        newPassword,
      });

      navigate("/login");
    } catch (error) {}
  };

  return (
    <AuthCard
      title={
        step === 1
          ? "Forgot Password"
          : "Reset Password"
      }
      subtitle={
        step === 1
          ? "Enter your email to receive an OTP"
          : "Enter OTP and set a new password"
      }
    >
      {step === 1 && (
        <AuthForm
          fields={[
            {
              name: "email",
              placeholder:
                "Email address",
            },
          ]}
          values={{ email }}
          setValues={(values) =>
            setEmail(values.email)
          }
          buttonText="Send OTP"
          onSubmit={handleSendOtp}
        />
      )}

      {step === 2 && (
        <form
          className="space-y-4"
          onSubmit={handleResetPassword}
        >
          <AuthInput
            value={email}
            type="email"
            placeholder="Email"
            onChange={() => {}}
          />

          <AuthInput
            value={otp}
            placeholder="Enter OTP"
            onChange={(e) =>
              setOtp(e.target.value)
            }
          />

          <button
            type="button"
            className="
            text-sm
            text-primary
            hover:underline
            "
            onClick={() =>
              forgotPassword({ email })
            }
          >
            Resend OTP
          </button>

          <AuthInput
            value={newPassword}
            type="password"
            placeholder="New Password"
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <AuthButton>
            Reset Password
          </AuthButton>
        </form>
      )}
    </AuthCard>
  );
}