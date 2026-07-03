import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadingProvider } from "./context/LoadingContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
  >
    <AuthProvider>
      <LoadingProvider>
        <Toaster position="top-right" />
        <App />
      </LoadingProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);