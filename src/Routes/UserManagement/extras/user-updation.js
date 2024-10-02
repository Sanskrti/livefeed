import { useState } from "react";
import { axiosClient, updateUserEndpoint } from "../../../api/axiosClient";

const UserUpdation = ({ selectedUser, onUserUpdated, allowedActions, allowedPages }) => {
  const [userName, setUserName] = useState(selectedUser?.name || "");
  const [canLogin, setCanLogin] = useState(selectedUser?.can_login || false);
  const [selectedAllowedActions, setSelectedAllowedActions] = useState(
    selectedUser?.allowed_actions || []
  );
  const [selectedAllowedPages, setSelectedAllowedPages] = useState(
    selectedUser?.allowed_pages || []
  );
  const [error, setError] = useState("");

  const handleUserUpdate = async () => {
    const data = {
      name: userName,
      can_login: canLogin,
      allowed_actions: selectedAllowedActions,
      allowed_pages: selectedAllowedPages,
    };
    try {
      await axiosClient.put(updateUserEndpoint(selectedUser.id), data);
      onUserUpdated();
    } catch (error) {
      setError("Error updating user: " + error.message);
    }
  };

  const handleActionChange = (action) => {
    setSelectedAllowedActions((prevSelected) =>
      prevSelected.includes(action)
        ? prevSelected.filter((item) => item !== action)
        : [...prevSelected, action]
    );
  };

  const handlePageChange = (page) => {
    setSelectedAllowedPages((prevSelected) =>
      prevSelected.includes(page)
        ? prevSelected.filter((item) => item !== page)
        : [...prevSelected, page]
    );
  };

  return (
    <div className="userUpdationContainer">
      <h2>Update User</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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

      <h3>Allowed Actions</h3>
      {allowedActions.map((action) => (
        <label key={action}>
          <input
            type="checkbox"
            checked={selectedAllowedActions.includes(action)}
            onChange={() => handleActionChange(action)}
          />
          {action}
        </label>
      ))}

      <h3>Allowed Pages</h3>
      {allowedPages.map((page) => (
        <label key={page}>
          <input
            type="checkbox"
            checked={selectedAllowedPages.includes(page)}
            onChange={() => handlePageChange(page)}
          />
          {page}
        </label>
      ))}

      <button onClick={handleUserUpdate}>Update</button>
    </div>
  );
};

export default UserUpdation;
