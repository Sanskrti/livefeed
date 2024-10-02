import { useState } from "react";
import { axiosClient, createUserEndpoint } from "../../../api/axiosClient";

const UserCreation = ({ onUserCreated }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [canLogin, setCanLogin] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUserCreation = async () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const data = {
      name: userName,
      password: password,
      can_login: canLogin,
    };

    try {
      await axiosClient.post(createUserEndpoint, data);
      setSuccessMessage("User created successfully!");
      onUserCreated(); 
      setUserName("");
      setPassword("");
      setCanLogin(false);
      setError("");
    } catch (error) {
      setError("Error creating user: " + error.message);
    }
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
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      <button onClick={handleUserCreation}>Submit</button> 
    </div>
  );
};

export default UserCreation;
