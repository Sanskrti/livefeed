import { useState, useEffect } from "react";
import { axiosClient, createUserEndpoint, fetchAllowedActions, fetchAllowedPages } from "../../../api/axiosClient";
import s from "./user_creation.module.scss";

const UserCreation = ({ onUserCreated }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [canLogin, setCanLogin] = useState(false);
  const [file, setFile] = useState(null);
  const [fileSizeMessage, setFileSizeMessage] = useState(""); // State for file size message
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [allowedActions, setAllowedActions] = useState([]);
  const [allowedPages, setAllowedPages] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const actions = await fetchAllowedActions();
        const pages = await fetchAllowedPages();
        setAllowedActions(actions);
        setAllowedPages(pages);
      } catch (err) {
        setError("Error fetching permissions: " + err.message);
      }
    };
    fetchPermissions();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleUserCreation = async () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (file && file.size > 200 * 1024 * 1024) {
      setError("File size must be less than 200 MB.");
      return;
    }

    const data = {
      name: userName,
      password: password,
      can_login: canLogin,
      allowed_actions: selectedActions,
      allowed_pages: selectedPages,
      file: file
    };

    try {
      await axiosClient.post(createUserEndpoint, data);
      setSuccessMessage("User created successfully!");
      onUserCreated();
      setUserName("");
      setPassword("");
      setCanLogin(false);
      setSelectedActions([]);
      setSelectedPages([]);
      setFile(null);
      setFileSizeMessage(""); // Reset file size message after user creation
      setError("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError("Error creating user: " + error.response.data.message);
      } else {
        setError("Error creating user: " + error.message);
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 200 * 1024 * 1024) {
        setError("File size must be less than 200 MB.");
        setFile(null);
        setFileSizeMessage(""); // Clear file size message
      } else {
        setError(""); // Clear any previous error
        setFile(selectedFile);
        setFileSizeMessage(`File size: ${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`); // Display file size in MB
      }
    } else {
      setFile(null);
      setFileSizeMessage(""); // Clear file size message if no file is selected
    }
  };

  const handleActionChange = (action) => {
    setSelectedActions((prev) =>
      prev.includes(action)
        ? prev.filter((item) => item !== action)
        : [...prev, action]
    );
  };

  const handlePageChange = (page) => {
    setSelectedPages((prev) =>
      prev.includes(page)
        ? prev.filter((item) => item !== page)
        : [...prev, page]
    );
  };

  return (
    <div className={s.user_creation_form}>
      <h2>Create User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {fileSizeMessage && <p style={{ color: 'blue' }}>{fileSizeMessage}</p>} {/* Display file size message */}

      <div className={s.form_group}>
        <label htmlFor="username">Enter Username:</label>
        <input
          type="text"
          id="username"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className={s.input_field}
        />
      </div>

      <div className={s.form_group}>
        <label htmlFor="password">Enter Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={s.input_field}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={canLogin}
            onChange={(e) => setCanLogin(e.target.checked)}
          />
          Can Login
        </label>
      </div>

      <div className={s.permissions_section}>
        <h3>Allowed Actions:</h3>
        <div className={s.permissions_container}>
          {allowedActions.map((action) => (
            <div key={action}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedActions.includes(action)}
                  onChange={() => handleActionChange(action)}
                />
                {action}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={s.permissions_section}>
        <h3>Allowed Pages:</h3>
        <div className={s.permissions_container}>
          {allowedPages.map((page) => (
            <div key={page}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPages.includes(page)}
                  onChange={() => handlePageChange(page)}
                />
                {page}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={s.form_group}>
        <label htmlFor="file-upload">Upload Recommended ZIP File (max 200 MB):</label>
        <input
          type="file"
          id="file-upload"
          accept=".zip"
          onChange={handleFileChange}
          className={s.file_input}
        />
      </div>

      <button onClick={handleUserCreation} className={s.submit_button}>
        Submit
      </button>
    </div>
  );
};

export default UserCreation;
