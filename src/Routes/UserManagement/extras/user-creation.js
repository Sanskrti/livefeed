import { useState, useRef, useEffect } from "react";
import { axiosClient, createUserEndpoint } from "../../../api/axiosClient";
import './user-creation.scss';
import { FaTimes } from 'react-icons/fa';

const UserCreation = ({ onUserCreated, dialogOpen, onClose }) => {
  const [userName, setUserName] = useState("");
  const [canLogin, setCanLogin] = useState(false);
  const [allowedActions, setAllowedActions] = useState([]); 
  const [allowedPages, setAllowedPages] = useState([]); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);  
  const formRef = useRef(null); // Create a ref for the form

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
      setUserName("");
      setCanLogin(false);
      setAllowedActions([]);
      setAllowedPages([]);
    } catch (error) {
      setError("Error creating user: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Close dialog on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose(); // Call the close function passed as prop
      }
    };

    if (dialogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dialogOpen, onClose]);

  const handleDeleteUser = async (userId) => {
    // Implement your delete user logic here
    try {
      await axiosClient.delete(`${createUserEndpoint}/${userId}`);
      setUsers(users.filter(user => user.id !== userId)); // Update the user list
    } catch (error) {
      setError("Error deleting user: " + error.message);
    }
  };

  const handleViewDetails = (user) => {
    // Show user details (e.g., in an alert or modal)
    alert(`User Details:\nName: ${user.name}\nCan Login: ${user.can_login}\nAllowed Actions: ${user.allowed_actions.join(", ")}\nAllowed Pages: ${user.allowed_pages.join(", ")}`);
  };

  const handleUpdateUser = (userId) => {
    // Implement your update user logic here (e.g., open a modal with a form)
    console.log(`Update user with ID: ${userId}`);
    // This is where you could set up an update form or something similar
  };

  if (!dialogOpen) return null;

  return (
    <div className="user-creation-container">
      <button className="close-icon" onClick={onClose}><FaTimes /></button> {/* Close icon */}
      {error && <p className="error">{error}</p>}
      <h3>Create New User</h3>
      <form onSubmit={handleCreateUser} ref={formRef}> {/* Attach ref to the form */}
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
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Can Login</th>
                <th>Allowed Actions</th>
                <th>Allowed Pages</th>
                <th>Actions</th> {/* New Actions column */}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.can_login ? "Yes" : "No"}</td>
                  <td>{user.allowed_actions.join(", ")}</td>
                  <td>{user.allowed_pages.join(", ")}</td>
                  <td>
                    <button onClick={() => handleViewDetails(user)}>View Details</button>
                    <button onClick={() => handleUpdateUser(user.id)}>Update</button>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserCreation;
