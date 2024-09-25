import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetchUsers, handleCreateUser, handleUpdateUser, handleDeleteUser } from './UserAction';
import './UserDetails.scss';

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', password: '' });
  const [viewUser, setViewUser] = useState(null); 
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
    setCreateError(null);
    setSuccessMessage(null);
  };

  const handleDeleteAndRefresh = async (id) => {
    await handleDeleteUser(id, setUsers, setSuccessMessage, setError);
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-management-container">
      <h1>User Management</h1>

      <button 
        className="create-button" 
        onClick={() => { 
          setIsModalOpen(true); 
          setIsUpdateMode(false); 
        }}
      >
        Create User
      </button>

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
                  <button 
                    className="update-button" 
                    onClick={() => { 
                      setIsModalOpen(true); 
                      setIsUpdateMode(true); 
                      setNewUser({ name: user.name, password: '' }); 
                      setSelectedUser(user); 
                    }}
                  >
                    Update
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDeleteAndRefresh(user.id)}
                  >
                    Delete
                  </button>
                  <button 
                    className="view-button" 
                    onClick={() => setViewUser(user)}
                  >
                    View
                  </button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewUser && (
        <Modal 
          className="modal-content"
          overlayClassName="modal-overlay"
          isOpen={!!viewUser} 
          onRequestClose={() => setViewUser(null)}
        >
          <div className="modal-header">
            <h3>User Details</h3>

            <span className="close-icon" onClick={() => setViewUser(null)}>&times;</span>
          </div>
          <div className="modal-body">
            <p><strong>ID:</strong> {viewUser.id}</p>
            <p><strong>Name:</strong> {viewUser.name}</p>
            <div className="button-group">
              <button className="cancel-button" onClick={() => setViewUser(null)}>Close</button>
            </div>
          </div>
        </Modal>
      )}

      <Modal 
        className="modal-content"
        overlayClassName="modal-overlay"
        isOpen={isModalOpen} 
        onRequestClose={handleModalClose}
      >
        <div className="modal-header">
          <h3>{isUpdateMode ? 'Update User' : 'Create New User'}</h3>

          <span className="close-icon" onClick={handleModalClose}>&times;</span>
        </div>

        <div className="modal-body">
          {createError && <div className="error">{createError}</div>}
          {successMessage && <div className="success">{successMessage}</div>}

          <form 
            onSubmit={async (e) => {
              e.preventDefault(); 
              if (isUpdateMode) {
                await handleUpdateUser(e, selectedUser, newUser, setCreateError, setSuccessMessage, handleModalClose, setUsers);
              } else {
                await handleCreateUser(e, newUser, setCreateError, setSuccessMessage, setUsers, handleModalClose);
              }
            }}
          >
            <input 
              className="input-field"
              type="text" 
              value={newUser.name} 
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
              placeholder="Enter name" 
              required 
            />
            <input 
              className="input-field"
              type="password" 
              value={newUser.password} 
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
              placeholder="Enter password" 
              required 
            />
            <div className="button-group">
              <button className="confirm-button" type="submit">{isUpdateMode ? 'Update User' : 'Create User'}</button>
              <button className="cancel-button" type="button" onClick={handleModalClose}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UserData;
