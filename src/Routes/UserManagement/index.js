import { axiosClient, fetchAllowedActions, fetchAllowedPages } from "../../api/axiosClient";
import { useEffect, useState, useRef } from "react";
import UserDeletion from "./extras/user-deletion";
import UserUpdation from "./extras/user-updation";
import UserCreation from "./extras/user-creation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import s from "./extras/user_creation.module.scss";

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
  const [loading, setLoading] = useState(true);

  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/users");
      console.log("API Response:", response.data);
      setUserList(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error fetching users: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAllowedPages()
      .then(setAllowedPages)
      .catch((error) =>
        setError("Error fetching allowed pages: " + error.message)
      );
    fetchAllowedActions()
      .then(setAllowedActions)
      .catch((error) =>
        setError("Error fetching allowed actions: " + error.message)
      );
  }, []);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

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
    setTimeout(() => {
      drawOnCanvas(); 
    }, 100); 
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedUser(null);
    clearCanvas(); 
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawOnCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;


    clearCanvas();

      img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      ctx.fillRect(50, 50, 100, 100); 
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 5;
      ctx.strokeRect(200, 150, 150, 100); 
    };

    if (img.complete) {
      img.onload(); 
    }
  };

  return (
    <div className={s.userListContainer}>
      <div>
        <h1>User Management</h1>
        <br />
      </div>

      <button onClick={handleOpenCreateModal} className={s.create_button}>
        Create User
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

     
      <Dialog open={isCreateModalOpen} onClose={handleCloseCreateModal}>
        <DialogTitle className={`${s.dialog_title} submit_button`}>
          <span> User</span>
          <IconButton
            size="small"
            color="error"
            onClick={handleCloseCreateModal}
          >
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
        <DialogTitle className={`${s.dialog_title} submit_button`}>
          <span>Update User</span>
          <IconButton
            size="small"
            color="error"
            onClick={handleCloseUpdateModal}
          >
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
        <DialogTitle className={s.dialog_title}>
          <span>Want to Delete User</span>
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
      
      <Dialog open={isDetailsModalOpen} onClose={handleCloseDetailsModal}>
        <DialogTitle className={s.dialog_title}>
          <span>User Details</span>
          <IconButton
            size="small"
            color="error"
            onClick={handleCloseDetailsModal}
          >
            <CloseOutlined color="error" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <p>
                <strong>Username:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Can Login:</strong> {selectedUser.can_login ? "Yes" : "No"}
              </p>
              <p>
                <strong>Allowed Actions:</strong>{" "}
                {selectedUser?.allowed_actions?.length > 0
                  ? selectedUser.allowed_actions.join(", ")
                  : "None"}
              </p>
              <p>
                <strong>Allowed Pages:</strong>{" "}
                {selectedUser?.allowed_pages?.length > 0
                  ? selectedUser.allowed_pages.join(", ")
                  : "None"}
              </p>

              <img
                ref={imgRef}
                src="/cam1.jpg"
                alt="User Background"
                style={{ display: "none" }}
              />
              <canvas
                ref={canvasRef}
                style={{ border: "1px solid black", width: "100%", height: "auto" }}
              ></canvas>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className={s.user_table}>
        {loading ? (
          <CircularProgress
            sx={{
              color: "#fb9039",
              height: 50,
              width: 50,
              alignContent: "center",
              marginLeft: 58,
              marginTop: 10,
            }}
          />
        ) : (
          <table className={s.user_table}>
            <thead>
              <tr>
                <th>ID</th>
                <th className={s.name_Column}>Name</th>
                <th className={s.canLogin_Column}>Can Login</th>
                <th className={s.action_Column}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.can_login ? "Yes" : "No"}</td>
                  <td>
                    <button className={s.update_button}onClick={() => handleOpenUpdateModal(user)}>
                      Update
                    </button>
                    <button className={s.delete_button}onClick={() => handleOpenDeleteModal(user)}>
                      Delete
                    </button>
                    <button className={s.view_button}onClick={() => handleOpenDetailsModal(user)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;

