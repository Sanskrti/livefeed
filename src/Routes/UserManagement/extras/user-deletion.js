import { useState } from "react";
import { axiosClient } from "../../../api/axiosClient";
import { deleteUserEndpoint } from "../../../api/axiosClient";
// import './user-deletion.scss';
import s from './user-creation.scss'

const UserDeletion = ({ selectedUser, onUserDeleted }) => {
  const [error, setError] = useState("");

  const handleUserDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosClient.delete(deleteUserEndpoint(selectedUser.id));
        onUserDeleted();
      } catch (error) {
        setError("Error deleting user: " + error.message);
      }
    }
  };

  return (
    <div className={s.test}> 
      {error && <p className="error">{error}</p>}
      <button onClick={handleUserDelete}>Delete User</button>
    </div>
  );
};

export default UserDeletion;

