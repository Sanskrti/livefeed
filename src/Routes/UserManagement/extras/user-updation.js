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
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); 
  };

  const handleUserUpdate = async () => {
    console.warn("WTF")
    const formData = new FormData(); 
    formData.append("name", "random");
    formData.append("can_login", canLogin);
    formData.append("allowed_actions", selectedAllowedActions);
    formData.append("allowed_pages", selectedAllowedPages);
    if (file) formData.append("file", file); 
console.warn("oyeee", formData.getAll());
    try {
      await axiosClient.put(updateUserEndpoint(selectedUser.id), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("User updated successfully!");
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
    <div className={s.user_creation_form}>
      <h2>Update User</h2>
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

      
      <div className={s.form_group}>
        <label htmlFor="file">Upload File:</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>

      <div className={s.permissions_section}>
        <h3>Allowed Actions:</h3>
        <div className={s.permissions_container}>
          {allowedActions.map((action) => (
            <div key={action}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedAllowedActions.includes(action)}
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
                  checked={selectedAllowedPages.includes(page)}
                  onChange={() => handlePageChange(page)}
                />
                {page}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleUserUpdate} className={s.submit_button}>
        Submit
      </button>
    </div>
  );
};

export default UserUpdation;