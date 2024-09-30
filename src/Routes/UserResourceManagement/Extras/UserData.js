import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  fetchUsers,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
} from "./UserAction";
import {
  fetchAllowedActions,
  fetchAllowedPages,
} from "../../../api/axiosClient";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import UserDetails from "./UserDetails";
import "./UserDetails.scss";

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    can_login: false,
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [allowedActions, setAllowedActions] = useState([]);
  const [allowedPages, setAllowedPages] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers(setUsers, setError);
      setLoading(false);
    };
    loadUsers();
  }, []);

  const fetchUserAllowedData = async (userId) => {
    try {
      const actions = await fetchAllowedActions(userId);
      const pages = await fetchAllowedPages(userId);
      setAllowedActions(actions);
      setAllowedPages(pages);
    } catch (error) {
      setError("Error fetching allowed actions/pages: " + error.message);
    }
  };

  const handleViewDetailsClick = async (user) => {
    setViewUser(user);
    await fetchUserAllowedData(user.id);
  };

  const handleUpdateUserClick = (user) => {
    setNewUser({ ...user, password: "" });
    setViewUser(user);
    setUpdateModalOpen(true);
  };

  const validatePassword = (password) => {
    if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword(newUser.password)) {
      await handleCreateUser(newUser, setError, setLoading, setUsers);
      setCreateModalOpen(false);
      setNewUser({ name: "", can_login: false, password: "" });
    }
  };

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword(newUser.password)) {
      if (viewUser) {
        await handleUpdateUser(
          viewUser.id,
          newUser,
          setError,
          setLoading,
          setUsers,
        );
        setUpdateModalOpen(false);
        setViewUser(null);
      } else {
        setError("No user selected for update.");
      }
    }
  };

  const handleDeleteUserClick = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await handleDeleteUser(userId, setUsers, setError);
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-management-container">
      <h1>User Management</h1>

      <div className="user-list-section">
        <div className="header-actions">
          <h2>User List</h2>
          <button
            className="create-button"
            onClick={() => setCreateModalOpen(true)}
          >
            Create User
          </button>
        </div>
        <table className="user-list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Can Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.can_login ? "Yes" : "No"}</td>
                <td className="action-buttons">
                  <button
                    className="view-button"
                    onClick={() => handleViewDetailsClick(user)}
                  >
                    <FaEye /> View
                  </button>
                  <button
                    className="update-button"
                    onClick={() => handleUpdateUserClick(user)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteUserClick(user.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserDetails
        user={viewUser}
        allowedActions={allowedActions}
        allowedPages={allowedPages}
        isOpen={!!viewUser}
        onRequestClose={() => setViewUser(null)}
      />

      <Modal
        className="modal-content"
        overlayClassName="modal-overlay"
        isOpen={isCreateModalOpen}
        onRequestClose={() => setCreateModalOpen(false)}
      >
        <div className="modal-header">
          <h3>Create User</h3>
          <span
            className="close-icon"
            onClick={() => setCreateModalOpen(false)}
          >
            &times;
          </span>
        </div>
        <div className="modal-body">
          <form onSubmit={handleCreateUserSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={newUser.can_login}
                  onChange={(e) =>
                    setNewUser({ ...newUser, can_login: e.target.checked })
                  }
                />
                Can Login
              </label>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
              />
              {passwordError && <span className="error">{passwordError}</span>}
            </div>
            <div className="button-group">
              <button type="submit" className="submit-button">
                Create User
              </button>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        className="modal-content"
        overlayClassName="modal-overlay"
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setUpdateModalOpen(false)}
      >
        <div className="modal-header">
          <h3>Update User</h3>
          <span
            className="close-icon"
            onClick={() => setUpdateModalOpen(false)}
          >
            &times;
          </span>
        </div>
        <div className="modal-body">
          <form onSubmit={handleUpdateUserSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={newUser.can_login}
                  onChange={(e) =>
                    setNewUser({ ...newUser, can_login: e.target.checked })
                  }
                />
                Can Login
              </label>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                placeholder="Leave blank to keep current password"
              />
              {passwordError && <span className="error">{passwordError}</span>}
            </div>
            <div className="button-group">
              <button type="submit" className="submit-button">
                Update User
              </button>
              <button
                type="button"
                onClick={() => setUpdateModalOpen(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UserData;
