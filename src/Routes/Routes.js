import React from "react";
import { Route, Routes } from "react-router-dom";
import LiveFeedPage from "../components/LiveFeedContainer/LiveFeedDisplay";
import UserManagement from "./UserManagement";

const Dashboard = () => <div>Dashboard</div>;
const Configuration = () => <div className="blank-page">Configuration</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/live-feed" element={<LiveFeedPage />} />
      <Route path="/admin-panel" element={<UserManagement />} />
      <Route path="/configuration" element={<Configuration />} />
    </Routes>
  );
};

export default AppRoutes;
