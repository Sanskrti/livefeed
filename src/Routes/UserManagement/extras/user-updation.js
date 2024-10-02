import { useState } from "react";
import { axiosClient, updateUserEndpoint } from "../../../api/axiosClient";

const UserUpdation = ({ selectedUser, onUserUpdated, dialogOpen }) => {
  console.warn("whaattt", selectedUser, dialogOpen);
  const [userName, setUserName] = useState(selectedUser.name || "");
  const [canLogin, setCanLogin] = useState(selectedUser.can_login || false);
  const [error, setError] = useState("");
  const handleUserUpdate = async () => {
    const data = {
      name: userName,
      can_login: canLogin,
    };
    try {
      const response = await axiosClient.put(
        updateUserEndpoint(selectedUser.id),
        data,
      );
      onUserUpdated();
    } catch (error) {
      setError("Error updating user: " + error.message);
    }
  };
  return (
    <div>
      <button onClick={handleUserUpdate}>update</button>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>
  );
};

export default UserUpdation;