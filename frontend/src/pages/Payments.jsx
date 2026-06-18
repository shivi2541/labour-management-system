import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPayments(res.data.payments || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load payments");
      setPayments([]);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const totalAmount = payments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );

  const filteredPayments = payments.filter((p) =>
    (p.labourId?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
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
        <h1 style={{ margin: 0 }}>💰 Payment Management</h1>

        <p style={{ marginTop: "8px" }}>
          Manage worker salaries and payment records.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total Payments</h3>
          <h1>{payments.length}</h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total Amount Paid</h3>
          <h1>₹{totalAmount}</h1>
        </div>
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
      {filteredPayments.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "60px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2>No Payment Records</h2>
          <p>Add payments to see them here.</p>
        </div>
      ) : (
        filteredPayments.map((p) => (
          <div
            key={p._id}
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
                {p.labourId?.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <h3 style={{ margin: 0 }}>
                  {p.labourId?.name}
                </h3>

                <p
                  style={{
                    margin: "5px 0 0 0",
                    color: "#6b7280",
                  }}
                >
                  {p.paymentMethod}
                </p>

                <small
                  style={{
                    color: "#9ca3af",
                  }}
                >
                  {new Date(
                    p.paymentDate
                  ).toLocaleDateString()}
                </small>
              </div>
            </div>

            {/* AMOUNT */}
            <div
              style={{
                background: "#dcfce7",
                color: "#15803d",
                padding: "10px 16px",
                borderRadius: "10px",
                fontWeight: "700",
              }}
            >
              ₹{p.amount}
            </div>
          </div>
        ))
      )}
    </Layout>
  );
}

export default Payments;