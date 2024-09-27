import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetchUsers, handleCreateUser, handleUpdateUser, handleDeleteUser } from './UserAction';   
import { fetchAllowedActions, fetchAllowedPages } from '../../../api/axiosClient';
import './UserDetails.scss';

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewUser, setViewUser] = useState(null); 
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', can_login: false, password: '' });
  const [passwordError, setPasswordError] = useState('');
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
      setError('Error fetching allowed actions/pages: ' + error.message);
    }
  };

  const handleViewDetailsClick = async (user) => {
    setViewUser(user);  
    await fetchUserAllowedData(user.id);  
  };

  const handleUpdateUserClick = (user) => {
    setNewUser({ name: user.name, can_login: user.can_login, password: '' });
    setViewUser(user); 
    setUpdateModalOpen(true); 
  };

  const validatePassword = (password) => {
    if (password && password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleCreateUserSubmit = (e) => {
    if (validatePassword(newUser.password)) {
      handleCreateUser(e, newUser, setError, setLoading, setUsers, setCreateModalOpen);
    }
  };

  const handleUpdateUserSubmit = async (e) => {
    if (validatePassword(newUser.password) && viewUser) {
      await handleUpdateUser(viewUser, newUser, setError, setLoading, setUsers, setUpdateModalOpen);
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-management-container">
      <h1>User Management</h1>

      <div className="user-list-section">
        <h2>User List</h2>
        <button onClick={() => setCreateModalOpen(true)}>Create User</button>
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
                <td>{user.can_login ? 'Yes' : 'No'}</td>
                <td>
                  <button className="view-button" onClick={() => handleViewDetailsClick(user)}>
                    View Details
                  </button>
                  <button className="update-button" onClick={() => handleUpdateUserClick(user)}>
                    Update User
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteUser(user.id, setUsers, setError)}>
                    Delete User
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
            <p><strong>Can Login:</strong> {viewUser.can_login ? 'Yes' : 'No'}</p>

            <h4>Allowed Actions</h4>
            {allowedActions.length > 0 ? (
              <ul>
                {allowedActions.map((action) => (
                  <li key={action}>{action}</li> 
                ))}
              </ul>
            ) : (
              <p>No allowed actions.</p>
            )}

            <h4>Allowed Pages</h4>
            {allowedPages.length > 0 ? (
              <ul>
                {allowedPages.map((page) => (
                  <li key={page}>{page}</li> 
                ))}
              </ul>
            ) : (
              <p>No allowed pages.</p>
            )}
          </div>
        </Modal>
      )}

      {isCreateModalOpen && (
        <Modal
          className="modal-content"
          overlayClassName="modal-overlay"
          isOpen={isCreateModalOpen}
          onRequestClose={() => setCreateModalOpen(false)}
        >
          <div className="modal-header">
            <h3>Create User</h3>
            <span className="close-icon" onClick={() => setCreateModalOpen(false)}>&times;</span>
          </div>
          <div className="modal-body">
            <form onSubmit={handleCreateUserSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Can Login:</label>
                <input
                  type="checkbox"
                  checked={newUser.can_login}
                  onChange={(e) => setNewUser({ ...newUser, can_login: e.target.checked })}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
                {passwordError && <span className="error">{passwordError}</span>}
              </div>
              <button type="submit">Create User</button>
              <button type="button" onClick={() => setCreateModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </Modal>
      )}

      {isUpdateModalOpen && (
        <Modal
          className="modal-content"
          overlayClassName="modal-overlay"
          isOpen={isUpdateModalOpen}
          onRequestClose={() => setUpdateModalOpen(false)}
        >
          <div className="modal-header">
            <h3>Update User</h3>
            <span className="close-icon" onClick={() => setUpdateModalOpen(false)}>&times;</span>
          </div>
          <div className="modal-body">
            <form onSubmit={handleUpdateUserSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Can Login:</label>
                <input
                  type="checkbox"
                  checked={newUser.can_login}
                  onChange={(e) => setNewUser({ ...newUser, can_login: e.target.checked })}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                {passwordError && <span className="error">{passwordError}</span>}
              </div>
              <button type="submit">Update User</button>
              <button type="button" onClick={() => setUpdateModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserData;
