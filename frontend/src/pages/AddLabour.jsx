import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function AddLabour() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/labours",
        {
          name,
          phone,
          skills: skills.split(","),
          dailyRate,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Labour Added Successfully");

      setName("");
      setPhone("");
      setSkills("");
      setDailyRate("");
      setAddress("");
    } catch (error) {
      console.log(error);
      alert("Failed to Add Labour");
    }
  };

  return (
    <div className="p-6">
      <Navbar/>
      <h1 className="text-3xl font-bold mb-4">
        Add Labour
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          className="border p-2 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Skills (comma separated)"
          className="border p-2 w-full"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <input
          type="number"
          placeholder="Daily Rate"
          className="border p-2 w-full"
          value={dailyRate}
          onChange={(e) => setDailyRate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Labour
        </button>
      </form>
    </div>
  );
}

export default AddLabour;