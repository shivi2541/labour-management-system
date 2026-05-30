import { useState, useEffect } from "react";

import {
  ref,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

import { signOut } from "firebase/auth";

import { db, auth } from "../firebase/firebase";

function ContractorDashboard() {
  const [labourName, setLabourName] = useState("");
  const [work, setWork] = useState("");
  const [wage, setWage] = useState("");

  const [labours, setLabours] = useState([]);

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);

      alert("Logged Out!");

      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };

  // Add Labour
  const handleAddLabour = async () => {
    if (
      labourName === "" ||
      work === "" ||
      wage === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await push(ref(db, "labours"), {
        labourName,
        work,
        wage,
        attendance: 0,
      });

      alert("Labour Added Successfully!");

      setLabourName("");
      setWork("");
      setWage("");

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Fetch Labour Data
  useEffect(() => {
    const labourRef = ref(db, "labours");

    onValue(labourRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const labourArray = Object.keys(data).map(
          (key) => ({
            id: key,
            ...data[key],
          })
        );

        setLabours(labourArray);
      } else {
        setLabours([]);
      }
    });
  }, []);

  // Delete Labour
  const handleDelete = async (id) => {
    try {
      await remove(ref(db, "labours/" + id));

      alert("Labour Deleted!");

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Attendance
  const markAttendance = async (labour) => {
    try {
      const newAttendance =
        (labour.attendance || 0) + 1;

      await update(
        ref(db, "labours/" + labour.id),
        {
          attendance: newAttendance,
        }
      );

      alert("Attendance Marked!");

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Edit Labour
  const handleEdit = (labour) => {
    setLabourName(labour.labourName);
    setWork(labour.work);
    setWage(labour.wage);

    setEditId(labour.id);
  };

  // Update Labour
  const handleUpdate = async () => {
    try {
      await update(
        ref(db, "labours/" + editId),
        {
          labourName,
          work,
          wage,
        }
      );

      alert("Labour Updated!");

      setLabourName("");
      setWork("");
      setWage("");

      setEditId(null);

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Search Labour
  const filteredLabours = labours.filter(
    (labour) =>
      labour.labourName
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-100 p-10">

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-black text-white px-5 py-2 rounded mb-5"
      >
        Logout
      </button>

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-10">
        Contractor Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">
            Total Workers
          </h2>

          <p className="text-3xl mt-3">
            {labours.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">
            Total Attendance
          </h2>

          <p className="text-3xl mt-3">
            {labours.reduce(
              (total, labour) =>
                total + (labour.attendance || 0),
              0
            )}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">
            Total Salary
          </h2>

          <p className="text-3xl mt-3">
            ₹
            {labours.reduce(
              (total, labour) =>
                total +
                (labour.attendance || 0) *
                  Number(labour.wage || 0),
              0
            )}
          </p>
        </div>

      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl w-full md:w-[400px] shadow-lg">

        <input
          type="text"
          placeholder="Labour Name"
          value={labourName}
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setLabourName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Work Type"
          value={work}
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setWork(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Daily Wage"
          value={wage}
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setWage(e.target.value)
          }
        />

        {editId ? (
          <button
            onClick={handleUpdate}
            className="w-full bg-yellow-500 text-white p-3 rounded"
          >
            Update Labour
          </button>
        ) : (
          <button
            onClick={handleAddLabour}
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            Add Labour
          </button>
        )}

      </div>

      {/* Search */}
      <div className="mt-8">

        <input
          type="text"
          placeholder="Search Labour..."
          value={search}
          className="w-full md:w-[400px] border p-3 rounded"
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Labour List */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Labour List
        </h2>

        <div className="grid gap-4">

          {filteredLabours.map((labour) => (
            <div
              key={labour.id}
              className="bg-white p-5 rounded-xl shadow"
            >
              <h3 className="text-2xl font-semibold">
                {labour.labourName}
              </h3>

              <p className="mt-2">
                Work: {labour.work}
              </p>

              <p className="mt-2">
                Daily Wage: ₹{labour.wage}
              </p>

              <p className="mt-2">
                Attendance:{" "}
                {labour.attendance || 0}
              </p>

              <p className="mt-2 font-bold text-green-700">
                Total Salary: ₹
                {(labour.attendance || 0) *
                  Number(labour.wage || 0)}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-4">

                <button
                  onClick={() =>
                    markAttendance(labour)
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Present
                </button>

                <button
                  onClick={() =>
                    handleEdit(labour)
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(labour.id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ContractorDashboard;