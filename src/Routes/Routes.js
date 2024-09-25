import React from "react";
import { Route, Routes } from "react-router-dom";
import LiveFeedPage from "../components/LiveFeedContainer/LiveFeedDisplay";
import UserData from "./UserResourceManagement/Extras/UserDetails";

const Dashboard = () => <div>Dashboard</div>;
const Configuration = () => <div className="blank-page">Configuration</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/live-feed" element={<LiveFeedPage />} />
      <Route path="/admin-panel" element={<UserData />} />
      <Route path="/configuration" element={<Configuration />} />
    </Routes>
  );
};

export default AppRoutes;
