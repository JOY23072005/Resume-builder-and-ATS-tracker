import { useState } from "react";
import { login } from "../services/auth.service.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const {setUser} = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    const res = await login(form);

    localStorage.setItem(
      "token",
      res.data.token
    );

    setUser(res.data.user);

    navigate("/");
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto mt-10"
    >
      <input
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