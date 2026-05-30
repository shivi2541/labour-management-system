import { ref, set } from "firebase/database";
import { db } from "../firebase/firebase";



import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("labour");

  // Signup Function
  const handleSignup = async () => {
    console.log("Button Clicked");

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log(userCredential);
      
      const user = userCredential.user;

      await set(ref(db, "users/" + user.uid), {
      name,
      email,
      role,
    });

      


      alert("Signup Successful!");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px]">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          Signup
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setName(e.target.value)}
        />

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

      <select
        className="w-full border p-3 rounded mb-4"
        onChange={(e) => setRole(e.target.value)}
        >
        <option value="labour">Labour</option>
        <option value="contractor">Contractor</option>
         </select>

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Signup
        </button>

      </div>
    </div>
  );
}

export default Signup;