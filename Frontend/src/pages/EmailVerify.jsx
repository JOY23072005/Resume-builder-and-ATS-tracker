import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  sendVerificationOtp,
  verifyEmail,
} from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

export default function EmailVerify() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
        const res = await verifyEmail({
            email,
            otp,
        });

        localStorage.setItem(
            "token",
            res.data.token
        );

        setUser(res.data.user);

        navigate("/");
        } catch (error) {}
    };

    const handleResendOtp = async () => {
        try {
        await sendVerificationOtp({
            email,
        });
        } catch (error) {
            toast.error("Failed to send OTP please resend otp");
        }
    };

    if (!email) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="max-w-md mx-auto mt-10 space-y-4">
        <h1 className="text-3xl font-bold">
            Verify Email
        </h1>

        <p className="text-gray-500">
            OTP sent to:
        </p>

        <p className="font-medium">
            {email}
        </p>

        <form
            onSubmit={handleVerify}
            className="space-y-4"
        >
            <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
                setOtp(e.target.value)
            }
            className="border p-2 w-full"
            />

            <button
            className="bg-black text-white px-4 py-2 rounded w-full"
            >
            Verify Email
            </button>
        </form>

        <button
            onClick={handleResendOtp}
            className="text-blue-500"
        >
            Resend OTP
        </button>
        </div>
    );
}