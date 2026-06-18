import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";
function Profile() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};
    const { darkMode } = useTheme();

  return (
    <Layout>
      <div
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#4f46e5)",
          color: "white",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <h1>My Profile</h1>
        <p>Manage your account information.</p>
      </div>

      <div
  style={{
    background: darkMode ? "#111827" : "white",
    color: darkMode ? "white" : "#111827",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  }}
>
        <h2>{user.name}</h2>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <p>
          <strong>User ID:</strong> {user.id}
        </p>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          style={{
            marginTop: "20px",
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
}

export default Profile;