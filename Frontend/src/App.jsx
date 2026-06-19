import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/layout/ProtectedRoute"
import EmailVerify from "./pages/EmailVerify";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Everything inside this Route will automatically inherit the RootLayout structure */}
        <Route element={<RootLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;