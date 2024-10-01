import { useState } from "react";
import { axiosClient, deleteUserEndpoint } from "../../../api/axiosClient";

const UserDeletion = ({ selectedUser, onUserDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUserDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setLoading(true);
    setError("");

    try {
      if (selectedUser?.id) {
        await axiosClient.delete(`${deleteUserEndpoint}/${selectedUser.id}`);
        onUserDeleted(selectedUser.id);
      } else {
        setError("Invalid user ID.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleUserDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete User"}
      </button>
    </div>
  );
};

export default UserDeletion;
