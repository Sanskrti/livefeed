import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetchUsers, handleCreateUser, handleUpdateUser, handleDeleteUser } from './UserAction';
import './UserData.scss';

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', password: '' });
  const [createError, setCreateError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers(setUsers, setError);
      setLoading(false);
    };

    loadUsers();
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewUser({ name: '', password: '' });
    setSelectedUser(null);
  };

  const handleDeleteAndRefresh = async (id) => {
    await handleDeleteUser(id, setUsers, setSuccessMessage, setError);
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      <button onClick={() => { 
        setIsModalOpen(true); 
        setIsUpdateMode(false); 
      }}>Create User</button>
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
                  <button onClick={() => { 
                    setIsModalOpen(true); 
                    setIsUpdateMode(true); 
                    setNewUser({ name: user.name, password: '' }); 
                    setSelectedUser(user); 
                  }}>Update</button>
                  <button onClick={() => handleDeleteAndRefresh(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={handleModalClose}>
        <h2>{isUpdateMode ? 'Update User' : 'Create New User'}</h2>
        {createError && <div className="error">{createError}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <form onSubmit={(e) => {
          e.preventDefault(); 
          if (isUpdateMode) {
            handleUpdateUser(e, selectedUser, newUser, setCreateError, setSuccessMessage, handleModalClose, setUsers);
          } else {
            handleCreateUser(e, newUser, setCreateError, setSuccessMessage, setUsers, handleModalClose);
          }
        }}>
          <input 
            type="text" 
            value={newUser.name} 
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
            placeholder="Enter name" 
            required 
          />
          <input 
            type="password" 
            value={newUser.password} 
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
            placeholder="Enter password" 
            required 
          />
          <button type="submit">{isUpdateMode ? 'Update User' : 'Create User'}</button>
          <button type="button" onClick={handleModalClose}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default UserData;
