import React from "react";
import { Route, Routes } from "react-router-dom";
import LiveFeedPage from "../components/LiveFeedContainer/LiveFeedDisplay";


const Dashboard = () => <div>Dashboard</div>;
const AdminPanel = () => <div className="blank-page">Admin Panel</div>;
const Configuration = () => <div className="blank-page">Configuration</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/live-feed" element={<LiveFeedPage />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="/configuration" element={<Configuration />} />
    </Routes>
  );
};

export default AppRoutes;
