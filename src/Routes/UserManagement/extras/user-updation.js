import React, { useEffect, useState } from 'react';
import { useUpdateUserMutation } from '../../../Slice';
import s from './user_creation.module.scss';

const UserUpdation = ({ selectedUser, onUserUpdated, allowedActions, allowedPages }) => {
  const [userName, setUserName] = useState(selectedUser.name);
  const [canLogin, setCanLogin] = useState(selectedUser.can_login);
  const [selectedAllowedActions, setSelectedAllowedActions] = useState(selectedUser.allowed_actions || []);
  const [selectedAllowedPages, setSelectedAllowedPages] = useState(selectedUser.pages || []);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    setUserName(selectedUser.name);
    setCanLogin(selectedUser.can_login);
    setSelectedAllowedActions(selectedUser.allowed_actions || []);
    setSelectedAllowedPages(selectedUser.pages || []);
  }, [selectedUser]);

  const handleUserUpdate = async () => {
    const updatedUser = {
      id: selectedUser.id,
      name: userName,
      can_login: canLogin,
      allowed_actions: selectedAllowedActions,
      pages: selectedAllowedPages,
    };

    try {
      await updateUser(updatedUser).unwrap();
      setSuccessMessage('User updated successfully');
      onUserUpdated(); 
    } catch (error) {
      setError('Error updating user: ' + (error.data?.message || error.message));
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <div className={s.form_group}>
        <label htmlFor="username">Enter Username:</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className={s.form_group}>
        <label>
          <input
            type="checkbox"
            checked={canLogin}
            onChange={(e) => setCanLogin(e.target.checked)}
          />
          Can Login
        </label>
      </div>

      <h3>Allowed Actions:</h3>
      <div>
        {allowedActions?.map((action) => (
          <label key={action}>
            <input
              type="checkbox"
              checked={selectedAllowedActions.includes(action)}
              onChange={() => {
                if (selectedAllowedActions.includes(action)) {
                  setSelectedAllowedActions(selectedAllowedActions.filter((a) => a !== action));
                } else {
                  setSelectedAllowedActions([...selectedAllowedActions, action]);
                }
              }}
            />
            {action}
          </label>
        ))}
      </div>

      <h3>Allowed Pages:</h3>
      <div>
        {allowedPages?.map((page) => (
          <label key={page}>
            <input
              type="checkbox"
              checked={selectedAllowedPages.includes(page)}
              onChange={() => {
                if (selectedAllowedPages.includes(page)) {
                  setSelectedAllowedPages(selectedAllowedPages.filter((p) => p !== page));
                } else {
                  setSelectedAllowedPages([...selectedAllowedPages, page]);
                }
              }}
            />
            {page}
          </label>
        ))}
      </div>

      <button onClick={handleUserUpdate}>Update User</button>
    </div>
  );
};

export default UserUpdation;
