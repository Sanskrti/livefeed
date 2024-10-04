import { useEffect, useState } from "react";
import { axiosClient, updateUserEndpoint, fetchAllowedActions, fetchAllowedPages } from "../../../api/axiosClient";
import s from "./user_creation.module.scss";

const UserUpdation = ({ selectedUser, onUserUpdated }) => {
  const [userName, setUserName] = useState("");
  const [canLogin, setCanLogin] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [allowedActions, setAllowedActions] = useState([]);
  const [allowedPages, setAllowedPages] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);

  useEffect(() => {
    if (selectedUser) {
      setUserName(selectedUser.name);
      setCanLogin(selectedUser.can_login);
      setSelectedActions(selectedUser.allowed_actions);
      setSelectedPages(selectedUser.allowed_pages);
    }
  }, [selectedUser]);

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

  const handleUserUpdate = async () => {
    const data = {
      name: userName,
      can_login: canLogin,
      allowed_actions: selectedActions,
      allowed_pages: selectedPages,
    };

    try {
      await axiosClient.put(`${updateUserEndpoint}/${selectedUser.id}`, data);
      setSuccessMessage("User updated successfully!");
      onUserUpdated();
    } catch (err) {
      setError("Error updating user: " + err.message);
    }
  };

  const handleActionChange = (action) => {
    setSelectedActions((prev) =>
      prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]
    );
  };

  const handlePageChange = (page) => {
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    );
  };

  return (
    <div className={s.container}>
      <h2>Update User</h2>
      {error && <p className={s.error}>{error}</p>}
      {successMessage && <p className={s.success}>{successMessage}</p>}
      <div>
        <label>Username:</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div>
        <label>Can Login:</label>
        <input type="checkbox" checked={canLogin} onChange={() => setCanLogin((prev) => !prev)} />
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
      <button onClick={handleUserUpdate}>Update User</button>
    </div>
  );
};

export default UserUpdation;
