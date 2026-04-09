import { useState } from "react";
import API from "../services/api";

export default function CreateChit() {
  const [form, setForm] = useState({
    name: "",
    totalAmount: "",
    durationMonths: "",
    startDate: ""
  });

  const createChit = async () => {
    try {
      await API.post("/chits", {
        name: form.name,
        totalAmount: Number(form.totalAmount),
        durationMonths: Number(form.durationMonths),
        startDate: form.startDate
      });

      alert("Chit Created ✅");
    } catch (err) {
      console.error(err);
      alert("Error creating chit ❌");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Create Chit</h2>

      <input
        placeholder="Name"
        className="border p-2 mb-2 block"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Total Amount"
        className="border p-2 mb-2 block"
        onChange={(e) =>
          setForm({ ...form, totalAmount: e.target.value })
        }
      />

      <input
        placeholder="Duration (months)"
        className="border p-2 mb-2 block"
        onChange={(e) =>
          setForm({ ...form, durationMonths: e.target.value })
        }
      />

      <input
        type="date"
        className="border p-2 mb-2 block"
        onChange={(e) =>
          setForm({ ...form, startDate: e.target.value })
        }
      />

      <button
        onClick={createChit}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Create
      </button>
    </div>
  );
}