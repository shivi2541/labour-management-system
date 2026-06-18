import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("labour");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="labour">Labour</option>
          <option value="contractor">Contractor</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;