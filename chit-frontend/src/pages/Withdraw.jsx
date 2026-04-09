import { useState } from "react";
import API from "../services/api";

export default function Withdraw() {
  const [amount, setAmount] = useState("");

  const withdraw = async () => {
    await API.post("/withdrawals/request", { amount: Number(amount) });
    alert("Requested!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Withdraw</h2>

      <input
        className="border p-2 mr-2"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={withdraw}
        className="bg-red-500 text-white p-2 rounded"
      >
        Withdraw
      </button>
    </div>
  );
}