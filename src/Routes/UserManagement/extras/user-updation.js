import { useState, useEffect } from "react";
import { axiosClient, updateUserEndpoint } from "../../../api/axiosClient";
// import './user-updation.scss';

const UserUpdation = ({ selectedUser, onUserUpdated, dialogOpen }) => {
  const [userName, setUserName] = useState(selectedUser.name || "");
  const [canLogin, setCanLogin] = useState(selectedUser.can_login || false);
  const [allowedPages, setAllowedPages] = useState(selectedUser.allowed_pages || []);
  const [allowedActions, setAllowedActions] = useState(selectedUser.allowed_actions || []);
  const [error, setError] = useState("");

  const availablePages = ["create", "read", "update","delete"];
  const availableActions = ["dashboard", "reports", "settings","adminpanel"];

  const handleUserUpdate = async () => {
    const data = {
      name: userName,
      can_login: canLogin,
      allowed_pages: allowedPages,
      allowed_actions: allowedActions,
    };

    try {
      const response = await axiosClient.put(
        updateUserEndpoint(selectedUser.id),
        data
      );
      onUserUpdated(response.data);
    } catch (error) {
      setError("Error updating user: " + error.message);
    }
  };

  if (!dialogOpen) return null;

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <h3>Update User</h3>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={canLogin}
          onChange={(e) => setCanLogin(e.target.checked)}
        />
        Can Login
      </label>


      <label>Allowed Pages:</label>
      <select
        multiple
        value={allowedPages}
        onChange={(e) => setAllowedPages([...e.target.selectedOptions].map(option => option.value))}
      >
        {availablePages.map((page, index) => (
          <option key={index} value={page}>
            {page}
          </option>
        ))}
      </select>


      <label>Allowed Actions:</label>
      <select
        multiple
        value={allowedActions}
        onChange={(e) => setAllowedActions([...e.target.selectedOptions].map(option => option.value))}
      >
        {availableActions.map((action, index) => (
          <option key={index} value={action}>
            {action}
          </option>
        ))}
      </select>

      <button onClick={handleUserUpdate}>Update User</button>
    </div>
  );
};

export default UserUpdation;
