import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetchUsers, handleCreateUser, handleUpdateUser, handleDeleteUser } from './UserAction';   
import { fetchAllowedActions, fetchAllowedPages } from '../../../api/axiosClient';
import './UserDetails.scss';

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); 
  const [viewUser, setViewUser] = useState(null); 
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', can_login: false, password: '', allowedActions: [], allowedPages: [] });
  const [passwordError, setPasswordError] = useState('');
  const [allowedActions, setAllowedActions] = useState([]); 
  const [allowedPages, setAllowedPages] = useState([]);     
  const [actionOptions, setActionOptions] = useState([]); 
  const [pageOptions, setPageOptions] = useState([]);     

  useEffect(() => {
    const loadUsers = async () => {
      try {
        await fetchUsers(setUsers, setError);
      } catch (err) {
        setError('Failed to load users: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const actions = await fetchAllowedActions();  
        const pages = await fetchAllowedPages();  
        setActionOptions(actions);
        setPageOptions(pages);
      } catch (error) {
        setError('Error fetching actions/pages: ' + error.message);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchUserAllowedData = async (userId) => {
    try {
      const actions = await fetchAllowedActions(userId);
      const pages = await fetchAllowedPages(userId);
      setViewUser((prevUser) => ({
        ...prevUser,
        allowedActions: actions,
        allowedPages: pages
      }));
    } catch (error) {
      setError('Error fetching user allowed data: ' + error.message);
    }
  };

  const handleViewDetailsClick = async (user) => {
    setViewUser(user);  
    await fetchUserAllowedData(user.id);  
  };

  const handleUpdateUserClick = (user) => {
    setNewUser({ name: user.name, can_login: user.can_login, password: '', allowedActions: user.allowedActions, allowedPages: user.allowedPages });
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

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword(newUser.password)) {
      await handleCreateUser(e, newUser, setError, setLoading, setUsers, setCreateModalOpen);
      setSuccessMessage('User created successfully!'); 
      setNewUser({ name: '', can_login: false, password: '', allowedActions: [], allowedPages: [] }); 
    }
  };

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword(newUser.password) && viewUser) {
      await handleUpdateUser(viewUser, newUser, setError, setLoading, setUsers, setUpdateModalOpen);
      setSuccessMessage('User updated successfully!'); 
    }
  };

  const handleDeleteUserClick = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await handleDeleteUser(userId, setUsers, setError);
      setSuccessMessage('User deleted successfully!'); 
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}

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
                  <button className="delete-button" onClick={() => handleDeleteUserClick(user.id)}>
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
            {viewUser.allowedActions.length > 0 ? (
              <ul>
                {viewUser.allowedActions.map((action) => (
                  <li key={action}>{action}</li> 
                ))}
              </ul>
            ) : (
              <p>No allowed actions.</p>
            )}

            <h4>Allowed Pages</h4>
            {viewUser.allowedPages.length > 0 ? (
              <ul>
                {viewUser.allowedPages.map((page) => (
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
                {passwordError && <div className="error">{passwordError}</div>}
              </div>
              <div>
                <label>Allowed Actions:</label>
                <select multiple value={newUser.allowedActions} onChange={(e) => setNewUser({ ...newUser, allowedActions: Array.from(e.target.selectedOptions, option => option.value) })}>
                  {actionOptions.map((action) => (
                    <option key={action} value={action}>{action}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Allowed Pages:</label>
                <select multiple value={newUser.allowedPages} onChange={(e) => setNewUser({ ...newUser, allowedPages: Array.from(e.target.selectedOptions, option => option.value) })}>
                  {pageOptions.map((page) => (
                    <option key={page} value={page}>{page}</option>
                  ))}
                </select>
              </div>
              <button type="submit">Create User</button>
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
                {passwordError && <div className="error">{passwordError}</div>}
              </div>
              <div>
                <label>Allowed Actions:</label>
                <select multiple value={newUser.allowedActions} onChange={(e) => setNewUser({ ...newUser, allowedActions: Array.from(e.target.selectedOptions, option => option.value) })}>
                  {actionOptions.map((action) => (
                    <option key={action} value={action}>{action}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Allowed Pages:</label>
                <select multiple value={newUser.allowedPages} onChange={(e) => setNewUser({ ...newUser, allowedPages: Array.from(e.target.selectedOptions, option => option.value) })}>
                  {pageOptions.map((page) => (
                    <option key={page} value={page}>{page}</option>
                  ))}
                </select>
              </div>
              <button type="submit">Update User</button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserData;
