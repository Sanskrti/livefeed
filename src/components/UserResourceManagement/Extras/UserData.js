import React, { useState, useEffect } from 'react';
import './UserData.scss';
import axios from 'axios';
import { userListEndpoint, userDetailEndpoint, createUserEndpoint, updateUserEndpoint, deleteUserEndpoint } from '../../../api/apiClient';
import Modal from 'react-modal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUserDetail, setLoadingUserDetail] = useState(false);
  const [userDetailError, setUserDetailError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', password: '' });
  const [createError, setCreateError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(userListEndpoint);
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          setError(`Unexpected status code: ${response.status}`);
        }
      } catch (err) {
        handleError(err, setError);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const fetchUserDetail = async (id) => {
    setLoadingUserDetail(true);
    setSelectedUser(null);
    console.log(`Fetching details for user ID: ${id}`);
    try {
      const response = await axios.get(userDetailEndpoint(id));
      if (response.status === 200) {
        setSelectedUser(response.data);
        setUserDetailError(null);
      } else {
        setUserDetailError(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      handleError(err, setUserDetailError);
    } finally {
      setLoadingUserDetail(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreateError(null);
    setSuccessMessage(null);
    const { name, password } = newUser;

    if (!name || !password) {
      setCreateError('Name and password fields are required.');
      return;
    }

    try {
      const response = await axios.post(createUserEndpoint, newUser);
      if (response.status === 201) {
        setSuccessMessage('User created successfully!');
        setNewUser({ name: '', password: '' });
        setIsModalOpen(false);
        const updatedUsers = await axios.get(userListEndpoint);
        setUsers(updatedUsers.data);
      } else {
        setCreateError(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      handleError(err, setCreateError);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setCreateError(null);
    setSuccessMessage(null);

    const { name, password } = newUser;
    if (!name || !password) {
      setCreateError('Both name and password are required.');
      return;
    }

    try {
      const response = await axios.put(updateUserEndpoint(selectedUser.id), { name, password });
      if (response.status === 200) {
        setSuccessMessage('User updated successfully!');
        setIsModalOpen(false);
        const updatedUsers = await axios.get(userListEndpoint);
        setUsers(updatedUsers.data);
      } else {
        setCreateError(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      handleError(err, setCreateError);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await axios.delete(deleteUserEndpoint(id));
      if (response.status === 200) {
        setUsers(users.filter((user) => user.id !== id));
        setSuccessMessage('User deleted successfully!');
      } else {
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      handleError(err, setError);
    }
  };

  const handleError = (err, setErrorCallback) => {
    if (err.response) {
      setErrorCallback(`Server error: ${err.response.status} - ${err.response.statusText}`);
    } else if (err.request) {
      setErrorCallback('No response received from server. Please check your network connection.');
    } else {
      setErrorCallback(`Error in request: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-management-container">
      <h1 className="user-list-title">User Management</h1>
      <button onClick={() => { setIsModalOpen(true); setIsUpdateMode(false); }}>Create User</button>
      <div className="user-list-section">
        <h2>User List</h2>
        <table className="user-list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <button onClick={() => fetchUserDetail(user.id)}>View</button>
                  <button onClick={() => { setIsModalOpen(true); setIsUpdateMode(true); setNewUser({ name: user.name, password: '' }); setSelectedUser(user); }}>Update</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loadingUserDetail ? (
        <div className="loading">Loading user detail...</div>
      ) : selectedUser ? (
        <div className="user-detail-section">
          <h2>User Detail</h2>
          <p><strong>ID:</strong> {selectedUser.id}</p>
          <p><strong>Name:</strong> {selectedUser.name}</p>
        </div>
      ) : (
        userDetailError && <div className="error">{userDetailError}</div>
      )}
     <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>{isUpdateMode ? 'Update User' : 'Create New User'}</h2>
        {createError && <div className="error">{createError}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <form onSubmit={isUpdateMode ? handleUpdateUser : handleCreateUser}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Enter name"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="Enter password"
            />
          </div>
          <button type="submit">{isUpdateMode ? 'Update User' : 'Create User'}</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default UserList;
