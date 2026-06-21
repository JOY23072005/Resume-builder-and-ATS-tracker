import { useState } from "react";
import { login,sendVerificationOtp } from "../services/auth.service.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import EmailVerify from "./EmailVerify.jsx";
import toast from "react-hot-toast";
import AuthCard from "../components/cards/AuthCard.jsx";
import Form from "../components/Form.jsx";
import GoogleAuthButton from "../components/GoogleAuthButton";

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
        const email = form.email;
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
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to continue"
    >
      <Form
        fields={[
          {
            name: "email",
            placeholder: "Email",
          },
          {
            name: "password",
            type: "password",
            placeholder: "Password",
          },
        ]}
        values={form}
        setValues={setForm}
        buttonText="Sign In"
        onSubmit={submit}
      />
      
      <GoogleAuthButton />

      <div className="mt-6 flex justify-between text-sm">

        <Link
          to="/forgot-password"
          className="
          text-primary
          hover:underline
          "
        >
          Forgot Password?
        </Link>

        <Link
          to="/signup"
          className="
          text-primary
          hover:underline
          "
        >
          Create Account
        </Link>

      </div>

    </AuthCard>   
  );
}