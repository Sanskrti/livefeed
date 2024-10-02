import { useState, useEffect } from "react";
import { axiosClient, createUserEndpoint, fetchAllowedActions, fetchAllowedPages } from "../../../api/axiosClient";

const UserCreation = ({ onUserCreated }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [canLogin, setCanLogin] = useState(false);
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

  const handleUserCreation = async () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const data = {
      name: userName,
      password: password,
      can_login: canLogin,
      allowed_actions: selectedActions,
      allowed_pages: selectedPages,
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
      setError("");
    } catch (error) {
      setError("Error creating user: " + error.message);
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
    <div>
      <h2>Create User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
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

      <div>
        <h3>Allowed Actions:</h3>
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

      <div>
        <h3>Allowed Pages:</h3>
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

      <button onClick={handleUserCreation}>Submit</button> 
    </div>
  );
};

export default UserCreation;
