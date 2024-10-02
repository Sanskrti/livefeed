import { axiosClient } from "../../api/axiosClient";
import { useEffect, useState } from "react";
import { userListEndpoint } from "../../api/axiosClient";
import UserDeletion from "./extras/user-deletion";
import UserUpdation from "./extras/user-updation";
import UserCreation from "./extras/user-creation";
import "./extras/user_creation.module.scss";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { initAsyncCompiler } from "sass";

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axiosClient.get(userListEndpoint);
      setUserList(response.data);
    } catch (error) {
      setError("Error fetching users: " + error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
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

  return (
    <div>
      <h1>User Management</h1>
      <button onClick={handleOpenCreateModal}>Create User</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Dialog open={isCreateModalOpen} onClose={handleCloseCreateModal}>
        {isCreateModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <UserCreation
                onUserCreated={() => {
                  fetchUsers();
                  handleCloseCreateModal();
                }}
              />
            </div>
          </div>
        )}
      </Dialog>

      <Dialog open={isUpdateModalOpen} onClose={handleCloseUpdateModal}>
        <div className="modal-overlay">
          <div className="modal-content">
            <UserUpdation
              selectedUser={selectedUser}
              onUserUpdated={() => {
                fetchUsers();
                handleCloseUpdateModal();
              }}
            />
          </div>
        </div>
      </Dialog>
      {/* {isDeleteModalOpen && selectedUser && ( */}
      {/*   <div className="modal-overlay"> */}
      {/*     <div className="modal-content"></div> */}
      {/*   </div> */}
      {/* )} */}
      <Dialog open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>Confirmation</span>
          <IconButton
            size="small"
            color="error"
            onClick={handleCloseDeleteModal}
          >
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

      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Can Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.can_login ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleOpenUpdateModal(user)}>
                  Update
                </button>
                <button onClick={() => handleOpenDeleteModal(user)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
