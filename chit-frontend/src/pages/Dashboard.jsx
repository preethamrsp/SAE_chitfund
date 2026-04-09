import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    API.get("/wallet").then((res) => setWallet(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {wallet && (
        <div className="mt-4 bg-green-100 p-4 rounded">
          <h2 className="text-lg">Wallet Balance</h2>
          <p className="text-2xl font-bold">₹{wallet.balance}</p>
        </div>
      )}
    </div>
  );
}