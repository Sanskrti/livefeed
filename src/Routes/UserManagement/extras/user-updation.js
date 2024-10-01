import { useState, useEffect } from "react";
import { axiosClient, updateUserEndpoint } from "../../../api/axiosClient";

const UserUpdation = ({ selectedUser, onUserUpdated, dialogOpen }) => {
  const [userName, setUserName] = useState("");
  const [canLogin, setCanLogin] = useState(false);
  const [allowedPages, setAllowedPages] = useState([]);
  const [allowedActions, setAllowedActions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const availablePages = ["dashboard", "reports", "settings", "adminpanel"];
  const availableActions = ["create", "read", "update", "delete"];

  useEffect(() => {
    if (selectedUser) {
      setUserName(selectedUser.name || "");
      setCanLogin(selectedUser.can_login || false);
      setAllowedPages(selectedUser.allowed_pages || []);
      setAllowedActions(selectedUser.allowed_actions || []);
      setError("");
    }
  }, [selectedUser]);

  const handleUserUpdate = async () => {
    if (!userName) {
      setError("Username is required");
      return;
    }

    const data = { name: userName, can_login: canLogin, allowed_pages: allowedPages, allowed_actions: allowedActions };

    setLoading(true);
    try {
      const response = await axiosClient.put(updateUserEndpoint(selectedUser.id), data);
      onUserUpdated(response.data);
    } catch (error) {
      console.error("Update user error:", error);
      setError("Error updating user: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (!dialogOpen) return null;

  return (
    <div className="user-updation-dialog">
      {error && <p className="error">{error}</p>}
      <h3>Update User</h3>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter username"
        required
      />
      <label>
        <input type="checkbox" checked={canLogin} onChange={(e) => setCanLogin(e.target.checked)} />
        Can Login
      </label>
      <label>Allowed Pages:</label>
      <select multiple value={allowedPages} onChange={(e) => setAllowedPages([...e.target.selectedOptions].map(option => option.value))}>
        {availablePages.map((page, index) => (
          <option key={index} value={page}>{page}</option>
        ))}
      </select>
      <label>Allowed Actions:</label>
      <select multiple value={allowedActions} onChange={(e) => setAllowedActions([...e.target.selectedOptions].map(option => option.value))}>
        {availableActions.map((action, index) => (
          <option key={index} value={action}>{action}</option>
        ))}
      </select>
      <button onClick={handleUserUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update User"}
      </button>
    </div>
  );
};

export default UserUpdation;
