

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import AddPayment from "./pages/AddPayment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Labours from "./pages/Labours";
import AddLabour from "./pages/AddLabour";
import EditLabour from "./pages/EditLabour";
import Attendance from "./pages/Attendance";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      {/* GLOBAL TOAST SYSTEM */}
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route path="/labours" element={<Labours />} />
        <Route path="/add-labour" element={<AddLabour />} />
        <Route path="/edit-labour/:id" element={<EditLabour />} />
        <Route path="/attendance" element={<ProtectedRoute>
      <AddPayment />
    </ProtectedRoute>
  }
/>
        <Route path="/add-payment" element={<AddPayment />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;