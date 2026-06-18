import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "contractor";

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      toast.success("Signup Successful ");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Signup</h1>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;