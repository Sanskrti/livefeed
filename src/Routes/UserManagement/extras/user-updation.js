import { useState } from "react";
import { axiosClient, updateUserEndpoint } from "../../../api/axiosClient";
import s from "./user_creation.module.scss";

const UserUpdation = ({ selectedUser, onUserUpdated, allowedActions, allowedPages }) => {
  const [userName, setUserName] = useState(selectedUser?.name || "");
  const [canLogin, setCanLogin] = useState(selectedUser?.can_login || false);
  const [selectedAllowedActions, setSelectedAllowedActions] = useState(
    selectedUser?.allowed_actions || []
  );
  const [selectedAllowedPages, setSelectedAllowedPages] = useState(
    selectedUser?.allowed_pages || []
  );
  const [file, setFile] = useState(null); 
  const [error, setError] = useState("");

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", userName);
      formData.append("can_login", canLogin);
      formData.append("allowed_actions", JSON.stringify(selectedAllowedActions));
      formData.append("allowed_pages", JSON.stringify(selectedAllowedPages));
      if (file) {
        formData.append("file", file); 
      }

      await axiosClient.put(updateUserEndpoint(selectedUser.id), formData);
      onUserUpdated();
    } catch (error) {
      setError("Error updating user: " + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleUserUpdate}>
        <label>
          Name:
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          Can Login:
          <input
            type="checkbox"
            checked={canLogin}
            onChange={(e) => setCanLogin(e.target.checked)}
          />
        </label>
        <label>
          Allowed Actions:
          <select multiple value={selectedAllowedActions} onChange={(e) => {
            const options = Array.from(e.target.selectedOptions).map(option => option.value);
            setSelectedAllowedActions(options);
          }}>
            {allowedActions.map(action => (
              <option key={action} value={action}>{action}</option>
            ))}
          </select>
        </label>
        <label>
          Allowed Pages:
          <select multiple value={selectedAllowedPages} onChange={(e) => {
            const options = Array.from(e.target.selectedOptions).map(option => option.value);
            setSelectedAllowedPages(options);
          }}>
            {allowedPages.map(page => (
              <option key={page} value={page}>{page}</option>
            ))}
          </select>
        </label>
        <label>
          Upload File:
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className={s.submit_button}>Update User</button>
      </form>
    </div>
  );
};

export default UserUpdation;
