import { axiosClient } from "../../../api/axiosClient";
import { useState } from "react";
import { deleteUserEndpoint } from "../../../api/axiosClient";
import s from "./user_creation.module.scss";

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
      <p>Are you sure you want to delete {selectedUser?.name}?</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleUserDelete} className={s.submit_button}>Confirm Delete</button>
    </div>
  );
};

export default UserDeletion;
