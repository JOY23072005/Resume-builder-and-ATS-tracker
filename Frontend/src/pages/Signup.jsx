import { useState } from "react";
import { signup,sendVerificationOtp } from "../services/auth.service.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    try{
      e.preventDefault();
      const email = form.email;
      await signup(form);

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
    } catch(error){
      console.error(error.message);
    }
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Build ATS friendly resumes"
    >
      <AuthForm
        fields={[
          {
            name: "name",
            placeholder: "Full Name",
          },
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
        buttonText="Create Account"
        onSubmit={submit}
      />

      <div className="mt-6 text-center text-sm">

        Already have an account?

        <Link
          className="
          text-primary
          ml-2
          hover:underline
          "
          to="/login"
        >
          Login
        </Link>

      </div>

    </AuthCard>
  );
}