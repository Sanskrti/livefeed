import React, { useState, useEffect } from 'react';
import './UserData.scss';
import Modal from 'react-modal';
import { apiClient, userListEndpoint, createUserEndpoint } from '../../../api/apiClient';
import { fetchUserDetail, handleUpdateUser, handleDeleteUser } from '../Extras/UserAction';

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

  const handleError = (err, setErrorCallback) => {
    if (err.response) {
      setErrorCallback(`Server error: ${err.response.status} - ${err.response.statusText}`);
    } else if (err.request) {
      setErrorCallback('No response received from server. Please check your network connection.');
    } else {
      setErrorCallback(`Error in request: ${err.message}`);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreateError(null);
    setSuccessMessage(null);

    const { name, password } = newUser;
    if (!name || !password) {
      setCreateError('Both name and password are required.');
      return;
    }

    try {
      const response = await apiClient.post(createUserEndpoint, { name, password });
      if (response.status === 201) {
        setSuccessMessage('User created successfully!');
        const updatedUsers = await apiClient.get(userListEndpoint);
        setUsers(updatedUsers.data);
      } else {
        setCreateError(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      handleError(err, setCreateError);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get(userListEndpoint);
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteAndRefresh = async (id) => {
    await handleDeleteUser(id, users, setUsers, setSuccessMessage, setError);
     fetchUsers(); 
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

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
                  <button onClick={() => fetchUserDetail(user.id, setSelectedUser, setUserDetailError, setLoadingUserDetail)}>View</button>
                  <button onClick={() => { setIsModalOpen(true); setIsUpdateMode(true); setNewUser({ name: user.name, password: '' }); setSelectedUser(user); }}>Update</button>
                  <button onClick={() => handleDeleteAndRefresh(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedUser && (
          <div className="user-details">
            <h3>User Details</h3>
            {loadingUserDetail ? (
              <p>Loading user details...</p>
            ) : userDetailError ? (
              <p className="error">{userDetailError}</p>
            ) : (
              <div>
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>Name:</strong> {selectedUser.name}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>{isUpdateMode ? 'Update User' : 'Create New User'}</h2>
        {createError && <div className="error">{createError}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <form onSubmit={isUpdateMode ? (e) => handleUpdateUser(e, selectedUser, newUser, setCreateError, setSuccessMessage, setIsModalOpen, setUsers) : handleCreateUser}>
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
