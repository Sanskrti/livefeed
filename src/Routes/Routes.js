import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from "./UserManagement/MainPage/Login";

const AppRoutes = ({ Dashboard, LiveFeedPage, UserManagement }) => {
  const { isAuthenticated, allowedPages } = useSelector(state => state.auth);

  const isPageAllowed = (page) => allowedPages.includes(page);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {isAuthenticated && isPageAllowed('dashboard') ? (
        <Route path="/dashboard" element={<Dashboard />} />
      ) : (
        <Route path="/dashboard" element={<Navigate to="/login" />} />
      )}

      {isAuthenticated && isPageAllowed('live-feed') ? (
        <Route path="/live-feed" element={<LiveFeedPage />} />
      ) : (
        <Route path="/live-feed" element={<Navigate to="/login" />} />
      )}

      {isAuthenticated && isPageAllowed('admin-panel') ? (
        <Route path="/admin-panel" element={<UserManagement />} />
      ) : (
        <Route path="/admin-panel" element={<Navigate to="/login" />} />
      )}

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
