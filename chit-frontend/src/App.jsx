import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Wallet } from "lucide-react";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Withdraw from "./pages/Withdraw";
import CreateChit from "./pages/CreateChit";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
                   <ProtectedRoute>
            <Layout>
              <Dashboard />
          
            </Layout>
                </ProtectedRoute>
          }
        />
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Layout>
        <Profile />
      </Layout>
    </ProtectedRoute>
  }
/>
        <Route
          path="/withdraw"
          element={
            <Layout>
              <Withdraw />
            </Layout>
          }
        />

        <Route
          path="/create-chit"
          element={
            <Layout>
              <CreateChit />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;