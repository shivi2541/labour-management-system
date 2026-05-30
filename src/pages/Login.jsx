import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";

import { auth, db } from "../firebase/firebase";

import ContractorDashboard from "./ContractorDashboard";
import LabourDashboard from "./LabourDashboard";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  // Login Function
  const handleLogin = async () => {
    try {
      // Firebase Login
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      // Current User
      const user = userCredential.user;

      // Get User Data from Database
      const snapshot = await get(
        ref(db, "users/" + user.uid)
      );

      // Check Role
      if (snapshot.exists()) {
        const data = snapshot.val();

        setUserRole(data.role);
      }

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Contractor Dashboard
  if (userRole === "contractor") {
    return <ContractorDashboard />;
  }

  // Labour Dashboard
  if (userRole === "labour") {
    return <LabourDashboard />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px]">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;