import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function Labours() {
  const navigate = useNavigate();

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
    } catch (err) {
      console.log(err);
      toast.error("Failed to load labour data");
    }
  };

  useEffect(() => {
    fetchLabours();
  }, []);

  const deleteLabour = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/labours/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Deleted Successfully");
      fetchLabours();
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed");
    }
  };

  const filteredLabours = labours.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* PAGE HEADER */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#4f46e5)",
          color: "white",
          padding: "10px 30px",
          borderRadius: "20px",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ margin: 0 }}>👷 Labour Management</h1>
        <p style={{ marginTop: "10px" }}>
          Manage all workers from one place.
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
        placeholder="🔍 Search labour by name..."
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
          <h2>No Labour Records Found</h2>
          <p>Add workers to start managing labour data.</p>
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
                  📞 {l.phone}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              <button
                onClick={() =>
                  navigate(`/edit-labour/${l._id}`)
                }
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                ✏️ Edit
              </button>

              <button
                onClick={() => deleteLabour(l._id)}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))
      )}
    </Layout>
  );
}

export default Labours;