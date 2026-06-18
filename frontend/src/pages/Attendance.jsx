import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function Attendance() {
  const [labours, setLabours] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLabours = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/labours", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLabours(res.data.labours || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load workers");
    }
  };

  useEffect(() => {
    fetchLabours();
  }, []);

  const markAttendance = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/attendance",
        {
          labourId: id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     toast.success(
  `${status} marked successfully`
);

fetchLabours();
    } catch (error) {
      console.log(error);
      toast.error(
  error.response?.data?.message ||
  "Attendance failed"
);
    }
  };

  const filteredLabours = labours.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* HEADER */}
      <div
        style={{
          background: "linear-gradient(135deg,#2563eb,#4f46e5)",
          color: "white",
          padding: "18px 24px",
          borderRadius: "18px",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>
          📅 Attendance Management
        </h1>

        <p style={{ marginTop: "8px" }}>
          Mark daily attendance of workers.
        </p>
      </div>

      {/* SUMMARY CARD */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h3>Total Workers</h3>
        <h1>{labours.length}</h1>
      </div>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="🔍 Search worker..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "1px solid #d1d5db",
          marginBottom: "20px",
          fontSize: "16px",
          outline: "none",
        }}
      />

      {/* EMPTY STATE */}
      {filteredLabours.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "60px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2>No Workers Found</h2>
          <p>Add workers first.</p>
        </div>
      ) : (
        filteredLabours.map((l) => (
          <div
            key={l._id}
            style={{
              background: "white",
              padding: "18px",
              marginBottom: "15px",
              borderRadius: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >
            {/* LEFT SIDE */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  background: "#2563eb",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {l.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 style={{ margin: 0 }}>{l.name}</h3>

                <p
                  style={{
                    margin: "5px 0 0 0",
                    color: "#6b7280",
                  }}
                >
                  Mark today's attendance
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() =>
                  markAttendance(l._id, "Present")
                }
                style={{
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                ✅ Present
              </button>

              <button
                onClick={() =>
                  markAttendance(l._id, "Absent")
                }
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                ❌ Absent
              </button>
            </div>
          </div>
        ))
      )}
    </Layout>
  );
}

export default Attendance;