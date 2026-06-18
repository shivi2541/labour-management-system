import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Labours", path: "/labours" },
    { name: "Attendance", path: "/attendance" },
    { name: "Payments", path: "/payments" },
    { name: "Add Labour", path: "/add-labour" },
    { name: "Add Payment", path: "/add-payment" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        padding: "20px",
        background: darkMode ? "#0b1220" : "#ffffff",
        borderRight: "1px solid rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* BRAND */}
      <div>
        <div
          style={{
            padding: "16px",
            borderRadius: "16px",
            background: darkMode
              ? "linear-gradient(135deg,#1e3a8a,#1e40af)"
              : "linear-gradient(135deg,#60a5fa,#dbeafe)",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: darkMode ? "#fff" : "#111827",
            }}
          >
            Labour Management
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: darkMode ? "#e5e7eb" : "#374151",
            }}
          >
            Contractor Dashboard
          </p>
        </div>

        {/* MENU */}
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                padding: "12px 14px",
                marginBottom: "10px",
                borderRadius: "12px",
                cursor: "pointer",
                background: active
                  ? "linear-gradient(135deg,#2563eb,#3b82f6)"
                  : "transparent",
                color: active
                  ? "white"
                  : darkMode
                  ? "#e5e7eb"
                  : "#111827",
                fontWeight: active ? "600" : "500",
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div>
        <button
          onClick={toggleTheme}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background: "#2563eb",
            color: "white",
            marginBottom: "10px",
            fontWeight: "600",
          }}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background: "#dc2626",
            color: "white",
            fontWeight: "600",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;