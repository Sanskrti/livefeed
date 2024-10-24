import { axiosClient } from "../../../api/axiosClient";
import { useState } from "react";
import s from "./user_creation.module.scss";

const UserDeletion = ({ selectedUser, onUserDeleted }) => {
  const [error, setError] = useState("");

  const handleUserDelete = async () => {
    if (!selectedUser || !selectedUser.id) {
      setError("User data is not available");
      return;
    }

    try {
      await axiosClient.delete(`/api/users/${selectedUser.id}`);
      onUserDeleted();
    } catch (error) {
      setError("Error deleting user: " + error?.message || "Unknown error");
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete {selectedUser?.name || "this user"}?</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleUserDelete} className={s.submit_button}>
        Confirm Delete
      </button>
    </div>
  );
};

export default UserDeletion;
