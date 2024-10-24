import React, { useState } from 'react';
import { useCreateUserMutation } from '../../../Slice';
import s from './user_creation.module.scss';

const UserCreation = ({ onUserCreated, allowedActions, allowedPages }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState(''); // New state for password
  const [canLogin, setCanLogin] = useState(false);
  const [selectedAllowedActions, setSelectedAllowedActions] = useState([]);
  const [selectedAllowedPages, setSelectedAllowedPages] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [createUser] = useCreateUserMutation();

  const handleUserCreation = async () => {
    const newUser = {
      name: userName,
      password, // Include the password in the user object
      can_login: canLogin,
      allowed_actions: selectedAllowedActions,
      pages: selectedAllowedPages,
    };

    try {
      await createUser(newUser).unwrap();
      setSuccessMessage('User created successfully');
      onUserCreated(); 
     
      // Reset fields after successful creation
      setUserName('');
      setPassword(''); // Reset password
      setCanLogin(false);
      setSelectedAllowedActions([]);
      setSelectedAllowedPages([]);
    } catch (error) {
      setError('Error creating user: ' + (error.data?.message || error.message));
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <div className={s.form_group}>
        <label htmlFor="username">Enter Username:</label>
        <input
          type="text"
          id="username"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className={s.form_group}>
        <label htmlFor="password">Enter Password:</label> {/* New label for password */}
        <input
          type="password" // Password field type
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Handle password change
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

      <button onClick={handleUserCreation}>Create User</button>
    </div>
  );
};

export default UserCreation;
