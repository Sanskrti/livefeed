import React, { useState, useEffect } from 'react';
import './UserData.scss';
import axios from 'axios';
import {userListEndpoint } from '../../../api/apiClient';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        if (err.response) {

          setError(`Server error: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {

          setError('No response received from server. Please check your network connection.');
        } else {
          
          setError(`Error in request: ${err.message}`);
        }
      } finally {

        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <div className="user-list-container">
      <h1 className="user-list-title">User List</h1>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

