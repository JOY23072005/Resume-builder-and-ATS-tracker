import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useRef } from "react";

export default function GoogleAuthButton() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const hiddenButtonRef = useRef();

  const handleSuccess = async (
    credentialResponse
  ) => {
    try {
      const res = await api.post(
        "/auth/google",
        {
          credential:
            credentialResponse.credential,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      setUser(res.data.user);

      toast.success(
        "Logged in successfully"
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Google login failed"
      );
    }
  };

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-card px-3 text-sm text-foreground/60">
            OR
          </span>
        </div>
      </div>

      {/* Hidden Google button */}
      <div
        ref={hiddenButtonRef}
        className="hidden"
      >
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() =>
            toast.error(
              "Google authentication failed"
            )
          }
        />
      </div>

      {/* Your custom button */}
      <button
        type="button"
        onClick={() => {
          document
            .querySelector(
              'div[role="button"]'
            )
            ?.click();
        }}
        className="
        w-full
        border
        border-border
        rounded-xl
        py-3
        px-4
        flex
        items-center
        justify-center
        gap-3
        hover:bg-primary/5
        transition
        cursor-pointer
        "
      >
        <img
          src="/google.svg"
          className="h-5 w-5"
        />

        Continue with Google
      </button>
    </>
  );
}