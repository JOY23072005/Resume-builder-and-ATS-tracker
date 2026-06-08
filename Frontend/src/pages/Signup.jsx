import { useState } from "react";
import { signup } from "../services/auth.service.js";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    await signup(form);

    alert(
      "Account created. Verify email."
    );
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto mt-10"
    >
      <input
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