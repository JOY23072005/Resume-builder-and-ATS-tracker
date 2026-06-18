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
      let email = form.email;
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
    <form
      onSubmit={submit}
      className="max-w-md mx-auto mt-10 text-foreground"
    >
      <input
        autoComplete="John Doe"
        name="Name"
        placeholder="Name"
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <input
        autoComplete="johndoe@gmail.com"
        name="Email"
        placeholder="Email"
        className="border p-2 w-full mt-3"
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
        Signup
      </button>
    </form>
  );
}