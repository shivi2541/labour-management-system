import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalLabours: 0,
    totalAttendance: 0,
    totalPayments: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/";
          return;
        }

        const res = await API.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data);
      } catch (error) {
        console.log("Dashboard Error:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <Layout>
     <div
  style={{
    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",
    color: "white",
    padding: "25px",
    borderRadius: "18px",
    marginBottom: "20px",
  }}
>
  <h1>📊 Labour Management Dashboard</h1>

  <p>
    Monitor workers, attendance and
    payments from one place.
  </p>
</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <div className="card">
          <h3>Total Labours</h3>
          <h2>{stats.totalLabours}</h2>
        </div>

        <div className="card">
          <h3>Total Attendance</h3>
          <h2>{stats.totalAttendance}</h2>
        </div>

        <div className="card">
          <h3>Total Payments</h3>
          <h2>₹{stats.totalPayments}</h2>
        </div>
      </div>

      <div style={{ marginTop: "25px" }}>
        <div className="card">
          <h3>System Insights</h3>

          <p>
            Attendance trends, labour productivity,
            salary analytics and AI-based predictions
            will appear here.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;