import { useState } from "react";
import { login,sendVerificationOtp } from "../services/auth.service.js";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import EmailVerify from "./EmailVerify.jsx";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const {setUser} = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form);

      localStorage.setItem(
        "token",
        res.data.token
      );

      setUser(res.data.user);

      navigate("/");
    }
    catch (error) {

      if (error.response?.status === 403) {
        let email = form.email;
        try {
          await sendVerificationOtp({
              email,
          });
        } catch (error) {
          toast.error("Failed to send OTP please resend otp");
        }

        navigate(
          "/verify-email",
          {
            state: {
              email: form.email
            }
          }
        );

        return;
      }

    }
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto mt-10 text-foreground"
    >
      <input
        autoComplete="johndoe@gmail.com"
        name="Email"
        placeholder="Email"
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border p-2 w-full mt-3"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button className="mt-4 bg-black text-white px-4 py-2">
        Login
      </button>
    </form>
  );
}