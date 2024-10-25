import React, { useState } from 'react';
import { useCreateUserMutation } from '../Reducers/apiSlices/Slice';
import s from './user_creation.module.scss'; 

// Component for creating a new user
const UserCreation = ({ onUserCreated, allowedActions, allowedPages }) => {
  // State management for form fields and messages
  const [userName, setUserName] = useState(''); 
  const [password, setPassword] = useState('');
  const [canLogin, setCanLogin] = useState(false); 
  const [selectedAllowedActions, setSelectedAllowedActions] = useState([]); 
  const [selectedAllowedPages, setSelectedAllowedPages] = useState([]); 
  const [error, setError] = useState(''); 
  const [passwordError, setPasswordError] = useState(''); 
  const [fileError, setFileError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const [file, setFile] = useState(null); 

  const [createUser] = useCreateUserMutation();
  
  const MAX_FILE_SIZE = 200 * 1024 * 1024; // Max file size of 200MB


  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return false;
    }
    setPasswordError('');
    return true;
  };

 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; 
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      setFileError('File size must be less than 200MB.'); 
      setFile(null);
    } else {
      setFile(selectedFile);
      setFileError(''); 
    }
  };

  // Function to handle user creation process
  const handleUserCreation = async () => {
    if (!validatePassword()) {
      return; 
    }

    if (fileError) {
      return; 
    }

    // Prepare form data for the API request
    const formData = new FormData();
    formData.append('name', userName); 
    formData.append('password', password); 
    formData.append('can_login', canLogin); 
    formData.append('allowed_actions', JSON.stringify(selectedAllowedActions)); 
    formData.append('pages', JSON.stringify(selectedAllowedPages)); 

    if (file) {
      formData.append('file', file); 
    }

    try {
      await createUser(formData).unwrap(); // Send request to create user
      setSuccessMessage('User created successfully'); 
      onUserCreated(); 
      
      // Clear form fields after successful creation
      setUserName('');
      setPassword('');
      setCanLogin(false);
      setSelectedAllowedActions([]);
      setSelectedAllowedPages([]);
      setFile(null); 
    } catch (error) {
      // Display error message in case of failure
      setError('Error creating user: ' + (error.data?.message || error.message));
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} 

      {/* Username input */}
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

      {/* Password input */}
      <div className={s.form_group}>
        <label htmlFor="password">Enter Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>} 
      </div>

      {/* File upload input */}
      <div className={s.form_group}>
        <label htmlFor="file">Upload File:</label>
        <input type="file" id="file" onChange={handleFileChange} />
        {fileError && <p style={{ color: 'red' }}>{fileError}</p>} 
      </div>

      {/* Can login checkbox */}
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

      {/* Allowed actions checkboxes */}
      <h3>Allowed Actions:</h3>
      <div>
        {allowedActions?.map((action) => (
          <label key={action}>
            <input
              type="checkbox"
              checked={selectedAllowedActions.includes(action)}
              onChange={() => {
                if (selectedAllowedActions.includes(action)) {
                  setSelectedAllowedActions(selectedAllowedActions.filter((a) => a !== action)); // Remove action if already selected
                } else {
                  setSelectedAllowedActions([...selectedAllowedActions, action]); // Add action if not selected
                }
              }}
            />
            {action}
          </label>
        ))}
      </div>

      {/* Allowed pages checkboxes */}
      <h3>Allowed Pages:</h3>
      <div>
        {allowedPages?.map((page) => (
          <label key={page}>
            <input
              type="checkbox"
              checked={selectedAllowedPages.includes(page)}
              onChange={() => {
                if (selectedAllowedPages.includes(page)) {
                  setSelectedAllowedPages(selectedAllowedPages.filter((p) => p !== page)); // Remove page if already selected
                } else {
                  setSelectedAllowedPages([...selectedAllowedPages, page]); // Add page if not selected
                }
              }}
            />
            {page}
          </label>
        ))}
      </div>

      {/* Submit button */}
      <button className={s.submit_button} onClick={handleUserCreation}>Create User</button>
    </div>
  );
};

export default UserCreation; 
