import { axiosClient, fetchAllowedActions, fetchAllowedPages } from "../../api/axiosClient";
import { useEffect, useState } from "react";
import UserDeletion from "./extras/user-deletion";
import UserUpdation from "./extras/user-updation";
import UserCreation from "./extras/user-creation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import "./extras/user_creation.module.scss";

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); 
  const [allowedPages, setAllowedPages] = useState([]);
  const [allowedActions, setAllowedActions] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axiosClient.get("/api/users");
      console.log("API Response:", response.data); 
      setUserList(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error fetching users: " + error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAllowedPages()
      .then(setAllowedPages)
      .catch((error) => setError("Error fetching allowed pages: " + error.message));
    fetchAllowedActions()
      .then(setAllowedActions)
      .catch((error) => setError("Error fetching allowed actions: " + error.message));
  }, []);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleOpenUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
  };

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleOpenDetailsModal = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <h1>User Management</h1>
      <button className="create-btn" onClick={handleOpenCreateModal}>
        Create User
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

     
      <Dialog open={isCreateModalOpen} onClose={handleCloseCreateModal}>
        <DialogTitle>
          <span>Create User</span>
          <IconButton size="small" color="error" onClick={handleCloseCreateModal}>
            <CloseOutlined color="error" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <UserCreation
            allowedPages={allowedPages}
            allowedActions={allowedActions}
            onUserCreated={() => {
              fetchUsers();
              handleCloseCreateModal();
            }}
          />
        </DialogContent>
      </Dialog>

     
      <Dialog open={isUpdateModalOpen} onClose={handleCloseUpdateModal}>
        <DialogTitle>
          <span>Update User</span>
          <IconButton size="small" color="error" onClick={handleCloseUpdateModal}>
            <CloseOutlined color="error" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <UserUpdation
            selectedUser={selectedUser}
            allowedPages={allowedPages}
            allowedActions={allowedActions}
            onUserUpdated={() => {
              fetchUsers();
              handleCloseUpdateModal();
            }}
          />
        </DialogContent>
      </Dialog>

      
      <Dialog open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogTitle>
          <span>Confirmation</span>
          <IconButton size="small" color="error" onClick={handleCloseDeleteModal}>
            <CloseOutlined color="error" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <UserDeletion
            selectedUser={selectedUser}
            onUserDeleted={() => {
              fetchUsers();
              handleCloseDeleteModal();
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailsModalOpen} onClose={handleCloseDetailsModal}>
        <DialogTitle>
          <span>User Details</span>
          <IconButton size="small" color="error" onClick={handleCloseDetailsModal}>
            <CloseOutlined color="error" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <p><strong>Username:</strong> {selectedUser.name}</p>
              <p><strong>Can Login:</strong> {selectedUser.can_login ? "Yes" : "No"}</p>
              <p><strong>Allowed Actions:</strong> {selectedUser?.allowed_actions.join(", ")}</p>
              <p><strong>Allowed Pages:</strong> {selectedUser?.allowed_pages.join(", ")}</p>
            </>
          )}
        </DialogContent>
      </Dialog>

      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Can Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            user && user.id ? ( 
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.can_login ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => handleOpenUpdateModal(user)}>Update</button>
                  <button onClick={() => handleOpenDeleteModal(user)}>Delete</button>
                  <button onClick={() => handleOpenDetailsModal(user)}>View Details</button>
                </td>
              </tr>
            ) : null 
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
