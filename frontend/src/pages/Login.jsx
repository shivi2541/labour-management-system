import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

<Link to="/register">Create new account</Link>

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

localStorage.setItem(
  "user",
  JSON.stringify({
    id: res.data._id,
    name: res.data.name,
    email: res.data.email,
    role: res.data.role,
  })
);

      // ✅ SUCCESS TOAST HERE
      toast.success("Login Successful ");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      // ❌ ERROR TOAST HERE
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#9fdbe4",
        fontFamily: "Segoe UI, Arial",
      }}
    >
      <div
        style={{
          width: "360px",
          background: "rgba(255,255,255,0.95)",
          padding: "30px",
          borderRadius: "14px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
           Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "18px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#36577a",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;