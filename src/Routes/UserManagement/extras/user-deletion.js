import { useState } from "react";
import { axiosClient, deleteUserEndpoint } from "../../../api/axiosClient";

const UserDeletion = ({ selectedUser, onUserDeleted }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUserDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setLoading(true);
      setError("");

      console.log(`Attempting to delete user with ID: ${selectedUser.id}`);

      try {
        if (selectedUser && selectedUser.id) {
          await axiosClient.delete(`${deleteUserEndpoint}/${selectedUser.id}`);
          onUserDeleted();
        } else {
          setError("Invalid user ID.");
        }
      } catch (error) {
        console.error("Error deleting user:", error.response);
        setError("Error deleting user: " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleUserDelete}>
        {loading ? "Deleting..." : "Delete User"}
      </button>
    </div>
  );
};

export default UserDeletion;
