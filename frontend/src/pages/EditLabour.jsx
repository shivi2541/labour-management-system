import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function EditLabour() {
const { id } = useParams();
const navigate = useNavigate();

const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [dailyRate, setDailyRate] = useState("");
const [address, setAddress] = useState("");

useEffect(() => {
const fetchLabour = async () => {
try {
const token = localStorage.getItem("token");


    const res = await API.get(`/labours/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const labour = res.data.labour;

    setName(labour.name);
    setPhone(labour.phone);
    setDailyRate(labour.dailyRate);
    setAddress(labour.address);
  } catch (error) {
    console.log(error);
  }
};

fetchLabour();


}, [id]);

const handleUpdate = async () => {
try {
const token = localStorage.getItem("token");


  await API.put(
    `/labours/${id}`,
    {
      name,
      phone,
      dailyRate,
      address,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Labour Updated Successfully");
  navigate("/labours");
} catch (error) {
  console.log(error);
  alert("Update Failed");
}


};

return ( <div className="p-6"> <h1 className="text-3xl font-bold mb-6">
Edit Labour 
<Navbar/>
</h1>


  <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="border p-2 w-full mb-3"
  />

  <input
    type="text"
    placeholder="Phone"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="border p-2 w-full mb-3"
  />

  <input
    type="number"
    placeholder="Daily Rate"
    value={dailyRate}
    onChange={(e) => setDailyRate(e.target.value)}
    className="border p-2 w-full mb-3"
  />

  <input
    type="text"
    placeholder="Address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="border p-2 w-full mb-3"
  />

  <button
    onClick={handleUpdate}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Update Labour
  </button>
</div>


);
}

export default EditLabour;
