import { useState } from "react";
import { axiosClient } from "../../../api/axiosClient";
import { createUserEndpoint } from "../../../api/axiosClient";
import './user_creation.module.scss';

const UserCreation = ({ onUserCreated, dialogOpen }) => {
  const [userName, setUserName] = useState("");
  const [canLogin, setCanLogin] = useState(false);
  const [allowedActions, setAllowedActions] = useState([]); 
  const [allowedPages, setAllowedPages] = useState([]); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);  
  const [selectedUser, setSelectedUser] = useState(null); 

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newUser = {
      name: userName,
      can_login: canLogin,
      allowed_actions: allowedActions, 
      allowed_pages: allowedPages,
    };

    try {
      const response = await axiosClient.post(createUserEndpoint, newUser);
      onUserCreated(response.data);
      setUsers([...users, response.data]);  
      resetForm();
    } catch (error) {
      setError("Error creating user: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUserName("");
    setCanLogin(false);
    setAllowedActions([]);
    setAllowedPages([]);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null); 
  };

  if (!dialogOpen) return null;

  return (
    <div className="user-creation-container">
      {error && <p className="error">{error}</p>}
      <h3>Create New User</h3>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Enter user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={canLogin}
            onChange={(e) => setCanLogin(e.target.checked)}
          />
          Can Login
        </label>
        <select
          multiple
          onChange={(e) => setAllowedActions([...e.target.selectedOptions].map(option => option.value))}
        >
          <option value="create">create</option>
          <option value="read">read</option>
          <option value="update">update</option>
          <option value="delete">delete</option>
        </select>
        <select
          multiple
          onChange={(e) => setAllowedPages([...e.target.selectedOptions].map(option => option.value))}
        >
          <option value="dashboard">dashboard</option>
          <option value="reports">reports</option>
          <option value="settings">settings</option>
          <option value="adminpanel">adminpanel</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>

      {users.length > 0 && (
        <div className="user-list">
          <h4>User List:</h4>
          <ul>
            {users.map((user, index) => (
              <li key={index} className="user-item">
                <span>{user.name} - </span>
                <span>{user.can_login ? "Can Login" : "Cannot Login"}</span>
                <span> | Allowed Actions: {user.allowed_actions.join(", ")}</span>
                <span> | Allowed Pages: {user.allowed_pages.join(", ")}</span>
                <button onClick={() => handleViewDetails(user)}>View Details</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedUser && (
        <div className="user-details">
          <h4>User Details</h4>
          <form>
            <label>Name:</label>
            <input type="text" value={selectedUser.name} readOnly />
            <label>
              Can Login:
              <input type="checkbox" checked={selectedUser.can_login} readOnly />
            </label>
            <label>Allowed Actions:</label>
            <input type="text" value={selectedUser.allowed_actions.join(", ")} readOnly />
            <label>Allowed Pages:</label>
            <input type="text" value={selectedUser.allowed_pages.join(", ")} readOnly />
            <button type="button" onClick={handleCloseDetails}>Close</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserCreation;
