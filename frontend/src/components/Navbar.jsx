import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const btnStyle = {
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "rgba(255,255,255,0.8)",
    fontWeight: "500",
    transition: "0.2s",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        marginBottom: "20px",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(8px)",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* LEFT MENU */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button style={btnStyle} onClick={() => navigate("/dashboard")}>
          📊 Dashboard
        </button>

        <button style={btnStyle} onClick={() => navigate("/labours")}>
          👷 Labours
        </button>

        <button style={btnStyle} onClick={() => navigate("/add-labour")}>
          ➕ Add Labour
        </button>

        <button style={btnStyle} onClick={() => navigate("/attendance")}>
          📅 Attendance
        </button>

        <button style={btnStyle} onClick={() => navigate("/payments")}>
          💰 Payments
        </button>
      </div>

      {/* RIGHT SIDE */}
      <button
        onClick={logout}
        style={{
          ...btnStyle,
          backgroundColor: "#722940",
          color: "white",
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Navbar;