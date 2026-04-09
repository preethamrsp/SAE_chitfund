import { useEffect, useState } from "react";
import API from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // Fetch user info
    API.get("/auth/me").then((res) => setUser(res.data));

    // Fetch wallet
    API.get("/wallet").then((res) => setWallet(res.data));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">👤 Profile</h1>

      <div className="bg-white p-6 rounded shadow">
        <p className="mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="mb-2"><strong>Phone:</strong> {user.phone}</p>

        {wallet && (
          <p className="mb-2 text-green-600 font-bold">
            Wallet: ₹{wallet.balance}
          </p>
        )}

        <button
          onClick={logout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}