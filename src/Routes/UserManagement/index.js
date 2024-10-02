import { axiosClient } from "../../api/axiosClient";
import { useEffect, useState } from "react";
import { userListEndpoint } from "../../api/axiosClient";
import UserDeletion from "./extras/user-deletion";
import UserUpdation from "./extras/user-updation";
import UserCreation from "./extras/user-creation";
import './extras/user_creation.module.scss';

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

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

  const handleOpenModal = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div>
      <h1>User Management</h1>
      <button onClick={handleOpenModal}>Create User</button> 
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UserCreation onUserCreated={() => {
              fetchUsers();
              handleCloseModal(); 
            }} />
            <span className="close-icon" onClick={handleCloseModal}>×</span>
          </div>
        </div>
      )}

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
            <tr key={index} onClick={() => setSelectedUser(user)}>
              <td>{user.name}</td>
              <td>{user.can_login ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => setSelectedUser(user)}>Update</button>
                <UserDeletion selectedUser={user} onUserDeleted={fetchUsers} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <UserUpdation
          selectedUser={selectedUser}
          onUserUpdated={fetchUsers}
          dialogOpen={true}
        />
      )}
    </div>
  );
};

export default UserManagement;
