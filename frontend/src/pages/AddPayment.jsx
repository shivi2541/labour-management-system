import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddPayment() {
  const navigate = useNavigate();

  const [labours, setLabours] = useState([]);

  const [formData, setFormData] = useState({
    labourId: "",
    amount: "",
    paymentMethod: "Cash",
    notes: "",
  });

  useEffect(() => {
    fetchLabours();
  }, []);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/payments",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Payment Added Successfully");

      navigate("/payments");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add payment");
    }
  };

  return (
    <Layout>
      <div
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#4f46e5)",
          color: "white",
          padding: "20px",
          borderRadius: "18px",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>💰 Add Payment</h1>

        <p style={{ marginTop: "8px" }}>
          Record salary payments for workers.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label>Select Worker</label>

          <select
            name="labourId"
            value={formData.labourId}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              borderRadius: "10px",
            }}
          >
            <option value="">
              Select Worker
            </option>

            {labours.map((labour) => (
              <option
                key={labour._id}
                value={labour._id}
              >
                {labour.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Amount</label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="Enter Amount"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              borderRadius: "10px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Payment Method</label>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              borderRadius: "10px",
            }}
          >
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Bank">Bank</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Notes</label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Optional notes"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              borderRadius: "10px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Save Payment
        </button>
      </form>
    </Layout>
  );
}

export default AddPayment;