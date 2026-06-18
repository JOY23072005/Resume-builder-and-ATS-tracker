import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import {AuthProvider} from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;