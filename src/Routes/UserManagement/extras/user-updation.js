import { useState } from "react";
import { axiosClient, updateUserEndpoint } from "../../../api/axiosClient";

const UserUpdation = ({ selectedUser, onUserUpdated }) => {
  const [userName, setUserName] = useState(selectedUser.name || "");
  const [canLogin, setCanLogin] = useState(selectedUser.can_login || false);
  const [error, setError] = useState("");

  const handleUserUpdate = async () => {
    const data = {
      name: userName,
      can_login: canLogin,
    };
    try {
      await axiosClient.put(updateUserEndpoint(selectedUser.id), data);
      onUserUpdated(); 
    } catch (error) {
      setError("Error updating user: " + error.message);
    }
  };

  return (
    <div className="userUpdationContainer">
      <h2>Update User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="User Name"
      />
      <label>
        <input
          type="checkbox"
          checked={canLogin}
          onChange={(e) => setCanLogin(e.target.checked)}
        />
        Can Login
      </label>
      <button onClick={handleUserUpdate}>Update</button>
    </div>
  );
};

export default UserUpdation;
