import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./layout/ProtectedRoute"
import EmailVerify from "./pages/EmailVerify";
import ForgotPassword from "./pages/ForgotPassword";
import PublicRoute from "./layout/PublicRoute";


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
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route 
            path="/verify-email" 
            element={
              <PublicRoute>
                <EmailVerify />
              </PublicRoute>
            } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;