import { axiosClient } from "../../../api/axiosClient";
import { useState } from "react";
import { deleteUserEndpoint } from "../../../api/axiosClient";

const UserDeletion = ({ selectedUser, onUserDeleted }) => {
  const [error, setError] = useState("");

  const handleUserDelete = async () => {
    try {
      await axiosClient.delete(deleteUserEndpoint(selectedUser.id));
      onUserDeleted();
    } catch (error) {
      setError("Error deleting user: " + error.message);
    }
  };

  return (
    <div>
      <button onClick={handleUserDelete}>delete user</button>
    </div>
  );
};
export default UserDeletion;
