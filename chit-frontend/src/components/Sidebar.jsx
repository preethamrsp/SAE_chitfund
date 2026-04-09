import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const menu = [
    { name: "Profile", path: "/profile" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Wallet", path: "/wallet" },
    { name: "Chits", path: "/chits" },
    { name: "Withdraw", path: "/withdraw" },
    { name: "Create Chit", path: "/create-chit" }
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed flex flex-col justify-between">
      
      {/* Top */}
      <div>
        <h1 className="text-2xl font-bold p-4 border-b border-gray-700">
          💰 ChitFund
        </h1>

        <ul className="p-2">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block p-3 rounded mb-2 ${
                  location.pathname === item.path
                    ? "bg-blue-500"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 p-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};